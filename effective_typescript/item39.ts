/*
 * @Author: your name
 * @Date: 2020-06-09 21:47:11
 * @LastEditTime: 2020-06-09 22:16:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /typescript-learnings/effective_typescript/item39.ts
 */

/***Item 39: Prefer More Precise Variants of any to Plain any */

/***Things to Remember
• When you use any , think about whether any JavaScript value is truly permissible.
• Prefer more precise forms of any such as any[] or {[id: string]: any} or ()
=> any if they more accurately model your data. */

// when you have to use any, considering is there any way to declare the type
// which partially typed, in the case below at least we know it is array.
function getLengthBad(array: any) {
    return array.length;
}
// Don't do this!
function getLength(array: any[]) {
    return array.length;
}

// use case #1, parameter to be array of array, but do not care about type
function test(input: any[][]) {/** */ }

// use case #2, parameter is key string and any value
function test2(input: { [key: string]: any }) {/** */ }
function hasTwelveLetterKeyWithAny(o: { [key: string]: any }) {
    for (const key in o) {
        if (key.length === 12) {
            console.log(key, o[key]);
            return true;
        }
    }
    return false;
}

// use case #3: You could also use the object type in this situation, which includes all non-primitive
// types.
// difference, you can’t access the values of any of them
function hasTwelveLetterKeyWithObject(o: object) {
    for (const key in o) {
        if (key.length === 12) {
            console.log(key, o[key]);
            // ~~~~~~ Element implicitly has an 'any' type
            //because type '{}' has no index signature
            return true;
        }
    }
    return false;
}

// use case #4: working with functions
// Avoid using any if you expect a function type. You have several options here depend‐
// ing on how specific you want to get
type Fn0 = () => any; // any function callable with no params
type Fn1 = (arg: any) => any; // With one param
type FnN = (...args: any[]) => any; // With any number of params
// same as "Function" type


const numArgsBad = (...args: any) => args.length; // Returns any
const numArgsGood = (...args: any[]) => args.length; // Returns number