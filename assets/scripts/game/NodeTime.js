
/*
 * @Author: xxZhang
 * @Date: 2019-10-09 15:21:22
 * @Description: 时间变化
 */

cc.Class({
    extends: Script,

    properties: {
        _isBegin: false,
        _startTime: 0,
    },


    onLoad () {
        cc.systemEvent.on("change_time_status", this.changeTimeStatus, this);
    },

    start () {

    },

    onDestroy() {
        cc.systemEvent.off("change_time_status", this.changeTimeStatus, this);
    },

    update() {
        if(!this._isBegin) {
            return;
        }

        let curTime = new Date().getTime();
        let value = (curTime - this._startTime) / 1000;
        let curLabelComponent = this.node.getComponent(cc.Label);
        // console.log("curTime: ", value.toFixed(2));
        curLabelComponent.string = value.toFixed(2) + "''";
        g_app.getGameData().setCostTimeStr(curLabelComponent.string);
    },

    changeTimeStatus(INFlag) {
        if(this._isBegin === INFlag) {
            return;
        }

        this._isBegin = INFlag;
        if(this._isBegin) {
            this._startTime = new Date().getTime();
        }
    },

    reset() {
        this._isBegin = false;
        this.node.getComponent(cc.Label).string = "0.00''";
    }
});
