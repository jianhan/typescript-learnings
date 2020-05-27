/*
 * @Author: your name
 * @Date: 2020-05-26 23:13:40
 * @LastEditTime: 2020-05-27 20:09:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /typescript-learnings/effective_typescript/item14.ts
 */


/**Item 14: Use Type Operations and Generics to Avoid
Repeating Yourself */

// Some duplication of CODE to calculate surface area and volume,
console.log('Cylinder 1 x 1 ',
    'Surface area:', 6.283185 * 1 * 1 + 6.283185 * 1 * 1,
    'Volume:', 3.14159 * 1 * 1 * 1);
console.log('Cylinder 1 x 2 ',
    'Surface area:', 6.283185 * 1 * 1 + 6.283185 * 2 * 1,
    'Volume:', 3.14159 * 1 * 2 * 1);
console.log('Cylinder 2 x 1 ',
    'Surface area:', 6.283185 * 2 * 1 + 6.283185 * 2 * 1,
    'Volume:', 3.14159 * 2 * 2 * 1);

// naturally we would create functions to do it
const surfaceArea = (r, h) => 2 * Math.PI * r * (r + h);
const volume = (r, h) => Math.PI * r * r * h;
for (const [r, h] of [[1, 1], [1, 2], [2, 1]]) {
    console.log(
        `Cylinder ${r} x ${h}`,
        `Surface area: ${surfaceArea(r, h)}`,
        `Volume: ${volume(r, h)}`);
}

/**HOWEVER, those are from code level, in typescript we have to apply the same
 * principle to type level
 */
interface Person {
    firstName: string;
    lastName: string;
}

interface PersonWithBirthDate {
    firstName: string;
    lastName: string;
    birth: Date;
}

function distance(a: { x: number, y: number }, b: { x: number, y: number }) {
    return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
}

/**create a name for the type and use that: */
interface Point2D {
    x: number;
    y: number;
}
function distance1(a: Point2D, b: Point2D) { /* ... */ }

// If several functions share the same type signature
function get(url: string, opts: Options): Promise<Response> { /* ... */ }
function post(url: string, opts: Options): Promise<Response> { /* ... */ }
type HTTPFunction = (url: string, opts: Options) => Promise<Response>;
const get: HTTPFunction = (url, opts) => { /* ... */ };
const post: HTTPFunction = (url, opts) => { /* ... */ };

// When dealing with interface, using extends
interface Person {
    firstName: string;
    lastName: string;
}
interface PersonWithBirthDate extends Person {
    birth: Date;
}


// When deal with types, use intersection operator, interface would not work for this style
type PersonWithBirthDate = Person & { birth: Date };

/**Another way of dealing with duplicate fields existing on two or more interfaces (apart from extending)*/
interface State {
    userId: string;
    pageTitle: string;
    recentFiles: string[];
    pageContents: string;
}
interface TopNavState {
    userId: string;
    pageTitle: string;
    recentFiles: string[];
}

// The nice thing about this solution is you can keep a single interface
// defining the state for the entire app.

type TTopNavState = {
    userId: State['userId'];
    pageTitle: State['pageTitle'];
    recentFiles: State['recentFiles'];
};

// better version using mapped type
type TopNavStateMapped = {
    [k in 'userId' | 'pageTitle' | 'recentFiles']: State[k]
};

// use Pick
type PTopNavState = Pick<State, 'userId' | 'pageTitle' | 'recentFiles'>;

// indexing union
interface SaveAction {
    type: 'save';
    // ...
}
interface LoadAction {
    type: 'load';
    // ...
}
type Action = SaveAction | LoadAction;
type ActionTypeBad = 'save' | 'load'; // Repeated types!
type ActionTypeGood = Action['type']; // Type is "save" | "load"

// different from using Pick method
type ActionRec = Pick<Action, 'type'>; // {type: "save" | "load"}

/**If you’re defining a class which can be initialized and later updated, the type for the
parameter to the update method will optionally include most of the same parameters
as the constructor */
interface Options {
    width: number;
    height: number;
    color: string;
    label: string;
}
interface OptionsUpdate {
    width?: number;
    height?: number;
    color?: string;
    label?: string;
}
class UIWidget {
    constructor(init: Options) { /* ... */ }
    update(options: OptionsUpdate) { /* ... */ }
}

// construct another type with all optional fields from existing type
type OptionsUpdate = { [k in keyof Options]?: Options[k] };

// keyof takes a type and gives you a union of the types of its keys:
type OptionsKeys = keyof Options;

// this pattern is very common, there is a built in lib for it

// THIS: type OptionsKeys = keyof Options;
// IS THE SAME AS:
type OptionsKeys = Partial<Options>

// define a type that matches the shape of a value
const INIT_OPTIONS = {
    width: 640,
    height: 480,
    color: '#00FF00',
    label: 'VGA',
};
interface Options {
    width: number;
    height: number;
    color: string;
    label: string;
}

type Options = typeof INIT_OPTIONS;

/**!!!It’s usually better to define
types first and declare that values are assignable to them. This makes your types more
explicit and less subject to the vagaries of widening */

/**you can declare that any generic parameter extends a type to constrain the parameters in a
generic type*/

interface Name {
    first: string;
    last: string;
}
type DancingDuo<T extends Name> = [T, T];
const couple1: DancingDuo<Name> = [
    { first: 'Fred', last: 'Astaire' },
    { first: 'Ginger', last: 'Rogers' }
]; // OK
const couple2: DancingDuo<{ first: string }> = [
    // ~~~~~~~~~~~~~~~
    // Property 'last' is missing in type
    // '{ first: string; }' but required in type 'Name'
    { first: 'Sonny' },
    { first: 'Cher' }
];
