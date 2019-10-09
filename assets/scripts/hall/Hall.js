/*
 * @Author: xxZhang
 * @Date: 2019-10-08 15:28:04
 * @Description: 大厅场景
 */


cc.Class({
    extends: cc.Component,

    properties: {
        pageViewContent: {
            default: null,
            type: cc.Node
        },
        layoutLevelPrefab: {
            default: null,
            type: cc.Prefab
        }
    },


    onLoad () {},

    start () {
        let levelConfigs = g_cfgManager.getTbl("LevelConfigs");
        this.initOnePage(levelConfigs, 0);
    },

    initOnePage(INAllDatas, INIndex) {
        if(!INAllDatas[INIndex]) {
            return;
        }
        let newNode = cc.instantiate(this.layoutLevelPrefab);
        newNode.parent = this.pageViewContent;
        newNode.script.insertAllLevels(INIndex);
        this.scheduleOnce(() => {
            this.initOnePage(INAllDatas, INIndex + 1);
        }, 0.2);
    }

});
