/*
 * @Author: xxZhang
 * @Date: 2019-07-04 09:06:32
 * @Description: 帮助工具
 */
import { AppManager } from "AppManager";
import { LogTool } from "LogTool";
import { ResManager } from "ResManager";
import { AudioManager } from "AudioManager";
import { NetManager } from "NetManager";
import { ConfigManager } from "ConfigManager";

class HHelpTools {

    /**
     * @description: 按列数要求有序插入节点
     * @param : INDatas: 数据 INParentNode：父节点 INChildNode：孩子节点 INColumn：列数； INScale: 缩放值, 其他参数
     * @return : 
     */
    static insertNodeForGrid() {
        let datas = arguments[0];
        let parentNode = arguments[1];
        let childNode = cc.instantiate(arguments[2]);
        let columnNums = arguments[3];
        let scaleValue = arguments[4];
        let args = Array.prototype.slice.call(arguments);
        let rowNums = Math.floor(datas.length / columnNums);

        let width = childNode.width * scaleValue;
        let height = childNode.height * scaleValue;

        let spacingX = (parentNode.width - width * columnNums) / (columnNums + 1);
        let spacingY = (parentNode.height - height * rowNums) / (rowNums + 1);
        let index = 0;
        for(let i = 0; i < rowNums; ++ i) {
            let yPos = -((spacingY + height) * i + spacingY + height / 2); 
            for(let j = 0; j < columnNums; ++ j) {
                let xPos = (spacingX + width) * j + spacingX + width / 2;
                let curNode = cc.instantiate(childNode);
                curNode.scale = scaleValue;
                curNode.position = cc.v2(xPos, yPos);
                curNode.parent = parentNode;
                curNode.script.initUI(datas[index], index, args.slice(5));
                ++ index;
            }
        }
    }

    static showPopUIWithTwoButton(INContent, INConfirm, INCancel) {
        g_resManager.requirePrefabFile("prefabs/common/LayerPopUI", (prefabNode) => {
            let scene = cc.director.getScene().getChildByName("Canvas");
            scene.addChild(prefabNode);
            let prefabScript = prefabNode.getComponent("LayerPopUI");
            prefabScript.initUI(INContent, INConfirm, INCancel);
        })
    }


    /**
     * @description: 显示异常弹窗
     * @param : 
     * @return : 
     */
    static showExceptPopUI(INInfo, INExceptInfo, INConfirmCallback) {
        g_resManager.requirePrefabFile("prefabs/common/LayerExceptPopUI", (prefabNode) => {
            let scene = cc.director.getScene().getChildByName("Canvas");
            scene.addChild(prefabNode);
            prefabNode.zIndex = 1000;
            prefabNode.script.initUI(INInfo, INExceptInfo, INConfirmCallback);
        })
    }

    static getGameScale() {
        let DesignWidth = 667,
            DesignHeight = 375,
            DesignRatio = DesignWidth / DesignHeight,
            { width, height } = cc.winSize,
            ratio = width / height,
            scale;
        if (ratio > DesignRatio) {
            scale = 1;
        } else if (ratio < DesignRatio) {
            scale = width / (height * DesignRatio);
        } else {
            scale = 1;
        }
        return scale;
    }

    /**
     * @description: 判定当前字符串是否是json
     * @param : 
     * @return : 
     */
    static isJSON(str) {
        if (typeof str == 'string') {
            try {
                var obj=JSON.parse(str);
                if(typeof obj == 'object' && obj ){
                    return true;
                }else{
                    return false;
                }
    
            } catch(e) {
                console.log('error：'+str+'!!!'+e);
                return false;
            }
        }
    }

    /**
     * @description: 初始化所有的管理器
     * @param : 
     * @return : 
     */
    static initAllManager() {
        if(window.g_app) {
            return;
        }
        window.g_app = new AppManager();
        window.g_logTool = new LogTool();
        window.g_resManager = new ResManager();
        window.g_audio = new AudioManager();
        window.g_netManager = new NetManager();
        window.g_cfgManager = new ConfigManager();
        cc.game.setFrameRate(30);
    }

    static setResizeListener() {
        if (!cc.sys.isNative) {
            cc.view.setResizeCallback(() => {
                let curScene = cc.director.getScene();
                if(curScene.name === "HallScene") {
                    let curLevel = g_app.getGameData().getGameCurProgress();
                    if(!curLevel) {
                        return;
                    }
                    let canvas = curScene.getChildByName("Canvas");
                    
                    let curNode = canvas.script.spriteNode.getChildByName(`NodeLevel${curLevel}`);
                    canvas.script.spriteNode.getComponent("CameraTouch").initCameraLoc(curNode);

                    canvas.script.resizeUIScale();
                }else if(curScene.name === "Sudoku") {
                    curScene.getChildByName("Canvas").script.resizeUIScale();
                }
            });
        }
    }

    static calPrice(INPrice) {
        INPrice = INPrice / 100;
        return parseFloat(INPrice.toFixed(2)); 
    }
}

module.exports.HHelpTools = HHelpTools;
