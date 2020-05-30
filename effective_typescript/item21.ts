/*
 * @Author: your name
 * @Date: 2020-05-30 11:33:38
 * @LastEditTime: 2020-05-30 12:34:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /typescript-learnings/effective_typescript/item21.ts
 */

/**Item 21: Understand Type Widening */
// What is Widening ????

/**Things to Remember
• Understand how TypeScript infers a type from a constant by widening it.
• Familiarize yourself with the ways you can affect this behavior: const , type anno‐
tations, context, and as const . */

/**a variable has a set of possible values,
namely, its type. When you initialize a variable with a constant but don’t provide a
type, the type checker needs to decide on one. In other words, it needs to decide on a
set of possible values from the single value that you specified. In TypeScript, this pro‐
cess is known as widening */

interface Vector3 { x: number; y: number; z: number; }
function getComponent(vector: Vector3, axis: 'x' | 'y' | 'z') {
    return vector[axis];
}

let x1 = 'x';
let vec = { x: 10, y: 20, z: 30 };
getComponent(vec, x1);

let xyz = 'xyz'
xyz = /x|y|z/

/**TypeScript attempts to strike a balance between
specificity and flexibility. The general rule is that a variable’s type shouldn’t change
after it’s declared (Item 20), so string makes more sense than string|RegExp or
string|string[] or any . */

const v = {
    x: 1,
};
v.x = 3; // OK
v.x = '3';
// ~ Type '"3"' is not assignable to type 'number'
v.y = 4;
// ~ Property 'y' does not exist on type '{ x: number; }'
v.name = 'Pythagoras';
// ~~~~ Property 'name' does not exist on type '{ x: number; }'

/**If you know better, there are a few ways to override TypeScript’s default behavior. One
is to supply an explicit type annotation: */
const vKv: { x: 1 | 3 | 5 } = {
    x: 1,
}; // Type is { x: 1 | 3 | 5; }
vKv.x = 1

const v1 = {
    x: 1,
    y: 2,
}; // Type is { x: number; y: number; }


type immX = 1

v1.x = 22; //OK

const v2 = {
    x: 1 as const, // this is the same type as immX above
    y: 2,
}; // Type is { x: 1; y: number; }

// Notice here, when use `as const` after a variable, it instruct typescript
// to infer the narrowest possible value, there is NO WIDENING, thus the value is type 1 for x

const v3 = {
    x: 1,
    y: 2,
} as const; // Type is { readonly x: 1; readonly y: 2; }

const a1 = [1, 2, 3]; // Type is number[]
const a2 = [1, 2, 3] as const; // Type is readonly [1, 2, 3]

/**If you’re getting incorrect errors that you think are due to widening, consider adding
some explicit type annotations or const assertions. Inspecting types in your editor is
the key to building an intuition for this */
