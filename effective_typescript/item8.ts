/*
 * @Author: your name
 * @Date: 2020-05-21 20:10:52
 * @LastEditTime: 2020-05-21 20:33:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /typescript-learnings/effective_typescript/item8.ts
 */

/**Things to Remember
• Know how to tell whether you’re in type space or value space while reading a
TypeScript expression. Use the TypeScript playground to build an intuition for
this.
• Every value has a type, but types do not have values. Constructs such as type and
interface exist only in the type space.
• "foo" might be a string literal, or it might be a string literal type. Be aware of this
distinction and understand how to tell which it is.
• typeof , this , and many other operators and keywords have different meanings
in type space and value space.
• Some constructs such as class or enum introduce both a type and a value. */

class Cylinder {
    radius = 1;
    height = 1;
}

function calculateVolume(shape: unknown) {
    if (shape instanceof Cylinder) {
        shape // OK, type is Cylinder
        shape.radius // OK, type is number
    }
}

const n = 12;

/**
 * n a value context, typeof is JavaScript’s runtime typeof operator. It returns a string
containing the runtime type of the symbol. This is not the same as the TypeScript
type! JavaScript’s runtime type system is much simpler than TypeScript’s static type
system. In contrast to the infinite variety of TypeScript types, there have historically
only been six runtime types in JavaScript: “string,” “number,” “boolean,” “undefined,”
“object,” and “function.”
 */
const n1 = typeof n;

/**
 * In a type context, typeof takes a value and returns its TypeScript type. You can use
these as part of a larger type expression, or use a type statement to give them a name
 */
const cy = typeof Cylinder;
console.log(n1, cy)

/**typeof always operates on values. You can’t apply it to types. The class keyword
introduces both a value and a type, so what is the typeof a class? It depends on the
context */

const cyv = typeof Cylinder; // Value is "function"
type T = typeof Cylinder; // Type is typeof Cylinder

/**You can go between the constructor type and the instance type using the Instance
Type generic: */
type IC = InstanceType<typeof Cylinder>;// Type is Cylinder

class Person {
    first: string | undefined
}
/**The [] property accessor also has an identical-looking equivalent in type space. But
be aware that while obj['field'] and obj.field are equivalent in value space, they
are not in type space. You must use the former to get the type of another type’s
property: */

let p: Person = { first: "Jim" };

/**Person['first'] is a type here since it appears in a type context (after a : ). You can
put any type in the index slot, including union types or primitive types */
const first: Person['first'] = p['first'];

console.log(first)

/**Typescript variable parameter and types */
// INVALID
function emailInvalid(options: { person: Person, subject: string, body: string }) {
    // following will not work
    // console.log("P", person, "subject", subject, "body", body)
}

function email(
    { person, subject, body }: { person: Person, subject: string, body: string }
) {
    console.log("P", person, "subject", subject, "body", body)
}

console.log(email({ person: p, subject: 'test', body: ' test' }))