
/*
 * @Author: xxZhang
 * @Date: 2019-10-08 17:05:06
 * @Description: 游戏场景的显示
 */

import { LevelTagToPrefab } from "../public/ConstDefine";
import { HHelpTools } from "HHelpTools";

cc.Class({
    extends: Script,

    properties: {
        _allNodes: [],
        _curIndex: 0,
        _isShowWinLayer: false,

        nodeTime: {
            default: null,
            type: cc.Node
        },
        labelCountDown: {
            default: null,
            type: cc.Label
        },
        nodeKeep: {
            default: null,
            type: cc.Node
        },

        nodeWall: {
            default: null,
            type: cc.Node
        },

        _labelCountDownValue: 5,
        _countDownCallback: null,
    },


    onLoad() {
        cc.director.getPhysicsManager().enabled = true;

        cc.director.getPhysicsManager().debugDrawFlags = cc.PhysicsManager.DrawBits.e_aabbBit |
            cc.PhysicsManager.DrawBits.e_pairBit |
            cc.PhysicsManager.DrawBits.e_centerOfMassBit |
            cc.PhysicsManager.DrawBits.e_jointBit |
            cc.PhysicsManager.DrawBits.e_shapeBit
            ;
        cc.loader.loadResArray("prefabs/game", cc.Prefab, () => { }, () => {
            this.initLevel();
            console.log("open enables");
            // cc.director.getPhysicsManager().enabled = true;
        });
        cc.systemEvent.on("ready_next", this.readyNext, this);
        cc.systemEvent.on("do_countdown", this.doCountDown, this);
        cc.systemEvent.on("close_countdown", this.closeCountDown, this);
    },

    start() {

    },

    /**
     * @description: 重玩该关卡
     * @param : 
     * @return : 
     */
    repeatGame() {
        this.resetGame();
        let bigIndex = g_app.getGameData().getLevelBigIndex();
        let levelInfos = g_cfgManager.getConfigRecord("LevelConfigs", bigIndex);

        let levelTags = levelInfos["level_tags"];
        let subIndex = g_app.getGameData().getLevelSubIndex();
        this.geneAllBlocks(levelTags[subIndex]["block_list"]);
    },

    onDestroy() {
        cc.systemEvent.off("ready_next", this.readyNext, this);
        cc.systemEvent.off("do_countdown", this.doCountDown, this);
        cc.systemEvent.off("close_countdown", this.closeCountDown, this);
    },

    initLevel() {
        let bigIndex = g_app.getGameData().getLevelBigIndex();
        let levelInfos = g_cfgManager.getConfigRecord("LevelConfigs", bigIndex);

        let levelTags = levelInfos["level_tags"];
        let subIndex = g_app.getGameData().getLevelSubIndex();
        this.addLayerLevel(levelTags[subIndex]["level_prefab"]);
        this.geneAllBlocks(levelTags[subIndex]["block_list"]);
        // this.geneOneBlock(levelTags[subIndex]["block_list"], levelTags[subIndex]["block_list"].length - 1);
    },

    addLayerLevel(INPath) {
        g_resManager.requirePrefabFile(INPath, (INNode) => {
            INNode.parent = this.node;
            INNode.position = cc.v2(0, 0);
            let oldPos = INNode.children[0].position;
            this.scheduleOnce(() => {
                INNode.children[0].position = oldPos;
            }, 0);
            // console.log("INNode.pos: ", INNode.children[0].position);
        })
    },

    geneAllBlocks(INBlockList) {
        g_app.getGameData().setCurLevelBlockNums(INBlockList.length);
        for (let i = 0; i < INBlockList.length; ++i) {
            let prefabTag = INBlockList[i]["prefab_tag"];
            let prefabPath = LevelTagToPrefab[prefabTag];
            g_resManager.requirePrefabFile(prefabPath, (INNode) => {
                INNode.parent = this.node;
                this._allNodes.push(INNode);
                let icon = INBlockList[this._allNodes.length - 1]["icon"];
                INNode.position = cc.v2(0, -cc.winSize.height / 2 - 100);
                this.changeNodeLevel(INNode, prefabTag, icon);
                if (this._allNodes.length === INBlockList.length) {
                    this.doAllActions(this._allNodes, this._allNodes.length - 1);
                }
            });
        }
    },

    doAllActions(INNodeList, INIndex) {
        if (!INNodeList[INIndex]) {
            return;
        }
        this.doAction(INNodeList[INIndex], INIndex);
        this.scheduleOnce(() => {
            this.doAllActions(INNodeList, INIndex - 1);
        }, 0.3);
    },

    // geneOneBlock(INBlockList, INIndex) {
    //     if (!INBlockList[INIndex]) {
    //         return;
    //     }
    //     let prefabTag = INBlockList[INIndex]["prefab_tag"];
    //     let prefabPath = LevelTagToPrefab[prefabTag];
    //     let icon = INBlockList[INIndex]["icon"];
    //     g_resManager.requirePrefabFile(prefabPath, (INNode) => {
    //         INNode.parent = this.node;
    //         INNode.position = cc.v2(0, -cc.winSize.height / 2 - 100);
    //         this.doAction(INNode, INIndex === 0);
    //         this.changeNodeLevel(INNode, prefabTag, icon);
    //     });
    //     this.scheduleOnce(() => {
    //         this.geneOneBlock(INBlockList, INIndex - 1);
    //     }, 0.2);
    // },

    doAction(INNode, INIndex) {
        let endPosY = 0;
        if (INIndex === 0) {
            endPosY = cc.winSize.height / 2 - INNode.height / 2;
        } else {
            endPosY = cc.winSize.height / 2 + INNode.height;
        }
        INNode.script.beginMove(endPosY, INIndex);
    },

    changeNodeLevel(INNode, INTag, INIcon) {
        g_resManager.replaceSprite(INNode, INIcon, () => {
            switch (INTag) {
                case 0:
                    INNode.getComponent(cc.PhysicsBoxCollider).size = cc.size(INNode.width, INNode.height);
                    break;
                case 1:
                    INNode.getComponent(cc.PhysicsCircleCollider).radius = INNode.width / 2;
                    break;
                default:
                    break;
            }
        });
    },

    readyNext() {
        this._curIndex++;
        if (this._curIndex < this._allNodes.length) {
            let curNode = this._allNodes[this._curIndex];
            curNode.y = cc.winSize.height / 2 - curNode.height / 2
        }
    },

    doCountDown() {
        if (this._curIndex < this._allNodes.length ||
            this._isShowWinLayer) {
            return;
        }
        cc.systemEvent.emit("change_time_status", false);
        this._isShowWinLayer = true;
        this.labelCountDown.string = HHelpTools.fixedZero(this._labelCountDownValue, 2);
        this._countDownCallback = () => {
            this._labelCountDownValue--;
            this.labelCountDown.string = HHelpTools.fixedZero(this._labelCountDownValue, 2);
            if (this._labelCountDownValue === 0) {
                g_app.showWinLayer();
                this.unschedule(this._countDownCallback);
                this._countDownCallback = null;
            }
        }

        let action1 = cc.moveTo(0.5, cc.v2(0, cc.winSize.height / 2 - this.nodeKeep.height / 2));

        let action2 = cc.callFunc(() => {
            this._countDownCallback && this.schedule(this._countDownCallback, 1);
        })
        this.nodeKeep.runAction(cc.sequence(action1, action2));
        // this.countDownKeep(5);
    },

    resetGame() {
        for (let i = 0; i < this._allNodes.length; ++i) {
            this._allNodes[i].destroy();
        }
        this._allNodes = [];
        this._curIndex = 0;
        this._isShowWinLayer = false;
        this._labelCountDownValue = 5;

        this.nodeTime.script.reset();
        this.nodeWall.script.reset();
        this.nodeKeep.y = cc.winSize.height / 2 + this.nodeKeep.height / 2;
    },

    /**
     * @description: 停止倒计时
     * @param : 
     * @return : 
     */
    closeCountDown() {
        if (!this._countDownCallback) {
            return;
        }
        this.unschedule(this._countDownCallback);
        this._countDownCallback = null;
    },

    /**
     * @description: 确定是否已经判定胜利了
     * @param : 
     * @return : 
     */
    isShowWin() {
        return this._labelCountDownValue === 0;
    },

    /**
     * @description: 点击暂停按钮
     * @param : 
     * @return : 
     */
    onPressPause() {
        cc.director.pause();
        g_app.showPauseLayer();
    }
});
