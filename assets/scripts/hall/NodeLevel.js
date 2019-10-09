/*
 * @Author: xxZhang
 * @Date: 2019-10-08 15:43:25
 * @Description: 每个关卡的信息
 */

cc.Class({
    extends: Script,

    properties: {
        iconTag: {
            default: null,
            type: cc.Node
        },
        labelTitle: {
            default: null,
            type: cc.Label
        },
        nodeLock: {
            default: null,
            type: cc.Node
        },
        nodeStars: {
            default: [],
            type: [cc.Node]
        },
        _index: 0,
    },


    onLoad () {},

    start () {

    },

    initUI(INTagInfo, INIndex) {
        this._index = INIndex;
        let tag = INTagInfo["tag"];
        g_resManager.replaceSprite(this.iconTag, tag);
        this.initStar();
    },

    initStar() {
        for(let i = 0; i < this.nodeStars.length; ++ i) {
            this.nodeStars[i].active = false;
        }
    },

    onPressLevel() {
        g_app.getGameData().setLevelSubIndex(this._index);
        g_app.replaceToGameScene();
    },

    
});
