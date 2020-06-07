/*
 * @Author: your name
 * @Date: 2020-06-06 23:58:37
 * @LastEditTime: 2020-06-07 12:08:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /typescript-learnings/effective_typescript/item37.ts
 */
/***Item 37: Consider “Brands” for Nominal Typing */
function isString(test) {
    return typeof test === "string";
}
function isStringBoolean(test) {
    return typeof test === "string";
}
function example(foo) {
    if (isString(foo)) {
        console.log("it is a string " + foo);
        console.log(foo.length); // string function
    }
}
function exampleBool(foo) {
    if (isStringBoolean(foo)) {
        console.log("it is a string " + foo);
        console.log(foo.length); // string function
        console.log(foo.toExponential(2));
    }
}
example("hello world");
exampleBool("hello world");
// type AbsolutePath = string & { _brand: 'abs' };
// function listAbsolutePath(path: AbsolutePath) {
//     console.log(path)
// }
// function isAbsolutePath(path: string): path is AbsolutePath {
//     return path.startsWith('/');
// }
