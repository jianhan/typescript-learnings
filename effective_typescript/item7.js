/*
 * @Author: your name
 * @Date: 2020-05-21 18:54:46
 * @LastEditTime: 2020-05-21 19:34:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /typescript-learnings/itme7.ts
 */
/** Type Union: The general rule is that values in an intersection type contain the union of properties in each of its constituents */
var ps = {
    name: 'Alan Turing',
    birth: new Date('1912/06/23'),
    death: new Date('1954/06/07')
}; // OK
var t = { kind: "cat" };
console.log(t);
// extends can also appear as a constraint in a generic type, and it also means“subset of ” in this context
// Thinking in terms of sets, on the other hand, it’s crystal clear: any type whose domain
// is a subset of string will do
function getKey(val, key) {
    // ...
}
var tupleExample = [1, 2];
console.log(tupleExample);
