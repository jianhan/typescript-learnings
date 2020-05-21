/*
 * @Author: your name
 * @Date: 2020-05-21 18:54:46
 * @LastEditTime: 2020-05-21 19:36:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /typescript-learnings/itme7.ts
 */

/**
 * Things to Remember
• Think of types as sets of values (the type’s domain). These sets can either be finite
(e.g., boolean or literal types) or infinite (e.g., number or string ).
• TypeScript types form intersecting sets (a Venn diagram) rather than a strict hier‐
archy. Two types can overlap without either being a subtype of the other.
• Remember that an object can still belong to a type even if it has additional prop‐
erties that were not mentioned in the type declaration.
• Type operations apply to a set’s domain. The intersection of A and B is the inter‐
section of A ’s domain and B ’s domain. For object types, this means that values in A
& B have the properties of both A and B .
• Think of “extends,” “assignable to,” and “subtype of ” as synonyms for “subset of.”
 */


/**This is best thought of as a set of possible values. This set is known as the domain of
the type */

/**unit types: the smallest set which contains only one value */
type A = 'A'
type B = 'B'
type one = 1

/**union types */
type AB = A | B
type AB1 = A | B | one

/** How does type script compiler checks is one variable is assignable to another ?
 * by checking of one set is a sub set of another
 */

// Interface
/**Interface is a description of values in the domain of its type */
//Thinking of types as sets of values helps you reason about operations on them

interface Person {
    name: string;
}

interface Lifespan {
    birth: Date;
    death?: Date;
}

type PersonSpan = Person & Lifespan;


/** Type Union: The general rule is that values in an intersection type contain the union of properties in each of its constituents */
const ps: PersonSpan = {
    name: 'Alan Turing',
    birth: new Date('1912/06/23'),
    death: new Date('1954/06/07'),
}; // OK


// Intersecting
interface Student {
    name: string;
    age: number;
}

interface Animal {
    kind: string
}

type Test = Student | Animal;

const t: Test = { kind: "cat" }

console.log(t)

type K = keyof (Person | Lifespan);


// extends: means subtype
interface Vector1D { x: number; }
interface Vector2D extends Vector1D { y: number; }
interface Vector3D extends Vector2D { z: number; }

// extends can also appear as a constraint in a generic type, and it also means“subset of ” in this context

// Thinking in terms of sets, on the other hand, it’s crystal clear: any type whose domain
// is a subset of string will do
function getKey<K extends string>(val: any, key: K) {
    // ...
}


// It therefore makes sense that number[] is not assignable to [number, number] since it’s not a subset of it
type tuple = [number, number]
const tupleExample: tuple = [1, 2]
console.log(tupleExample)

// Is a triple assignable to a pair? NO
/**
 * Rather than modeling a pair of
numbers as {0: number, 1: number} , TypeScript models it as {0: number, 1: num
ber, length: 2} . This makes sense—you can check the length of a tuple—and it
precludes this assignment
 */
const triple: [number, number, number] = [1, 2, 3];
const double: [number, number] = triple;

/**If types are best thought of as sets of values, that means that two types with the same
sets of values are the same. And indeed this is true. */