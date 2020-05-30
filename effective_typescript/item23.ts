/*
 * @Author: your name
 * @Date: 2020-05-30 15:39:10
 * @LastEditTime: 2020-05-30 16:24:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /typescript-learnings/effective_typescript/item23.ts
 */

/***Item 23: Create Objects All at Once */
// Preferring create object with all properties at once

/***Things to Remember
• Prefer to build objects all at once rather than piecemeal. Use object spread
( {...a, ...b} ) to add properties in a type-safe way.
• Know how to conditionally add properties to an object. */

const pt = {};
pt.x = 3;
// ~ Property 'x' does not exist on type '{}'
pt.y = 4;
// ~ Property 'y' does not exist on type '{}'

// this is because type script inferred the type of pt is an empty object
// with no properties

// You get the opposite problem if you define a Point interface:
interface Point { x: number; y: number; }
const pt: Point = {};
// ~~ Type '{}' is missing the following properties from type 'Point': x, y
pt.x = 3;
pt.y = 4;


/***Solution: declare all at once */
const pt: Point = {
    x: 3,
    y: 4,
}; // OK


/***If you must construct an object piece by piece, then use assertion */
interface Square {
    w: number;
    h: number
}

const s = { w: 12 } as Square
s.h = 22; // OK


/***Build larger object from smaller one, DO NOT DO IT IN STEPS< DO IT IN ONE STEP */
const pt = { x: 3, y: 4 };
const id = { name: 'Pythagoras' };
const namedPoint = {};
Object.assign(namedPoint, pt, id);
namedPoint.name;
// ~~~~ Property 'name' does not exist on type '{}'

const namedPoint = { ...pt, ...id };
namedPoint.name; // OK, type is string

// field by field object building
// The key is to use a new variable on every update so that each gets a new
// type:

const pt0 = {};
const pt1 = { ...pt0, x: 3 };
const pt: Point = { ...pt1, y: 4 };
// OK

/***To conditionally add a property in a type-safe way, you can use object spread with
null or {} , which add no properties: */
declare let hasMiddle: boolean;
const firstLast = { first: 'Harry', last: 'Truman' };
const president = { ...firstLast, ...(hasMiddle ? { middle: 'S' } : {}) };