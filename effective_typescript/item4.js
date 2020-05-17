/*
 * @Author: your name
 * @Date: 2020-05-17 13:32:21
 * @LastEditTime: 2020-05-17 13:43:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /typescript-learnings/effective_typescript/item4.ts
 */
/**
 * calculateLength accept parameter type of Vector2D, but you can pass
 * anything that is contains properties defined in Vector2D, does not have to be
 * exactly Vector2D type, this is duck typing.
 *
 * @param v
 */
function calculateLength(v) {
    return Math.sqrt(v.x * v.x + v.y * v.y);
}
var v = { x: 3, y: 4, name: "test" };
var r = calculateLength(v);
console.log(r);
