/*
 * @Author: your name
 * @Date: 2020-06-07 14:41:15
 * @LastEditTime: 2020-06-07 14:50:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /typescript-learnings/effective_typescript/item38.ts
 */

/***Item 38: Use the Narrowest Possible Scope for any Types */

function processBar(b: Bar) { /* ... */ }
function f() {
    const x = expressionReturningFoo();
    processBar(x);
    //~Argument of type 'Foo' is not assignable to
    //parameter of type 'Bar'
}

// then when use any , do not any the entire x:
function f1() {
    const x: any = expressionReturningFoo(); // Don't do this
    processBar(x);
}

// do this, because the x will only be any with argument of processBar
// the rest remains the same
function f2() {
    const x = expressionReturningFoo();
    processBar(x as any); // Prefer this
}

// same as 
const config: Config = {
    a: 1,
    b: 2,
    c: {
        key: value
    }
} as any; // Don't do this!

// do this instead
const config: Config = {
    a: 1,
    b: 2, // These properties are still checked
    c: {
        key: value as any
    }
};