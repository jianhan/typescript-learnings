/*
 * @Author: your name
 * @Date: 2020-06-04 21:28:55
 * @LastEditTime: 2020-06-04 21:44:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /typescript-learnings/functional-light-js/ch02/index.ts
 */

/*** All for one */
// a helper function ensure unary

function unary(fn) {
    return function onlyOneArg(arg) {
        return fn(arg)
    }
}

const twoArgs = (x, y) => {
    console.log(x, y, '-----')
    return x * y;
}

const oneArg = (x) => {
    console.log(x, '-----')
    return x * 2;
}

const twoArgsRes = ["1", "2", "3"].map(twoArgs);

const oneArgRes = ["1", "2", "3"].map(oneArg);

// this is because if map function accept a function has 2 parameters, then the first is value
// second is index, so following will not work

const parseIntResult = ["1", "2", "3"].map(parseInt);
// this works as following
// return parseInt("1", 0)
// return parseInt("2", 1)
// return parseInt("3", 2)

console.log(parseIntResult, parseInt("1", 0), parseInt("2", 1), parseInt("3", 2)) // [1, NaN, NaN] 1, NaN, NaN

// this is because For the signature parseInt(str,radix), it's clear that when map(..) passes index in the 
// second argument position, it's interpreted by parseInt(..) as the radix.

// Solution is to use unary

const parseIntUnaryResult = ["1", "2", "3"].map(unary(parseInt));
console.log(parseIntUnaryResult) // this works fine