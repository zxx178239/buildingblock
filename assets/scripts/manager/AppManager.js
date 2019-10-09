/*
 * @Author: xxZhang
 * @Date: 2019-08-08 14:30:23
 * @Description: 游戏管理器
 */

import {BlocksData} from "BlocksData";

export var AppManager = (function () {
    let instance;

    let _winLayer;
    let _loseLayer;

    var AppManager = function () {
        if (!instance) {
            instance = this;
            this.init();
        }
        return instance;
    };

    AppManager.prototype.init = function () {
        this._gameData = new BlocksData();
        this._isPlaySuccess = false;
    };

    AppManager.prototype.getGameData = function () {
        return this._gameData;
    };

    AppManager.prototype.setGameCtrl = function (INGameCtrl) {
        this._gameCtrl = INGameCtrl;
    };

    AppManager.prototype.getGameCtrl = function () {
        return this._gameCtrl;
    };

    /**
     * @description: 播放失败音效
     * @param : 
     * @return : 
     */
    AppManager.prototype.playFailedSound = function (INCallback) {
        g_audio.playSound("failed", false, true, INCallback);
    };

    /**
     * @description: 取代式播放失败音效
     * @param : 
     * @return : 
     */
    AppManager.prototype.replacePlayFailedSound = function (INCallback) {
        g_audio.replacePlaySound("failed", false, true, INCallback);
    }

    /**
     * @description: 播放成功音效
     * @param : 
     * @return : 
     */
    AppManager.prototype.playSuccessSound = function (INCallback) {
        g_audio.playSound("success", false, true, INCallback);
    };

    /**
     * @description: 取代式播放成功的音效，为了保证成功音效只有一个在播放，加了一个标志位
     * @param : 
     * @return : 
     */
    AppManager.prototype.replacePlaySuccessSound = function (INCallback) {
        if (this._isPlaySuccess) {
            return;
        }
        this._isPlaySuccess = true;
        g_audio.replacePlaySound("success", false, true, () => {
            this._isPlaySuccess = false;
            if (INCallback) {
                INCallback();
            }
        });
    };

    AppManager.prototype.reset = function () {
        this._isPlaySuccess = false;
    };

    AppManager.prototype.setCurSceneNode = function(INSceneNode) {
        if(this._curSceneNode) {
            this._curSceneNode.active = false;
        }
        this._curSceneNode = INSceneNode;
    }

    AppManager.prototype.getCurSceneNode = function() {
        return this._curSceneNode;
    }

    /**
     * @description: 切换到大厅场景
     * @param : 
     * @return : 
     */
    AppManager.prototype.replaceToHallScene = function (INFlag) {
        g_app.getGameData().reset();
        // g_app.reset();
        g_audio.stopAllEffects();
        g_audio.stopMusic();

        g_resManager.requirePrefabFile("prefabs/hall/Hall", (INNode) => {
            let sceneCanvas = cc.director.getScene().getChildByName("Canvas");
            INNode.parent = sceneCanvas;
            INNode.position = cc.v2(0, 0);
            this._curSceneNode.destroy();
            g_app.setCurSceneNode(INNode);
        })
    };

    /**
     * @description: 通过过渡场景进入游戏场景
     * @param : 
     * @return : 
     */
    AppManager.prototype.replaceToGameScene = function () {
        g_resManager.requirePrefabFile("prefabs/game/Game", (INNode) => {
            let sceneCanvas = cc.director.getScene().getChildByName("Canvas");
            INNode.parent = sceneCanvas;
            INNode.position = cc.v2(0, 0);
            this.setCurSceneNode(INNode);
        })
    };

    /**
     * @description: 显示失败场景
     * @param : 
     * @return : 
     */
    AppManager.prototype.showLoseLayer = function() {
        g_resManager.requirePrefabFile("prefabs/game/LayerLose", (INNode) => {
            let sceneCanvas = cc.director.getScene().getChildByName("Canvas");
            this._loseLayer = INNode;
            this._loseLayer.parent = sceneCanvas;
            this._loseLayer.position = cc.v2(0, cc.winSize.height);
            let moveAction = cc.moveTo(1, cc.v2(0, 0));
            this._loseLayer.runAction(moveAction);
        })
    };

    /**
     * @description: 显示胜利场景
     * @param : 
     * @return : 
     */
    AppManager.prototype.showWinLayer = function() {
        g_resManager.requirePrefabFile("prefabs/game/LayerWin", (INNode) => {
            let sceneCanvas = cc.director.getScene().getChildByName("Canvas");
            // this._winLayer = INNode;
            INNode.parent = sceneCanvas;
            INNode.position = cc.v2(0, cc.winSize.height);
            let moveAction = cc.moveTo(1, cc.v2(0, 0));
            INNode.runAction(moveAction);
        })
    };

    // /**
    //  * @description: 设置、更新及获取游戏进度
    //  * @param : 
    //  * @return : 
    //  */
    // AppManager.prototype.setGameProgress = function (INLevel) {
    //     let enterModel = g_app.getGameData().getEnterModel();
    //     if (enterModel === ENTER_GAME_MODEL.FROM_LINK) {
    //         return;
    //     }
    //     g_netManager.sendHttpPost("/education/common/progress/update",
    //         {
    //             "progressType": SUDOKU_PROGRESSTYPE,
    //             "progressKeyMap": {
    //                 "courseId": g_app.getGameData().getGameId()
    //             },
    //             "progressValue": {
    //                 "firstNode": g_app.getGameData().getGameMaxProgress(),
    //                 "secondNode": JSON.stringify({
    //                     "maxLevel": g_app.getGameData().getGameMaxProgress(),
    //                     "curLevel": INLevel
    //                 })
    //             }
    //         }
    //     );
    //     // cc.sys.localStorage.setItem("gamelevel", INLevel);
    // };

    // AppManager.prototype.testSetGameProgress = function (INLevel) {
    //     let enterModel = g_app.getGameData().getEnterModel();
    //     if (enterModel === ENTER_GAME_MODEL.FROM_LINK) {
    //         return;
    //     }
    //     g_netManager.sendHttpPost("/education/common/progress/update",
    //         {
    //             "progressType": SUDOKU_PROGRESSTYPE,
    //             "progressKeyMap": {
    //                 "courseId": 32622
    //             },
    //             "progressValue": {
    //                 "firstNode": INLevel - 1,
    //                 "secondNode": JSON.stringify({
    //                     "maxLevel": INLevel - 1,
    //                     "curLevel": INLevel
    //                 })
    //             }
    //         }
    //     );
    //     // cc.sys.localStorage.setItem("gamelevel", INLevel);
    // };

    // AppManager.prototype.updateGameProgress = function () {
    //     let enterModel = g_app.getGameData().getEnterModel();
    //     if (enterModel === ENTER_GAME_MODEL.FROM_LINK) {
    //         return;
    //     }
    //     // let curProgress = this.getGameProgress();
    //     let curLevel = g_app.getGameData().getGameCurProgress() + 1;
    //     if (curLevel >= MAX_GAME_LEVEL) {
    //         curLevel = MAX_GAME_LEVEL;
    //     }
    //     g_netManager.sendHttpPost("/education/common/progress/update",
    //         {
    //             "progressType": SUDOKU_PROGRESSTYPE,
    //             "progressKeyMap": {
    //                 "courseId": g_app.getGameData().getGameId()
    //             },
    //             "progressValue": {
    //                 "firstNode": g_app.getGameData().getGameMaxProgress() + 1,
    //                 "secondNode": JSON.stringify({
    //                     "maxLevel": g_app.getGameData().getGameMaxProgress() + 1,
    //                     "curLevel": curLevel
    //                 })
    //             }
    //         }
    //     );
    //     g_app.getGameData().setGameCurProgress(curLevel);
    //     g_app.getGameData().setGameMaxProgress(g_app.getGameData().getGameMaxProgress() + 1);
    // };

    // AppManager.prototype.getGameProgress = function (INCallback) {
    //     let enterModel = g_app.getGameData().getEnterModel();
    //     if (enterModel === ENTER_GAME_MODEL.FROM_LINK) {
    //         return 0;
    //     }
    //     let gameProgressData = g_app.getGameData().getGameProgressData();
    //     if(gameProgressData && gameProgressData !== "") {
    //         INCallback && INCallback();
    //         return;
    //     }

    //     g_netManager.sendHttpPost("/education/common/progress/get",
    //         {
    //             "progressType": SUDOKU_PROGRESSTYPE,
    //             "progressKeyMap": {
    //                 "courseId": g_app.getGameData().getGameId()
    //             }
    //         },
    //         (data) => {
    //             if (HHelpTools.isJSON(data)) {
    //                 data = JSON.parse(data);
    //             } else {
    //                 data = "";
    //             }

    //             if (data && HHelpTools.isJSON(data.secondNode)) {
    //                 g_app.getGameData().setGameProgressData(JSON.parse(data.secondNode));
    //             } else {
    //                 g_app.getGameData().setGameProgressData("");
    //             }

    //             INCallback && INCallback();
    //         })
    //     // let curProgress = parseInt(cc.sys.localStorage.getItem("gamelevel"));
    //     // if(curProgress) {
    //     //     return curProgress;
    //     // }else {
    //     //     return 1;
    //     // }
    // };

    // /**
    //  * @description: 清除进度，如果有回调的话则走回调
    //  * @param : 
    //  * @return : 
    //  */
    // AppManager.prototype.clearGameProgress = function (INCallback) {
    //     let enterModel = g_app.getGameData().getEnterModel();
    //     if (enterModel === ENTER_GAME_MODEL.FROM_LINK) {
    //         return;
    //     }
    //     g_netManager.sendHttpPost("/education/common/progress/update",
    //         {
    //             "progressType": SUDOKU_PROGRESSTYPE,
    //             "progressKeyMap": {
    //                 "courseId": g_app.getGameData().getGameId()
    //             },
    //             "progressValue": {
    //                 "firstNode": 0,
    //                 "secondNode": ""
    //             }
    //         },
    //         INCallback && INCallback()
    //     );
    //     g_app.getGameData().setGameProgressData(null);
    // }

    return AppManager;
})();