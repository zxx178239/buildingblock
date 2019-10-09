/*
 * @Author: xxZhang
 * @Date: 2019-10-08 15:31:35
 * @Description: 搭积木游戏的数据层
 */

export class BlocksData {
    constructor() {

    }

    /**
     * @description: 设置及获取外围大的关卡索引，默认返回0
     * @param : 
     * @return : 
     */
    setLevelBigIndex(INBigIndex) {
        this._bigIndex = INBigIndex;
    }

    getLevelBigIndex() {
        return this._bigIndex || 0;
    }

    /**
     * @description: 设置及获取子索引
     * @param : 
     * @return : 
     */
    setLevelSubIndex(INSubIndex) {
        this._subIndex = INSubIndex;
    }

    getLevelSubIndex() {
        return this._subIndex;
    }

    /**
     * @description: 设置及获取当前关卡的积木数
     * @param : 
     * @return : 
     */
    setCurLevelBlockNums(INNums) {
        this._blockNums = INNums;
    }

    getCurLevelBlockNums() {
        return this._blockNums;
    }

    /**
     * @description: 获取真正的关卡值，如果不需要的话则直接显示subIndex + 1即可
     * @param : 
     * @return : 
     */
    getCombineIndex() {
        let levelConfigs = g_cfgManager.getTbl("LevelConfigs");
        let oldIndex = 0;
        for(let i = 0; i < this._bigIndex; ++ i) {
            oldIndex += levelConfigs[i]["level_tags"].length;
        }

        return oldIndex + this._subIndex + 1;
    }

    /**
     * @description: 设置及获取花费的时间字符串
     * @param : 
     * @return : 
     */
    setCostTimeStr(INTimeStr) {
        this._timeStr = INTimeStr;
    }

    getCostTimeStr() {
        return this._timeStr;
    }

    reset() {

    }
}
