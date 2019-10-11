
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
        _index: 0,
    },


    onLoad () {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
    },

    start () {

    },

    onDestroy() {
    },

    onTouchStart() {
        if(this._isStartMove || !this._isCanMove) {
            return;
        }
        cc.systemEvent.emit("ready_next");
        this.node.zIndex = 100;
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
        this.node.zIndex = 1;
        this._isCanMove = false;
        this.changeCurStatus(true);
    },

    /**
     * @description: 改变状态
     * @param : 
     * @return : 
     */
    changeCurStatus(INFlag) {
        this.node.getComponent(cc.RigidBody).awake = INFlag;
        let physicsComponent = this.node.getComponent(cc.PhysicsBoxCollider) ||
                                this.node.getComponent(cc.PhysicsCircleCollider) ||
                                this.node.getComponent(cc.PhysicsPolygonCollider);
        physicsComponent.enabled = INFlag;

        cc.systemEvent.emit("change_time_status", INFlag);
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

    initUI(INTag, INBlockId) {
        let blockInfo = g_cfgManager.getConfigRecord("BlockConfigs", INBlockId);
        let ui = blockInfo["ui"];
        let gravity = blockInfo["gravity_scale"];
        let friction = blockInfo["friction"];
        let restitution = blockInfo["restitution"];

        let rigidBody = this.node.getComponent(cc.RigidBody);
        rigidBody.gravityScale = gravity;

        let physicsComponent = this.node.getComponent(cc.PhysicsBoxCollider) ||
                                this.node.getComponent(cc.CircleCollider) ||
                                this.node.getComponent(cc.PhysicsPolygonCollider);

        physicsComponent.friction = friction;
        physicsComponent.restitution = restitution;

        g_resManager.replaceSprite(this.node, ui, () => {
            switch (INTag) {
                case 0:
                    this.node.getComponent(cc.PhysicsBoxCollider).size = cc.size(this.node.width, this.node.height);
                    break;
                case 1:
                    this.node.getComponent(cc.PhysicsCircleCollider).radius = this.node.width / 2;
                    break;
                default:
                    break;
            }
        });
        // physicsComponent.apply();
    },

    beginMove(INEndPos, INIndex) {
        this._endPosY = INEndPos;
        this._isStartMove = true;
        this._index = INIndex;
    },

    onBeginContact: function (contact, selfCollider, otherCollider) {
        if(selfCollider.node.group === "block" &&
            this._index + 1 === g_app.getGameData().getCurLevelBlockNums() ) {
            cc.systemEvent.emit("do_countdown");
        }
    },
});
