/*
 * @Author: your name
 * @Date: 2020-05-30 12:49:44
 * @LastEditTime: 2020-05-30 13:23:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /typescript-learnings/effective_typescript/item22.ts
 */

/**Item 22: Understand Type Narrowing */

/***Things to Remember
• Understand how TypeScript narrows types based on conditionals and other types
of control flow.
• Use tagged/discriminated unions and user-defined type guards to help the pro‐
cess of narrowing. */

// This is the process by which TypeScript goes
// from a broad type to a narrower one

// #1, null checking
const el = document.getElementById('foo'); // Type is HTMLElement | null
if (el) {
    el // Type is HTMLElement
    el.innerHTML = 'Party Time';
} else {
    el // Type is null
    alert('No element #foo');
}

// #2. throw error
// You can also narrow a variable’s type for the rest of a block by throwing or returning
// from a branch.
const el = document.getElementById('foo'); // Type is HTMLElement | null
if (!el) throw new Error('Unable to find #foo');
el; // Now type is HTMLElement
el.innerHTML = 'Party Time';

// #3. instanceof
function contains(text: string, search: string | RegExp) {
    if (search instanceof RegExp) {
        search // Type is RegExp
        return !!search.exec(text);
    }
    search // Type is string
    return text.includes(search);
}

// #4. property check using in keyword
interface A { a: number }
interface B { b: number }
function pickAB(ab: A | B) {
    if ('a' in ab) {
        ab // Type is A
    } else {
        ab // Type is B
    }
    ab // Type is A | B
}

// #5 use built in functions such as Array.isArray
function contains(text: string, terms: string | string[]) {
    const termList = Array.isArray(terms) ? terms : [terms];
    termList // Type is string[]
    // ...
}


// Think twice before adding an assertion—it might be onto something that you’re not
const el = document.getElementById('foo'); // type is HTMLElement | null
if (typeof el === 'object') {
    el; // Type is HTMLElement | null
}
console.log(typeof null) // this is 'object', interesting

// another example, false primitive values
function foo(x?: number | string | null) {
    if (!x) {
        x;
        // Type is string | number | null | undefined
    }
}
// Because the empty string and 0 are both falsy, x could still be a string or number in
// that branch. TypeScript is right

/**#Another pattern; using tag on data type */
// common pattern: This pattern is known as a “tagged union” or “discriminated union,” and it is ubiqui‐
// tous in TypeScript.
interface UploadEvent { type: 'upload'; filename: string; contents: string }
interface DownloadEvent { type: 'download'; filename: string; }
type AppEvent = UploadEvent | DownloadEvent;
function handleEvent(e: AppEvent) {
    switch (e.type) {
        case 'download':
            e // Type is DownloadEvent
            break;
        case 'upload':
            e; // Type is UploadEvent
            break;
    }
}

/**# you can even introduce a custom function
to help it out AKA “user-defined type guard.” */
function isInputElement(el: HTMLElement): el is HTMLInputElement {
    // The el is HTMLInputElement as a return type tells the type checker that it can narrow the type of the parameter if the
    // function returns true.
    return 'value' in el;
}
function getElementContent(el: HTMLElement) {
    if (isInputElement(el)) {
        el; // Type is HTMLInputElement
        return el.value;
    }
    el; // Type is HTMLElement
    return el.textContent;
}

/***Some functions are able to use type guards to perform type narrowing across arrays
or objects. If you do some lookups in an array, for instance, you may wind up with an
array of nullable types: */
const jackson5 = ['Jackie', 'Tito', 'Jermaine', 'Marlon', 'Michael'];
const members = ['Janet', 'Michael'].map(
    who => jackson5.find(n => n === who)
); // Type is (string | undefined)[] because Janet can not be found, and it changed the type from
// string[] to (string | undefined)[]


// You can guarded it with custom function
function isDefined<T>(x: T | undefined): x is T {
    return x !== undefined;
}
const members = ['Janet', 'Michael'].map(
    who => jackson5.find(n => n === who)
).filter(isDefined); // Type is string[]

//# I do not see how syntax x as T can help, if you remove it
// just return an bool, the result is the same