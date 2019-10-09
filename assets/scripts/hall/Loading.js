/*
 * @Author: xxZhang
 * @Date: 2019-10-08 16:12:02
 * @Description: 加载层
 */

import {HHelpTools} from "HHelpTools";

cc.Class({
    extends: cc.Component,

    properties: {
    },


    onLoad () {
        HHelpTools.initAllManager();
        this.enterHall();
    },

    start () {
        
    },

    enterHall() {
        g_resManager.requirePrefabFile("prefabs/hall/Hall", (INNode) => {
            INNode.parent = this.node.parent;
            INNode.position = cc.v2(0, 0);
            g_app.setCurSceneNode(INNode);
            this.scheduleOnce(() => {
                this.node.active = false;
            }, 1);
        })
    },
});
