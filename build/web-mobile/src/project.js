window.__require=function e(t,i,n){function o(c,a){if(!i[c]){if(!t[c]){var l=c.split("/");if(l=l[l.length-1],!t[l]){var s="function"==typeof __require&&__require;if(!a&&s)return s(l,!0);if(r)return r(l,!0);throw new Error("Cannot find module '"+c+"'")}}var u=i[c]={exports:{}};t[c][0].call(u.exports,function(e){return o(t[c][1][e]||e)},u,u.exports,e,t,i,n)}return i[c].exports}for(var r="function"==typeof __require&&__require,c=0;c<n.length;c++)o(n[c]);return o}({Game:[function(e,t,i){"use strict";cc._RF.push(t,"2bca82+WS9MIKy28zN3Nv7M","Game");var n,o,r,c,a,l,s,u,p=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}();function h(e,t,i,n){i&&Object.defineProperty(e,t,{enumerable:i.enumerable,configurable:i.configurable,writable:i.writable,value:i.initializer?i.initializer.call(n):void 0})}function d(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function f(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function y(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function m(e,t,i,n,o){var r={};return Object.keys(n).forEach(function(e){r[e]=n[e]}),r.enumerable=!!r.enumerable,r.configurable=!!r.configurable,("value"in r||r.initializer)&&(r.writable=!0),r=i.slice().reverse().reduce(function(i,n){return n(e,t,i)||i},r),o&&void 0!==r.initializer&&(r.value=r.initializer?r.initializer.call(o):void 0,r.initializer=void 0),void 0===r.initializer&&(Object.defineProperty(e,t,r),r=null),r}var g=cc._decorator,v=g.ccclass,b=g.property,w=function(e,t){var i=e.x,n=e.y,o=t.width,r=t.x,c=t.anchorX,a=t.height,l=t.y,s=t.anchorY,u=t.scaleX,p=t.scaleY;return cc.v2((i-o*c)*u+r,(n-a*s)*p+l)},k=function(e,t){var i=e.x,n=e.y,o=t.width,r=t.x,c=t.anchorX,a=t.height,l=t.y,s=t.anchorY,u=t.scaleX,p=t.scaleY;return cc.v2(Math.round((i-r)/u+o*c),Math.round((n-l)/p+a*s))},C=function(e,t){var i=e.x,n=e.y,o=t.mapTileSize,r=t.layerSize;return cc.v2((Math.round(i)-o.width/2)/o.width,-(Math.round(n)+o.height/2)/o.height+r.height)},E=function(e,t){return C(k(e,t.node),{mapTileSize:t.getTileSize(),layerSize:t.getMapSize()})};n=b({type:cc.Prefab}),o=b({type:cc.Prefab}),r=b({type:cc.Prefab}),v((a=function(e){function t(){var e,i,n;d(this,t);for(var o=arguments.length,r=Array(o),c=0;c<o;c++)r[c]=arguments[c];return i=n=f(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(r))),h(n,"player",l,n),h(n,"loseLabel",s,n),h(n,"winLabel",u,n),f(n,i)}return y(t,cc.Component),p(t,[{key:"onLoad",value:function(){this.createPlayer(),this.createMap()}},{key:"start",value:function(){this.startGame()}},{key:"createMap",value:function(){this.tiledMap=this.node.getComponentInChildren(cc.TiledMap),this.tiledLayer=this.tiledMap.getLayer("normal")}},{key:"startGame",value:function(){var e=this;this.iceCount=0,this.tiledLayer._tiles.forEach(function(t){4454!==t&&4646!==t||(e.iceCount+=1)}),this.playerNode.getComponent("player").checkCollision=function(t,i,n){var o=void 0;switch(i){case cc.macro.KEY.left:o=cc.v2(t.x-n,t.y);break;case cc.macro.KEY.right:o=cc.v2(t.x+n,t.y);break;case cc.macro.KEY.up:o=cc.v2(t.x,t.y+n);break;case cc.macro.KEY.down:o=cc.v2(t.x,t.y-n);break;default:o=t}var r=E(o,e.tiledMap);return!e.tiledMap.getPropertiesForGID(e.tiledLayer.getTileGIDAt(r)).canWalkOn},this.playerNode.getComponent("player").onWalkEnd=function(t){var i=E(t,e.tiledMap);switch(e.tiledMap.getPropertiesForGID(e.tiledLayer.getTileGIDAt(i)).type){case"ice":e.iceCount-=1,e.tiledLayer.setTileGIDAt(4455,i),0===e.iceCount&&e.unlockStairs();break;case"shattered Ice":e.tiledLayer.setTileGIDAt(4263,i),e.gameOver();break;case"stairs":e.nextLevel()}}}},{key:"unlockStairs",value:function(){var e=this.tiledMap.getObjectGroup("objects").getObject("finish"),t=w({x:e.x+e.width/2,y:e.y-e.height/2},this.tiledMap.node),i=E(t,this.tiledMap);this.tiledLayer.setTileGIDAt(4264,i)}},{key:"nextLevel",value:function(){var e=cc.instantiate(this.winLabel);e.zIndex=cc.macro.MAX_ZINDEX,e.position=cc.v2(0,260),this.node.addChild(e)}},{key:"gameOver",value:function(){var e=cc.instantiate(this.loseLabel);e.zIndex=cc.macro.MAX_ZINDEX,e.position=cc.v2(0,260),this.node.addChild(e),this.playerNode.getComponent("player").die()}},{key:"createPlayer",value:function(){cc.isValid(this.playerNode)||(this.playerNode=cc.instantiate(this.player),this.playerNode.zIndex=cc.macro.MAX_ZINDEX,this.node.addChild(this.playerNode));var e=this.node.getComponentInChildren(cc.TiledMap).node,t=this.node.getComponentInChildren(cc.TiledMap).getObjectGroup("objects").getObject("start");this.playerNode.position=w({x:t.x+t.width/2,y:t.y-t.height/2},e)}}]),t}(),l=m(a.prototype,"player",[n],{enumerable:!0,initializer:function(){return null}}),s=m(a.prototype,"loseLabel",[o],{enumerable:!0,initializer:function(){return null}}),u=m(a.prototype,"winLabel",[r],{enumerable:!0,initializer:function(){return null}}),c=a));cc._RF.pop()},{}],player:[function(e,t,i){"use strict";cc._RF.push(t,"fe564/ESJpO1bu45r9lvSf9","player");var n,o,r,c,a,l,s,u,p,h,d,f,y=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}();function m(e,t,i,n){i&&Object.defineProperty(e,t,{enumerable:i.enumerable,configurable:i.configurable,writable:i.writable,value:i.initializer?i.initializer.call(n):void 0})}function g(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function v(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function b(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function w(e,t,i,n,o){var r={};return Object.keys(n).forEach(function(e){r[e]=n[e]}),r.enumerable=!!r.enumerable,r.configurable=!!r.configurable,("value"in r||r.initializer)&&(r.writable=!0),r=i.slice().reverse().reduce(function(i,n){return n(e,t,i)||i},r),o&&void 0!==r.initializer&&(r.value=r.initializer?r.initializer.call(o):void 0,r.initializer=void 0),void 0===r.initializer&&(Object.defineProperty(e,t,r),r=null),r}var k=cc._decorator,C=k.ccclass,E=k.property;n=E({type:cc.SpriteFrame}),o=E({type:cc.SpriteFrame}),r=E({type:cc.SpriteFrame}),c=E({type:cc.SpriteFrame}),C((l=function(e){function t(){var e,i,n;g(this,t);for(var o=arguments.length,r=Array(o),c=0;c<o;c++)r[c]=arguments[c];return i=n=v(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(r))),m(n,"speed",s,n),m(n,"step",u,n),m(n,"upSprite",p,n),m(n,"downSprite",h,n),m(n,"leftSprite",d,n),m(n,"rightSprite",f,n),n.map=new Map,n.directions=["up","down","left","right"],n.direction={up:cc.macro.KEY.up,down:cc.macro.KEY.down,left:cc.macro.KEY.left,right:cc.macro.KEY.right},n.isWalking=!1,n.isDead=!1,n.checkCollision=function(){return!1},n.die=function(){n.isDead=!0,n.getComponent(cc.Animation).getAnimationState("die").play(),n.directions.forEach(function(e){n.getComponent(cc.Animation).stop(e),n.getComponent(cc.Animation).setCurrentTime(0,e)})},v(n,i)}return b(t,cc.Component),y(t,[{key:"onKeyDown",value:function(e){this.map.set(e.keyCode,!0),this.isWalking||this.isDead||(this.changeSprite(e.keyCode),this.checkCollision(this.node.getPosition(),e.keyCode,this.step)||this.go(e.keyCode))}},{key:"changeSprite",value:function(e){switch(e){case cc.macro.KEY.left:this.node.getComponent(cc.Sprite).spriteFrame=this.leftSprite;break;case cc.macro.KEY.right:this.node.getComponent(cc.Sprite).spriteFrame=this.rightSprite;break;case cc.macro.KEY.up:this.node.getComponent(cc.Sprite).spriteFrame=this.upSprite;break;case cc.macro.KEY.down:this.node.getComponent(cc.Sprite).spriteFrame=this.downSprite}}},{key:"onLoad",value:function(){var e=this;cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyDown,this),this.node.getParent().on(cc.Node.EventType.MOUSE_DOWN,function(t){e.onKeyDown(e.getKeyCodeFromClickPos(t))}),this.node.getParent().on(cc.Node.EventType.TOUCH_START,function(t){e.onKeyDown(e.getKeyCodeFromClickPos(t))})}},{key:"getKeyCodeFromClickPos",value:function(e){var t=cc.v2(this.node.getParent().convertToNodeSpaceAR(e.getLocationInView()).x,-this.node.getParent().convertToNodeSpaceAR(e.getLocationInView()).y),i=this.node.getPosition(),n=void 0;return t.x>i.x-this.node.width&&t.x<i.x+this.node.width&&t.y>i.y+this.node.height&&t.y<i.y+this.node.height+2*this.node.height?n="up":t.x>i.x-this.node.width&&t.x<i.x+this.node.width&&t.y<i.y-this.node.height&&t.y>i.y-this.node.height-2*this.node.height?n="down":t.x>i.x+this.node.width&&t.x<i.x+this.node.width+2*this.node.width&&t.y>i.y-this.node.height&&t.y<i.y+this.node.height?n="right":t.x<i.x-this.node.width&&t.x>i.x-this.node.width-2*this.node.width&&t.y>i.y-this.node.height&&t.y<i.y+this.node.height&&(n="left"),{keyCode:cc.macro.KEY[n]}}},{key:"start",value:function(){console.log("on player start")}},{key:"changeAnim",value:function(e){var t=this;this.getComponent(cc.Animation).getAnimationState(e).play(),this.directions.filter(function(t){return t!==e}).forEach(function(e){t.getComponent(cc.Animation).stop(e),t.getComponent(cc.Animation).setCurrentTime(0,e)})}},{key:"go",value:function(e){var t=this;switch(e){case cc.macro.KEY.left:this.isWalking=!0,this.changeAnim("left"),this.node.runAction(cc.sequence(cc.moveBy(.5,-this.step,0),cc.callFunc(function(){t.getComponent(cc.Animation).pause("left"),t.getComponent(cc.Animation).setCurrentTime(0,"left"),t.isWalking=!1,t.onWalkEnd(t.node.position)})));break;case cc.macro.KEY.right:this.isWalking=!0,this.changeAnim("right"),this.node.runAction(cc.sequence(cc.moveBy(.5,this.step,0),cc.callFunc(function(){t.getComponent(cc.Animation).pause("right"),t.getComponent(cc.Animation).setCurrentTime(0,"right"),t.isWalking=!1,t.onWalkEnd(t.node.position)})));break;case cc.macro.KEY.up:this.isWalking=!0,this.changeAnim("up"),this.node.runAction(cc.sequence(cc.moveBy(.5,0,this.step),cc.callFunc(function(){t.getComponent(cc.Animation).pause("up"),t.getComponent(cc.Animation).setCurrentTime(0,"up"),t.isWalking=!1,t.onWalkEnd(t.node.position)})));break;case cc.macro.KEY.down:this.isWalking=!0,this.changeAnim("down"),this.node.runAction(cc.sequence(cc.moveBy(.5,0,-this.step),cc.callFunc(function(){t.getComponent(cc.Animation).pause("down"),t.getComponent(cc.Animation).setCurrentTime(0,"down"),t.isWalking=!1,t.onWalkEnd(t.node.position)})))}}},{key:"update",value:function(e){}}]),t}(),s=w(l.prototype,"speed",[E],{enumerable:!0,initializer:function(){return 200}}),u=w(l.prototype,"step",[E],{enumerable:!0,initializer:function(){return 10}}),p=w(l.prototype,"upSprite",[n],{enumerable:!0,initializer:function(){return null}}),h=w(l.prototype,"downSprite",[o],{enumerable:!0,initializer:function(){return null}}),d=w(l.prototype,"leftSprite",[r],{enumerable:!0,initializer:function(){return null}}),f=w(l.prototype,"rightSprite",[c],{enumerable:!0,initializer:function(){return null}}),a=l));cc._RF.pop()},{}]},{},["Game","player"]);