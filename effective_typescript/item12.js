/*
 * @Author: your name
 * @Date: 2020-05-26 15:53:04
 * @LastEditTime: 2020-05-26 16:10:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /typescript-learnings/effective_typescript/item12.ts
 */
/**Item 12: Apply Types to Entire Function Expressions When
Possible */
/**Things to Remember
• Consider applying type annotations to entire function expressions, rather than to
their parameters and return type.
• If you’re writing the same type signature repeatedly, factor out a function type or
look for an existing one. If you’re a library author, provide types for common
callbacks.
• Use typeof fn to match the signature of another function. */
// Function statement vs function expression
function rollDice1(sides) { return 1; } // Statement
var rollDice2 = function (sides) { return 1; }; // Expression
var rollDice3 = function (sides) { return 1; }; // Also expression
var rollDice = function (sides) { return 1; };
// Advantage 2: reduce repetition
/**Consider following declaration of functions */
function addFunc(a, b) { return a + b; }
function subFunc(a, b) { return a - b; }
function mulFunc(a, b) { return a * b; }
function divFunc(a, b) { return a / b; }
var add = function (a, b) { return a + b; };
var sub = function (a, b) { return a - b; };
var mul = function (a, b) { return a * b; };
var div = function (a, b) { return a / b; };
var doubleNum = function (x) { return x * 2; };
var trippleNum = function (x) { return x * 3; };
console.log(trippleNum(3));
