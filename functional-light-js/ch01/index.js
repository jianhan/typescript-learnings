/*
 * @Author: your name
 * @Date: 2020-06-04 21:03:43
 * @LastEditTime: 2020-06-04 21:19:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /typescript-learnings/functional-light-js/ch01/index.ts
 */
/***Functional Programming is about embracing using functions as functions in this mathematical sense. */
// a mathematical function is one input , one output, no side effect, pure function, considering
var double = function (x) { return x * 2; };
var y = 3;
var foo = function (x) {
    x = 12;
    return x;
};
foo(y);
/***Tip: The length property of a function is read-only and it's determined at the time you declare the function.
 * It should be thought of as essentially a piece of metadata that describes something about the intended usage of the function. */
console.log(y, foo.length);
// beware different types of parameters can change the length
function foo2(x, y) {
    if (y === void 0) { y = 2; }
    // .. length: 2
}
function bar(x) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    // .. length: 1
}
function baz(_a) {
    var a = _a.a, b = _a.b;
    // .. length: 1
}
console.log('foo2:', foo2.length, 'bar:', bar.length, 'barz:', baz.length);
// arguments object is array like
function fooArgs(x, y, z) {
    console.log(arguments.length);
}
fooArgs(3, 4, 5);
/***Parameter Destructuring */
function fooDest() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    // args is array
    console.log(args);
}
fooDest(1, 2, 3, 4, 5);
// when declaring named variables
function fooNamed(_a) {
    var _b = _a === void 0 ? [] : _a, x = _b[0], y = _b[1], args = _b.slice(2);
    console.log(x, y, args);
}
fooNamed([1, 2, [1, 23]]);
