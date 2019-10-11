
/*
 * @Author: xxZhang
 * @Date: 2019-10-09 10:09:25
 * @Description: 失败页面
 */

cc.Class({
    extends: cc.Component,

    properties: {
    },


    onLoad () {},

    start () {

    },

    /**
     * @description: 返回大厅
     * @param : 
     * @return : 
     */
    onPressStop() {
        this.onPressContinue();
        g_app.replaceToHallScene();
    },

    /**
     * @description: 再玩一次
     * @param : 
     * @return : 
     */
    onPressRepeat() {
        this.onPressContinue();
        g_app.getCurSceneNode().script.repeatGame();
    },

    /**
     * @description: 继续玩
     * @param : 
     * @return : 
     */
    onPressContinue() {
        cc.director.resume();
        this.node.destroy();
    }
});
