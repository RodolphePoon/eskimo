// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {
    ccclass,
    property
} = cc._decorator

const converTileMapRefToNodeRef = ({
    x,
    y
}, {
    width,
    x: tileX,
    anchorX,
    height,
    y: tileY,
    anchorY,
    scaleX,
    scaleY,
}) => cc.v2((x - width * anchorX) * scaleX + tileX, (y - height * anchorY) * scaleY + tileY)

const convertNodeRefToTileMapRef = ({
    x,
    y
}, {
    width,
    x: tileX,
    anchorX,
    height,
    y: tileY,
    anchorY,
    scaleX,
    scaleY,
}) => cc.v2(Math.round(((x - tileX) / scaleX) + width * anchorX), Math.round(((y - tileY) / scaleY) + height * anchorY))

const convertTileMapRefToGridRef = ({
    x,
    y
}, {
    mapTileSize,
    layerSize
}) => cc.v2((Math.round(x) - mapTileSize.width / 2) / mapTileSize.width, -((Math.round(y) + mapTileSize.height / 2) / mapTileSize.height) + layerSize.height)

const getTilePos = (position, tiledMap) => convertTileMapRefToGridRef(convertNodeRefToTileMapRef(position, tiledMap.node), {
    mapTileSize: tiledMap.getTileSize(),
    layerSize: tiledMap.getMapSize()
})

const SHATTERED_ICE_ID = 4455
const HOLE_ID = 4263
const ICE_ID = 4454
const ICE_2_ID = 4646
const ICE_WALL_ID = 4456
const STAIRS_ID = 4264

const LEVEL_MAX = 2


@ccclass
class Controller extends cc.Component {


    @property({
        type: cc.Prefab

    }) player = null
    @property({
        type: cc.Prefab

    }) loseLabel = null
    @property({
        type: cc.Prefab

    }) winLabel = null

    level = 1

    onLoad() {
        this.createPlayer()
        this.createMap()
    }

    start() {
        this.startGame()
    }

    createMap() {
        this.tiledMap = this.node.getComponentInChildren(cc.TiledMap)
        this.tiledLayer = this.tiledMap.getLayer(`level_${this.level}`)


    }


    startGame() {
        this.iceCount = 0
        this.tiledLayer._tiles.forEach(tileID => {
            if (tileID === ICE_ID || tileID === ICE_2_ID) {
                this.iceCount += 1
            }
        });

        this.playerNode.getComponent("player").checkCollision = (position, keyCode, step) => {
            let futurPos
            switch (keyCode) {
                case cc.macro.KEY.left:
                    futurPos = cc.v2(position.x - step, position.y)
                    break;
                case cc.macro.KEY.right:
                    futurPos = cc.v2(position.x + step, position.y)
                    break;
                case cc.macro.KEY.up:
                    futurPos = cc.v2(position.x, position.y + step)
                    break;
                case cc.macro.KEY.down:
                    futurPos = cc.v2(position.x, position.y - step)
                    break;
                default:
                    futurPos = position
                    break;
            }
            let tilePos = getTilePos(futurPos, this.tiledMap)
            let tileProps = this.tiledMap.getPropertiesForGID(this.tiledLayer.getTileGIDAt(tilePos))

            return !tileProps.canWalkOn
        }



        this.playerNode.getComponent("player").onWalkEnd = (position) => {
            let tilePos = getTilePos(position, this.tiledMap)
            let tileProps = this.tiledMap.getPropertiesForGID(this.tiledLayer.getTileGIDAt(tilePos))
            switch (tileProps.type) {
                case 'ice':
                    this.iceCount -= 1;
                    this.tiledLayer.setTileGIDAt(SHATTERED_ICE_ID, tilePos)

                    if (this.iceCount === 0) {
                        this.unlockStairs()
                    }

                    break;
                case "shattered Ice":
                    this.tiledLayer.setTileGIDAt(HOLE_ID, tilePos)
                    this.gameOver()
                    break;
                case "stairs":
                    this.nextLevel()
                    break;
                default:
                    break;
            }
        }

    }

    unlockStairs() {
        let obj = this.tiledMap.getObjectGroup("objects").getObject('finish')
        let nodeRefPos = converTileMapRefToNodeRef({
            x: obj.x + obj.width / 2,
            y: obj.y - obj.height / 2
        }, this.tiledMap.node)
        let tilePos = getTilePos(nodeRefPos, this.tiledMap)
        this.tiledLayer.setTileGIDAt(STAIRS_ID, tilePos)
    }
    nextLevel() {
        let win = cc.instantiate(this.winLabel);
        win.zIndex = cc.macro.MAX_ZINDEX;
        win.position = cc.v2(0, 260)
        this.playerNode.getComponent("player").setDead(true)
        this.node.addChild(win);
        if (this.level < LEVEL_MAX) {
            this.node.runAction(cc.sequence(cc.delayTime(5), cc.callFunc(() => {
                this.tiledLayer.destroy()
                this.level = this.level + 1
                this.tiledLayer = this.tiledMap.getLayer(`level_${this.level}`)
                this.node.getComponentInChildren(cc.Label).destroy();
                let tilemap = this.node.getComponentInChildren(cc.TiledMap).node
                let obj = this.node.getComponentInChildren(cc.TiledMap).getObjectGroup("objects").getObject('start')
                this.playerNode.position = converTileMapRefToNodeRef({
                    x: obj.x + obj.width / 2,
                    y: obj.y - obj.height / 2
                }, tilemap)
                this.iceCount = 0
                this.tiledLayer._tiles.forEach(tileID => {
                    if (tileID === ICE_ID || tileID === ICE_2_ID) {
                        this.iceCount += 1
                    }
                });
                this.playerNode.getComponent("player").setDead(false)

            })))
        }

    }

    gameOver() {
        let gameOverLabel = cc.instantiate(this.loseLabel);
        gameOverLabel.zIndex = cc.macro.MAX_ZINDEX;
        gameOverLabel.position = cc.v2(0, 260)
        this.node.addChild(gameOverLabel);
        this.playerNode.getComponent("player").die()
    }

    createPlayer() {
        if (!cc.isValid(this.playerNode)) {
            this.playerNode = cc.instantiate(this.player);
            this.playerNode.zIndex = cc.macro.MAX_ZINDEX;
            this.node.addChild(this.playerNode);
        }
        let tilemap = this.node.getComponentInChildren(cc.TiledMap).node
        let obj = this.node.getComponentInChildren(cc.TiledMap).getObjectGroup("objects").getObject('start')
        this.playerNode.position = converTileMapRefToNodeRef({
            x: obj.x + obj.width / 2,
            y: obj.y - obj.height / 2
        }, tilemap)
    }






}