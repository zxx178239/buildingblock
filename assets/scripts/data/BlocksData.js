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

    reset() {

    }
}
