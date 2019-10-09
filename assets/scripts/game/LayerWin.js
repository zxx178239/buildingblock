/*
 * @Author: xxZhang
 * @Date: 2019-10-09 15:40:03
 * @Description: 胜利页面
 */

 import { HHelpTools } from "HHelpTools";

cc.Class({
    extends: cc.Component,

    properties: {
        labelTime: {
            default: null,
            type: cc.Label
        },
        labelLevel: {
            default: null,
            type: cc.Label
        }
    },


    onLoad () {},

    start () {
        this.initUI();
    },

    initUI() {
        this.showLevel();
        this.showTime();
    },

    showLevel() {
        let combimeIndex = g_app.getGameData().getCombineIndex();
        this.labelLevel.string = HHelpTools.fixedZero(combimeIndex, 2);
    },

    showTime() {
        let curTime = g_app.getGameData().getCostTimeStr();
        this.labelTime.string = curTime;
    },

    /**
     * @description: 返回大厅
     * @param : 
     * @return : 
     */
    onPressRtn() {
        this.node.destroy();
        g_app.replaceToHallScene();
    },

    /**
     * @description: 再玩一次
     * @param : 
     * @return : 
     */
    onPressRepeat() {
        this.node.destroy();
        g_app.getCurSceneNode().script.repeatGame();
    },

    /**
     * @description: 进入下一关
     * @param : 
     * @return : 
     */
    onPressNext() {

    },
 });
