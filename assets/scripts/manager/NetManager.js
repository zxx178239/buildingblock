/*
 * @Author: xxZhang
 * @Date: 2019-08-09 09:59:29
 * @Description: 网络管理器
 */
import { ENTER_GAME_MODEL } from "ConstDefine";
// import { httpPost } from "api";
// import { HHelpTools } from "HHelpTools";

export var NetManager = (function () {
    let instance;
    

    var NetManager = function () {
        if (!instance) {
            instance = this;
            this.init();
        }
        return instance;
    };

    NetManager.prototype.init = function () {
    };

    /**
     * @description: 发送http post请求，此时判定一下玩家是通过哪种方式进入游戏的，如果是链接进入，则不需要发送
     * @param : 
     * @return : 
     */
    NetManager.prototype.sendHttpPost = function(INUrl, INParams, INCallback) {
        let enterModel = g_app.getGameData().getEnterModel();
        if(enterModel === ENTER_GAME_MODEL.FROM_LINK) {
            return;
        }
        this.doHttpPost(INUrl, INParams, INCallback);
    };

    /**
     * @description: 发送httpPost消息
     * @param : INUrl：后缀， INParams：json格式，INCallback：接收的回调
     * @return : 
     */
    NetManager.prototype.doHttpPost = function(INUrl, INParams, INCallback) {
        // httpPost(INUrl, INParams).then((obj) => {
        //     let {code, data} = obj;
        //     if(code == 10000) {
        //         INCallback ? INCallback(data) : null;
        //     }else {
        //         HHelpTools.showExceptPopUI("服务器异常\n请稍后再试或联系客服\n",
        //                                 "desc: " + obj.desc);
        //         g_logTool.warn(obj.desc);
        //     }
        // });
    };

    return NetManager;
})();