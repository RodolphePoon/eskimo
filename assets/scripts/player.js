// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle onWalkEnds:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-onWalkEnds.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-onWalkEnds.html
const {
    ccclass,
    property
} = cc._decorator



@ccclass
class Controller extends cc.Component {


    @property
    speed = 200
    @property
    step = 10
    @property({
        type: cc.SpriteFrame
    }) upSprite = null
    @property({
        type: cc.SpriteFrame
    }) downSprite = null
    @property({
        type: cc.SpriteFrame
    }) leftSprite = null
    @property({
        type: cc.SpriteFrame
    }) rightSprite = null





    map = new Map()
    directions = ["up", "down", "left", "right"]
    direction = {
        "up": cc.macro.KEY.up,
        "down": cc.macro.KEY.down,
        "left": cc.macro.KEY.left,
        "right": cc.macro.KEY.right,
    }
    lastKeyPressed
    isWalking = false
    onWalkEnd
    isDead = false

    checkCollision = () => false



    onKeyDown(e) {
        this.map.set(e.keyCode, true)
        if (!this.isWalking && !this.isDead) {
            this.changeSprite(e.keyCode)

            if (!this.checkCollision(this.node.getPosition(), e.keyCode, this.step))
                this.go(e.keyCode)

        }
    }

    changeSprite(key) {
        switch (key) {
            case cc.macro.KEY.left:
                this.node.getComponent(cc.Sprite).spriteFrame = this.leftSprite
                break;
            case cc.macro.KEY.right:
                this.node.getComponent(cc.Sprite).spriteFrame = this.rightSprite
                break;
            case cc.macro.KEY.up:
                this.node.getComponent(cc.Sprite).spriteFrame = this.upSprite
                break;
            case cc.macro.KEY.down:
                this.node.getComponent(cc.Sprite).spriteFrame = this.downSprite
                break;
            default:
                break;

        }
    }

    onLoad() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this)
        this.node.getParent().on(cc.Node.EventType.MOUSE_DOWN, (e) => {

            this.onKeyDown(this.getKeyCodeFromClickPos(e))
        })
        this.node.getParent().on(cc.Node.EventType.TOUCH_START, (e) => {
            this.onKeyDown(this.getKeyCodeFromClickPos(e))
        })
    }

    getKeyCodeFromClickPos(e) {
        let click = cc.v2(this.node.getParent().convertToNodeSpaceAR(e.getLocationInView()).x, -this.node.getParent().convertToNodeSpaceAR(e.getLocationInView()).y)
        let position = this.node.getPosition()
        let direction

        if (click.x > position.x - this.node.width && click.x < position.x + this.node.width && click.y > position.y + this.node.height && click.y < position.y + this.node.height + this.node.height * 2)
            direction = "up"
        else if (click.x > position.x - this.node.width && click.x < position.x + this.node.width && click.y < position.y - this.node.height && click.y > position.y - this.node.height - this.node.height * 2)
            direction = "down"
        else if (click.x > position.x + this.node.width && click.x < position.x + this.node.width + this.node.width * 2 && click.y > position.y - this.node.height && click.y < position.y + this.node.height)
            direction = "right"
        else if (click.x < position.x - this.node.width && click.x > position.x - this.node.width - this.node.width * 2 && click.y > position.y - this.node.height && click.y < position.y + this.node.height)
            direction = "left"


        return {
            keyCode: cc.macro.KEY[direction]
        }
    }



    start() {
        console.log('on player start')
    }
    die = () => {
        this.isDead = true
        this.getComponent(cc.Animation).getAnimationState('die').play()
        this.directions.forEach(d => {
            this.getComponent(cc.Animation).stop(d)
            this.getComponent(cc.Animation).setCurrentTime(0, d)
        })
    }

    setDead = (isDead) => { this.isDead = isDead }





    changeAnim(direction) {
        this.getComponent(cc.Animation).getAnimationState(direction).play()
        this.directions.filter(d => d !== direction).forEach(d => {
            this.getComponent(cc.Animation).stop(d)
            this.getComponent(cc.Animation).setCurrentTime(0, d)
        })
        //  this.lastKeyPressed = direction
    }

    go(key) {
        switch (key) {
            case cc.macro.KEY.left:
                this.isWalking = true
                this.changeAnim('left')
                this.node.runAction(cc.sequence(cc.moveBy(0.5, -this.step, 0), cc.callFunc(() => {
                    this.getComponent(cc.Animation).pause('left')
                    this.getComponent(cc.Animation).setCurrentTime(0, 'left')
                    this.isWalking = false
                    this.onWalkEnd(this.node.position)
                })))
                break;
            case cc.macro.KEY.right:
                this.isWalking = true

                this.changeAnim('right')
                this.node.runAction(cc.sequence(cc.moveBy(0.5, this.step, 0), cc.callFunc(() => {
                    this.getComponent(cc.Animation).pause('right')
                    this.getComponent(cc.Animation).setCurrentTime(0, 'right')
                    this.isWalking = false
                    this.onWalkEnd(this.node.position)
                })))

                // this.node.setPosition(this.node.x += this.speed * dt, this.node.y)
                break;
            case cc.macro.KEY.up:
                this.isWalking = true
                this.changeAnim('up')
                this.node.runAction(cc.sequence(cc.moveBy(0.5, 0, this.step), cc.callFunc(() => {
                    this.getComponent(cc.Animation).pause('up')
                    this.getComponent(cc.Animation).setCurrentTime(0, 'up')
                    this.isWalking = false
                    this.onWalkEnd(this.node.position)
                })))

                // this.node.setPosition(this.node.x, this.node.y += this.speed * dt)
                break;
            case cc.macro.KEY.down:
                this.isWalking = true
                this.changeAnim('down')
                this.node.runAction(cc.sequence(cc.moveBy(0.5, 0, -this.step), cc.callFunc(() => {
                    this.getComponent(cc.Animation).pause('down')
                    this.getComponent(cc.Animation).setCurrentTime(0, 'down')
                    this.isWalking = false
                    this.onWalkEnd(this.node.position)

                })))

                // this.node.setPosition(this.node.x, this.node.y -= this.speed * dt)
                break;
            default:
                break;
        }

    }

    update(dt) { }


}