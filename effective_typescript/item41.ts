/*
 * @Author: your name
 * @Date: 2020-06-10 20:57:43
 * @LastEditTime: 2020-06-10 21:10:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /typescript-learnings/effective_typescript/item41.ts
 */

/***Item 41: Understand Evolving any */

/***Things to Remember
• While TypeScript types typically only refine, implicit any and any[] types are
allowed to evolve. You should be able to recognize and understand this construct
where it occurs.
• For better error checking, consider providing an explicit type annotation instead
of using evolving any . */

/***In TypeScript a variable’s type is generally determined when it is declared. After this,
it can be refined (by checking if it is null , for instance), but it cannot expand to
include new values */

/***EXCEPT ANY TYPE */

/***Evolving any comes with all the usual caveats about type inference. Is the correct type
for your array really (string|number)[] ? Or should it be number[] and you incor‐
rectly pushed a string ? You may still want to provide an explicit type annotation to
get better error checking instead of using evolving any . */

/***a function to generate a range of numbers */

function range(start, limit) {
    const out = [];
    for (let i = start; i < limit; i++) {
        out.push(i);
    }
    return out;
}

// TS version
function rangeTS(start: number, limit: number) {
    const out = []; // this is array of any
    for (let i = start; i < limit; i++) {
        out.push(i); // any[]
    }
    return out; // Return type inferred as number[]
}

// An array’s type can expand by pushing dif‐
// ferent elements onto it:
const result = []; // Type is any[]
result.push('a');
result // Type is string[]
result.push(1);
result // Type is (string | number)[]

// With conditionals, the type can even vary across branches
let val; // Type is any
if (Math.random() < 0.5) {
    val = /hello/;
    val // Type is RegExp
} else {
    val = 12;
    val // Type is number
}
val // Type is number | RegExp


// A final case that triggers this “evolving any” behavior is if a variable is initially null .
// This often comes up when you set a value in a try / catch block:
let val = null; // Type is any
try {
    somethingDangerous();
    val = 12;
    val // Type is number
} catch (e) {
    console.warn('alas!');
}
val // Type is number | null

//　＃this behavior only happens when a variable’s type is implicitly any with
// noImplicitAny set!