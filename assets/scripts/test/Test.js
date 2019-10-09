/*
 * @Author: xxZhang
 * @Date: 2019-10-08 20:40:59
 * @Description: 
 */

import {HHelpTools} from "HHelpTools";

cc.Class({
    extends: cc.Component,

    properties: {
        testPrefab: {
            default: null,
            type: cc.Prefab
        }
    },


    onLoad () {
        HHelpTools.initAllManager();
        // 1. 方法1
        this.addPrefab1();
        // 2. 方法2
        // this.addLayerLevel();
        // 物理引擎
        cc.director.getPhysicsManager().enabled = true;
       
    },

    start () {
        // this.addLayerLevel();
    },

    addLayerLevel(INPath) {
        cc.loader.loadRes("prefabs/levels/LayerLevel0_0", cc.Prefab, (err, res) => {
            let curNode = cc.instantiate(res);
            curNode.parent = this.node;
        })

        // g_resManager.requirePrefabFile("prefabs/levels/LayerLevel0_0", (INNode) => {
        //     INNode.parent = this.node;
        // })
    },

    addPrefab1() {
        let curNode = cc.instantiate(this.testPrefab);
        curNode.parent = this.node;
    }
});
