/*
 * @Author: your name
 * @Date: 2020-05-30 10:57:03
 * @LastEditTime: 2020-05-30 11:29:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /typescript-learnings/effective_typescript/item19.ts
 */

/**Things to Remember
• Avoid writing type annotations when TypeScript can infer the same type.
• Ideally your code has type annotations in function/method signatures but not on
local variables in their bodies.
• Consider using explicit annotations for object literals and function return types
even when they can be inferred. This will help prevent implementation errors
from surfacing in user code. */

// TypeScript many annotations are unnecessary. Declaring types for all your
// variables is counterproductive and is considered poor style

let x: number = 12; // BAD
let y = 12; // good

// Another problem using type annotation unnecessarily is it makes
// refactored a bit hard, if using inferred , it is better, example:

interface Animal {
    id: number
    name: string
    kind: string
    age: number
}

function logAnimal(a: Animal) {
    const id: number = a.id;
    const name: string = a.name;
    const kind: string = a.kind;
}

// now say you want to update the ID from number to UUID, then
// you need to change, a better way of doing it is to using 
// inferred type

function logProduct(a: Animal) {
    // inferred here, if the type of id changed in 
    // animal, then this code do not to be changed
    const { id, name, kind } = a;
    console.log(id, name, kind);
}

// when using callback function do NOT use type annotation
// Don't do this:
app.get('/health', (request: express.Request, response: express.Response) => {
    response.send('OK');
});

// Do this:
app.get('/health', (request, response) => {
    response.send('OK');
});