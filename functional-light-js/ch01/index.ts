/*
 * @Author: your name
 * @Date: 2020-06-04 21:03:43
 * @LastEditTime: 2020-06-04 21:24:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /typescript-learnings/functional-light-js/ch01/index.ts
 */

/***Functional Programming is about embracing using functions as functions in this mathematical sense. */
// a mathematical function is one input , one output, no side effect, pure function, considering

const double = (x: number): number => x * 2

let y = 3;

const foo = (x: number): number => {
    x = 12;
    return x;
}

foo(y)

/***Tip: The length property of a function is read-only and it's determined at the time you declare the function. 
 * It should be thought of as essentially a piece of metadata that describes something about the intended usage of the function. */
console.log(y, foo.length)

// beware different types of parameters can change the length
function foo2(x, y = 2) {
    // .. length: 2
}

function bar(x, ...args) {
    // .. length: 1
}

function baz({ a, b }) {
    // .. length: 1
}

console.log('foo2:', foo2.length, 'bar:', bar.length, 'barz:', baz.length)

// arguments object is array like
function fooArgs(x, y, z) {
    console.log(arguments.length);
}

fooArgs(3, 4, 5);

/***Parameter Destructuring */

function fooDest(...args) {
    // args is array
    console.log(args)
}

fooDest(1, 2, 3, 4, 5)

// when declaring named variables

function fooNamed([x, y, ...args] = []) {
    console.log(x, y, args)
}

// this does not work in typescript
// fooNamed([1, 2, 3]);

function namedArgument({ x, y } = {}) {
    console.log(x, y)
}