/*
 * @Author: xxZhang
 * @Date: 2019-10-09 09:33:32
 * @Description: 墙壁监听
 */

cc.Class({
    extends: Script,

    properties: {
        _isShowLose: false
    },


    onLoad () {},

    start () {

    },

    onBeginContact: function (contact, selfCollider, otherCollider) {
        console.log("begin contact");
        // cc.director.pause();
        if(g_app.getCurSceneNode().script.isShowWin() || this._isShowLose) {
            return;
        }
        this._isShowLose = true;
        g_app.showLoseLayer();
        cc.systemEvent.emit("close_countdown");
    },

    // 只在两个碰撞体结束接触时被调用一次
    onEndContact: function (contact, selfCollider, otherCollider) {
        otherCollider.destroy();
    },

    // 每次将要处理碰撞体接触逻辑时被调用
    onPreSolve: function (contact, selfCollider, otherCollider) {
    },

    // 每次处理完碰撞体接触逻辑时被调用
    onPostSolve: function (contact, selfCollider, otherCollider) {
    },

    reset() {
        this._isShowLose = false;
    }
});
