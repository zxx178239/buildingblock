/*
 * @Author: xxZhang
 * @Date: 2019-08-08 14:30:23
 * @Description: 配置表管理器
 */

import { LevelConfigs } from "LevelConfigs";

export var ConfigManager = (function () {
    let instance;
    
    let CFG_TBLS = {
        "LevelConfigs" : LevelConfigs,
    };

    var ConfigManager = function () {
        if (!instance) {
            instance = this;
            this.init();
        }
        return instance;
    };

    ConfigManager.prototype.init = function () {

    };

    /**
     * @description: 获取整张表信息
     * @param : 
     * @return : 
     */
    ConfigManager.prototype.getTbl = function(INTbl) {
        if(this.searchTbl(INTbl)) {
            return CFG_TBLS[INTbl];
        }else {
            g_logTool.warn("tbl not find: ", INTbl);
            return null;
        }
    };

    /**
     * @description: 获取表中的一条记录
     * @param : 
     * @return : 
     */
    ConfigManager.prototype.getConfigRecord = function(INTbl, INKey) {
        let tbl = this.getTbl(INTbl);
        if(tbl) {
            return tbl[INKey];
        }
    };

    /**
     * @description: 基于key和field获取某个字段的值
     * @param : 
     * @return : 
     */
    ConfigManager.prototype.getConfigField = function(INTbl, INKey, INField) {
        let record = this.getConfigRecord(INTbl, INKey);
        if(record) {
            return record[INField];
        }
    };
    
    /**
     * @description: 搜索表是否存在
     * @param : 
     * @return : 
     */
    ConfigManager.prototype.searchTbl = function(INTbl) {
        if(CFG_TBLS[INTbl]) {
            return true;
        }else {
            return false;
        }
    };

    return ConfigManager;
})();