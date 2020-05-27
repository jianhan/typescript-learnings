/*
 * @Author: your name
 * @Date: 2020-05-27 20:10:39
 * @LastEditTime: 2020-05-27 20:34:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /typescript-learnings/effective_typescript/item15.ts
 */

/**Item 15: Use Index Signatures for Dynamic Data */

/**Things to Remember
• Use index signatures when the properties of an object cannot be known until
runtime—for example, if you’re loading them from a CSV file.
• Consider adding undefined to the value type of an index signature for safer
access.
• Prefer more precise types to index signatures when possible: interface s,
Record s, or mapped types. */

// index signature
// create a object with all properties are string type
type Rocket = { [property: string]: string };
const rocket: Rocket = {
    name: 'Falcon 9',
    variant: 'v1.0',
    thrust: '4,940 kN'
}; // OK

// What does it actually does
// 1. defines A name for the keys: This is purely for documentation; it is not used by the type checker in any way.
// 2. defines A type for the key: This needs to be some combination of string , number , or symbol , but generally
// you just want to use string
// 3. defines A type for the values: This can be anything.


// downsides:
/**
• It allows any keys, including incorrect ones. Had you written Name instead of
name , it would have still been a valid Rocket type.
• It doesn’t require any specific keys to be present. {} is also a valid Rocket .
• It cannot have distinct types for different keys. For example, thrust should prob‐
ably be a number , not a string .
• TypeScript’s language services can’t help you with types like this. As you’re typing
name: , there’s no autocomplete because the key could be anything. */

// in the case above better define precisely what the type is instead of using indexing 
// signature

// !!! When to use it them ??????
// When you are dealing with DYNAMIC DATA: for instance loading a csv data from a file
function parseCSV(input: string): { [columnName: string]: string }[] {
    const lines = input.split('\n');
    const [header, ...rows] = lines;
    return rows.map(rowStr => {
        const row: { [columnName: string]: string } = {};
        rowStr.split(',').forEach((cell, i) => {
            row[header[i]] = cell;
        });
        return row;
    });
}

// this is too generic, if you know what kind of data it contains , then do following:
interface ProductRow {
    productId: string;
    name: string;
    price: string;
}
declare let csvData: string;
const products = parseCSV(csvData) as unknown as ProductRow[];

// if you only know some of the fields, then do this:
interface Row1 { [column: string]: number } // Too broad
interface Row2 { a: number; b?: number; c?: number; d?: number } // useful

// most precise but not as useful
type Row3 =
    | { a: number; }
    | { a: number; b: number; }
    | { a: number; b: number; c: number; }
    | { a: number; b: number; c: number; d: number };

// If the problem with using an index signature is that string is too broad, do this:

type Vec3D = Record<'x' | 'y' | 'z', number>;
// Type Vec3D = {
// x: number;
// y: number;
// z: number;
// }
type Vec3D = { [k in 'x' | 'y' | 'z']: number }; // same as above

type ABC = { [k in 'a' | 'b' | 'c']: k extends 'b' ? string : number };
// Type ABC = {
// a: number;
// b: string;
// c: number;
// }
