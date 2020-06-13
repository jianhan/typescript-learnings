/*
 * @Author: your name
 * @Date: 2020-06-10 21:11:02
 * @LastEditTime: 2020-06-13 19:55:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /typescript-learnings/effective_typescript/item42.ts
 */

/***Item 42: Use unknown Instead of any for Values with an
Unknown Type */

function parseYAML(yaml: string): any {
    // ...
}

// Ideally you’d like your users to immediately assign the result to another type:
interface Book {
    name: string;
    author: string;
}
const book1: Book = parseYAML(`
    name: Wuthering Heights
    author: Emily Brontë
    `);

// now book1 has any type, and typescript checking will fail for instance,
// fail as in not able to detect undefined, etc.. 
const bookJameEyre = parseYAML(`
name: Jane Eyre
author: Charlotte Brontë
`);
// this is undefined
alert(bookJameEyre.title); // No error, alerts "undefined" at runtime
bookJameEyre('read');


// A SAFER WAY
function safeParseYAML(yaml: string): unknown {
    return parseYAML(yaml);
}
const bookSafe = safeParseYAML(`
    name: The Tenant of Wildfell Hall
    author: Anne Brontë
    `);
alert(bookSafe.title);
// ~~~~ Object is of type 'unknown'
bookSafe("read");
// ~~~~~~~~~~ Object is of type 'unknown'

/*
....###....##....##.##....##....##.....##..######.....##.....##.##....##.##....##..#######..##......##.##....##....##.....##..######.....##....##.########.##.....##.########.########.
...##.##...###...##..##..##.....##.....##.##....##....##.....##.###...##.##...##..##.....##.##..##..##.###...##....##.....##.##....##....###...##.##.......##.....##.##.......##.....##
..##...##..####..##...####......##.....##.##..........##.....##.####..##.##..##...##.....##.##..##..##.####..##....##.....##.##..........####..##.##.......##.....##.##.......##.....##
.##.....##.##.##.##....##.......##.....##..######.....##.....##.##.##.##.#####....##.....##.##..##..##.##.##.##....##.....##..######.....##.##.##.######...##.....##.######...########.
.#########.##..####....##........##...##........##....##.....##.##..####.##..##...##.....##.##..##..##.##..####.....##...##........##....##..####.##........##...##..##.......##...##..
.##.....##.##...###....##.........##.##...##....##....##.....##.##...###.##...##..##.....##.##..##..##.##...###......##.##...##....##....##...###.##.........##.##...##.......##....##.
.##.....##.##....##....##..........###.....######......#######..##....##.##....##..#######...###..###..##....##.......###.....######.....##....##.########....###....########.##.....##
*/

/*** THINK ABOUT ASSIGNABILITY */

/*** any:
 *            can assign
 * any type <-------------- any other types
 *
 *                  can assign
 * any other types <-------------- any type
 *
 */

/***You can’t do much with unknown , which
is exactly the point. The errors about an unknown type will encourage you to add an
appropriate type */

/*** unknown:
 *                  can assign
 * unknown type <-------------- any other types
 *
 *                  can NOT assign
 * any other type <------X------- unknown type
 *
 */

/*** never:
 *                  can NOT assign
 * never type <-------X------ any other types
 *
 *                  can assign
 * any other type <-------------- never type
 *
 */

// use unknown
const bookUnknown = safeParseYAML(`
name: Villette
author: Charlotte Brontë
`) as Book;

alert(bookUnknown.year);
// ~~~~~ Property 'year' does not exist on type 'Book'
bookUnknown('read');
// ~~~~~~~~~ this expression is not callable

/**When to use : unknown is appropriate whenever you know that there will be a value but you don’t
know its type. */

/***the properties property of a Feature is a grab-bag of
anything JSON serializable. So unknown makes sense: */

interface Feature {
    id?: string | number;
    geometry: Geometry;
    properties: unknown;
}

// 3 ways to extract type from unknown
// 1. type assertion which have seen before, as Book

// 2. type checking using instanceof 

function processValue(val: unknown) {
    if (val instanceof Date) {
        val // Type is Date
    }
}

// 3. user defined type guard

function isBook(val: unknown): val is Book {
    return (
        typeof (val) === 'object' && val !== null &&
        'name' in val && 'author' in val
    );
}
function processValue(val: unknown) {
    if (isBook(val)) {
        val; // Type is Book
    }
}

/**unknown can also be used instead of any in “double assertions”: */
declare const foo: Foo;
let barAny = foo as any as Bar;
let barUnk = foo as unknown as Bar;