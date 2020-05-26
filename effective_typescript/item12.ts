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

function rollDice1(sides: number): number { return 1 } // Statement
const rollDice2 = function (sides: number): number { return 1 }; // Expression
const rollDice3 = (sides: number): number => 1; // Also expression

// Advantages 1 when using function expression: one can declare function
// type declaration of entire function once and use it every where
type DiceRollFn = (sides: number) => number;
const rollDice: DiceRollFn = (sides): number => 1;

// Advantage 2: reduce repetition
/**Consider following declaration of functions */

function addFunc(a: number, b: number): number { return a + b }
function subFunc(a: number, b: number): number { return a - b }
function mulFunc(a: number, b: number): number { return a * b }
function divFunc(a: number, b: number): number { return a / b }

/**VS express version of function declaration */
// NOTICE how the paramter type declaration is gone
type binaryFunc = (a: number, b: number) => number;
const add: binaryFunc = (a, b) => a + b;
const sub: binaryFunc = (a, b) => a - b;
const mul: binaryFunc = (a, b) => a * b;
const div: binaryFunc = (a, b) => a / b;


/**In addition to being more concise, typing this entire function expression instead of its
parameters has given you better safety */

// Using typeof keyword to match function signature to another function

type unaryFunc = (x: number) => number;

const doubleNum: unaryFunc = x => x * 2;

const trippleNum: typeof doubleNum = x => x * 3;

console.log(trippleNum(3))