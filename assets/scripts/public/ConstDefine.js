/*
 * @Author: xxZhang
 * @Date: 2019-10-08 15:24:10
 * @Description: 所有的宏定义
 */
export const GameDefine = {
    LOG_LEVEL: 4,                               // 日志等级，数值越大，等级越高，>=2->error, >=3->error, warn, >=4->error, warn, log
    TEST_COURSE_FLAG: false,                     // 是否是测试课程标志位
    TEST_GAME_NAME: "game001",                  // 测试显示的游戏名字，
}

// 配置表的tag到prefab的映射关系
export const LevelTagToPrefab = {
    0: "prefabs/game/NodeBlockRect",
    1: "prefabs/game/NodeBlockCircle",
    2: "prefabs/game/NodeBlockTriangle1",
    3: "prefabs/game/NodeBlockTriangle2",
    4: "prefabs/game/NodeBlockTriangle3",
    5: "prefabs/game/NodeBlockTriangle4",
    6: "prefabs/game/NodeBlockTriangle5",
    7: "prefabs/game/NodeBlockTriangle6",
    8: "prefabs/game/NodeBlockTriangle7",
    9: "prefabs/game/NodeBlockTriangle8",
    10: "prefabs/game/NodeBlockTriangle9",
}