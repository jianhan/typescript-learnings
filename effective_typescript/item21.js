/*
 * @Author: your name
 * @Date: 2020-05-30 11:33:38
 * @LastEditTime: 2020-05-30 11:45:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /typescript-learnings/effective_typescript/item21.ts
 */
function getComponent(vector, axis) {
    return vector[axis];
}
var x = 'x';
console.log(x, "BEFORE");
var vec = { x: 10, y: 20, z: 30 };
console.log(x, "AFTER");
// getComponent(vec, x);
