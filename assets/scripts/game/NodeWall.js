/*
 * @Author: xxZhang
 * @Date: 2019-10-09 09:33:32
 * @Description: 墙壁监听
 */

cc.Class({
    extends: cc.Component,

    properties: {
    },


    onLoad () {},

    start () {

    },

    onBeginContact: function (contact, selfCollider, otherCollider) {
        console.log("begin contact");
        g_app.showLoseLayer();
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
    }
});
