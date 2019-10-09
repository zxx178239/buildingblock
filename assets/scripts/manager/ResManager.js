/*
 * @Author: xxZhang
 * @Date: 2019-07-04 09:07:47
 * @Description: 资源管理器
 */

export var ResManager = (function() {
    var instance;
    var ResManager = function() {
        if(!instance) {
            instance = this;
        }
        return instance;
    };

    /**
     * @description: 加载prefab
     * @param : 
     * @return : 
     */
    ResManager.prototype.requirePrefabFile = function(INPrefabFileName, INCallback) {
        INPrefabFileName = INPrefabFileName;
        let prefabEntry = cc.loader.getRes(INPrefabFileName);
        if(prefabEntry) {
            let prefabNode = cc.instantiate(prefabEntry);
            if(INCallback) {
                INCallback(prefabNode);
            }
            return;
        }

        cc.loader.loadRes(INPrefabFileName, cc.Prefab, (err, res) => {
            if(err) {
                g_logTool.warn("INPrefabFileName error: ", INPrefabFileName);
                return;
            }
            let prefabNode = cc.instantiate(res);
            if(INCallback) {
                INCallback(prefabNode);
            }
        })
    };

    /**
     * @description: 替换当前图片
     * @param : 
     * @return : 
     */
    ResManager.prototype.replaceSprite = function(INNode, INSpritePath, INCallback) {
        // INSpritePath = "ui/" + INSpritePath;
        cc.loader.loadRes(INSpritePath, cc.SpriteFrame, (err, res) => {
            if(err) {
                g_logTool.warn("load res error: ", INSpritePath);
                return;
            }
            INNode.getComponent(cc.Sprite).spriteFrame = res;
            INCallback ? INCallback() : null;
        })
    }
    return ResManager;
})();