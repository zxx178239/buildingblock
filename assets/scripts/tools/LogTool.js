/*
 * @Author: xxZhang
 * @Date: 2019-06-25 13:43:00
 * @Description: 日志管理类
 */

 /**
  * 用法说明
  * g_logTool.info("info: ", "12345", "23456");
    g_logTool.info();
    g_logTool.log("log: ", g_gameTool, "23456");
    g_logTool.warn("warn: ", this.node, "323423");
    g_logTool.error("error: ", g_audioTool, "12313");
    g_logTool.dump({"223": 1});
  */

import {GameDefine} from "ConstDefine";

export var LogTool = (function() {
    var instance;
    var _logLevel;
    var LogTool = function() {
        if(!instance) {
            instance = this;
            this.init();
        }
        return instance;
    };

    LogTool.prototype.init = function() {
        this._logLevel = GameDefine.LOG_LEVEL;
    };

    LogTool.prototype.info = function(){
        if(this._logLevel <= 3) {
            return;
        }
        console.info(cc.js.formatStr.apply(cc, arguments));
    };

    LogTool.prototype.log = function() {
        if(this._logLevel <= 3) {
            return;
        }
        console.log(cc.js.formatStr.apply(cc, arguments));
    }; 

    LogTool.prototype.warn = function() {
        if(this._logLevel <= 2) {
            return;
        }
        console.warn(cc.js.formatStr.apply(cc, arguments));
    };

    LogTool.prototype.error = function() {
        if(this._logLevel <= 1) {
            return;
        }
        console.error(cc.js.formatStr.apply(cc, arguments));
    };
    
    /**
     * @description: 打印json格式字符
     * @param : json格式的参数
     * @return : 
     */
    LogTool.prototype.dump = function(INObject) {
        if(this._logLevel <= 1) {
            return;
        }
        
        if(typeof(INObject) == "object" && 
            Object.prototype.toString.call(INObject).toLowerCase() == "[object object]" && 
            !INObject.length) {
            console.log(JSON.stringify(INObject));
        }else {
            console.error("INObject is not json object, cannot dump");
        }
    }

    return LogTool;
})();

// exports.LogTool = LogTool;