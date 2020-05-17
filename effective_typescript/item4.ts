/*
 * @Author: your name
 * @Date: 2020-05-17 13:32:21
 * @LastEditTime: 2020-05-17 14:16:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /typescript-learnings/effective_typescript/item4.ts
 */

// JavaScript is inherently duck typed: if you pass a function a value with all the right
// properties, it won’t care how you made the value. It will just use it. (“If it walks like a
// duck and talks like a duck...”)

interface Vector2D {
    x: number;
    y: number;
}

/**
 * calculateLength accept parameter type of Vector2D, but you can pass
 * anything that is contains properties defined in Vector2D, does not have to be
 * exactly Vector2D type, this is duck typing.
 * 
 * @param v 
 */
function calculateLength(v: Vector2D) {
    return Math.sqrt(v.x * v.x + v.y * v.y);
}

/**
 * notice this is a completely different type from Vector2D, but we still can use it as
 * Vector2D
 */
interface NamedVector {
    name: string;
    x: number;
    y: number;
}

const v: NamedVector = { x: 3, y: 4, name: "test" }

// notice v is NamedVector not Vector2D, this is because NamedVector
// is structure was compatible with Vector2D, this is "structural typing"
const r = calculateLength(v)
console.log(r)

// THE PROBLEM: 
interface Vector3D {
    x: number;
    y: number;
    z: number;
}

function normalize(v: Vector3D) {
    // calculate accept 2D, but we passed 3d, so when we do calculate length,
    // it will ignore z index, this can lead to bug!!!!
    const length = calculateLength(v);
    return {
        x: v.x / length,
        y: v.y / length,
        z: v.z / length,
    };
}

// in typescript we can not assume data passed into a function with type defined are
// exactly what we expected, typescripts types are OPEN not SEALED or CLOSED,
normalize({ x: 3, y: 4, z: 5 })

function calculateLengthL1(v: Vector3D) {
    let length = 0;
    for (const axis of Object.keys(v)) {
        // TypeScript is correct to complain. The logic in the
        // previous paragraph assumes that Vector3D is sealed and does not have other proper‐ties. But it could:
        const coord = v[axis];
        // ~~~~~~~ Element implicitly has an 'any' type because ...
        //'string' can't be used to index type 'Vector3D'
        length += Math.abs(coord);
    }
    return length;
}

function calculateLengthL2(v: Vector3D) {
    return Math.abs(v.x) + Math.abs(v.y) + Math.abs(v.z);
}

// structural typing also apply to class
class C {
    foo: string;
    constructor(foo: string) {
        this.foo = foo;
    }
}
const c = new C('instance of C');
const d: C = { foo: 'object literal' };    // OK!

// structural typing is good for writing unit tests, 
// this is similar to go