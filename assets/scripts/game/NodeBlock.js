/*
 * @Author: xxZhang
 * @Date: 2019-10-08 19:38:04
 * @Description: 积木节点
 */

cc.Class({
    extends: Script,

    properties: {
        _isStartMove: false,
        _endPosY: 0,
        _stepY: 20,
        _isCanMove: true,
    },


    onLoad () {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
    },

    start () {

    },

    onTouchStart() {
        if(this._isStartMove || !this._isCanMove) {
            return;
        }
        cc.systemEvent.emit("ready_next");
    },

    onTouchMove(event) {
        if(this._isStartMove || !this._isCanMove) {
            return;
        }

        let touchLoc = event.getLocation();
        let localPos = this.node.parent.convertToNodeSpaceAR(touchLoc);
        this.node.position = localPos;
    },

    onTouchEnd() {
        if(this._isStartMove || !this._isCanMove) {
            return;
        }
        this._isCanMove = false;
        this.node.getComponent(cc.RigidBody).awake = true;
        let physicsComponent = this.node.getComponent(cc.PhysicsBoxCollider) ||
                                this.node.getComponent(cc.PhysicsCircleCollider) ||
                                this.node.getComponent(cc.PhysicsPolygonCollider);
        physicsComponent.enabled = true;
    },

    onTouchCancel() {
        if(this._isStartMove || !this._isCanMove) {
            return;
        }
        this._isCanMove = false;
    },

    update() {
        if(!this._isStartMove || this._endPosY === 0) {
            return;
        }
        let tmpY = this.node.y + this._stepY;
        tmpY = tmpY > this._endPosY ? this._endPosY : tmpY;
        this.node.y = tmpY;
        if(this.node.y >= this._endPosY) {
            this._isStartMove = false;
        }
    },

    beginMove(INEndPos) {
        this._endPosY = INEndPos;
        this._isStartMove = true;
    },

    onBeginContact: function (contact, selfCollider, otherCollider) {
        console.log("begin contact");
        // g_app.showLoseLayer();

        if(otherCollider.node.group === "block") {
            cc.systemEvent.emit("do_countdown");
        }
    },
});
