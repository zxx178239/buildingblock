/*
 * @Author: xxZhang
 * @Date: 2019-10-08 15:13:38
 * @Description: 每个关卡布局节点
 */
import { HHelpTools } from "HHelpTools";

cc.Class({
    extends: Script,

    properties: {
        levelPrefab: {
            default: null,
            type: cc.Prefab
        }
    },


    onLoad () {},

    start () {

    },

    insertAllLevels(INIndex) {
        let configRecord = g_cfgManager.getConfigRecord("LevelConfigs", INIndex);

        let levelTags = configRecord["level_tags"];
        
        HHelpTools.insertNodeForGrid(levelTags, this.node, this.levelPrefab, 4, 1);
        // this.createOneLevel(levelTags, 0);
    },

    createOneLevel(INAllInfos, INIndex) {

    }
});
