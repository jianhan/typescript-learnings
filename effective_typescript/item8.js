/*
 * @Author: your name
 * @Date: 2020-05-21 20:10:52
 * @LastEditTime: 2020-05-21 20:32:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /typescript-learnings/effective_typescript/item8.ts
 */
var Cylinder = /** @class */ (function () {
    function Cylinder() {
        this.radius = 1;
        this.height = 1;
    }
    return Cylinder;
}());
function calculateVolume(shape) {
    if (shape instanceof Cylinder) {
        shape; // OK, type is Cylinder
        shape.radius; // OK, type is number
    }
}
var n = 12;
/**
 * n a value context, typeof is JavaScript’s runtime typeof operator. It returns a string
containing the runtime type of the symbol. This is not the same as the TypeScript
type! JavaScript’s runtime type system is much simpler than TypeScript’s static type
system. In contrast to the infinite variety of TypeScript types, there have historically
only been six runtime types in JavaScript: “string,” “number,” “boolean,” “undefined,”
“object,” and “function.”
 */
var n1 = typeof n;
/**
 * In a type context, typeof takes a value and returns its TypeScript type. You can use
these as part of a larger type expression, or use a type statement to give them a name
 */
var cy = typeof Cylinder;
console.log(n1, cy);
/**typeof always operates on values. You can’t apply it to types. The class keyword
introduces both a value and a type, so what is the typeof a class? It depends on the
context */
var cyv = typeof Cylinder; // Value is "function"
var Person = /** @class */ (function () {
    function Person() {
    }
    return Person;
}());
/**The [] property accessor also has an identical-looking equivalent in type space. But
be aware that while obj['field'] and obj.field are equivalent in value space, they
are not in type space. You must use the former to get the type of another type’s
property: */
var p = { first: "Jim" };
/**Person['first'] is a type here since it appears in a type context (after a : ). You can
put any type in the index slot, including union types or primitive types */
var first = p['first'];
console.log(first);
/**Typescript variable parameter and types */
// INVALID
function emailInvalid(options) {
    // following will not work
    // console.log("P", person, "subject", subject, "body", body)
}
function email(_a) {
    var person = _a.person, subject = _a.subject, body = _a.body;
    console.log("P", person, "subject", subject, "body", body);
}
console.log(email({ person: p, subject: 'test', body: ' test' }));
