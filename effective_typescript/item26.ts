/*
 * @Author: your name
 * @Date: 2020-05-31 18:35:59
 * @LastEditTime: 2020-06-02 20:57:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /typescript-learnings/effective_typescript/item26.ts
 */

/***Item 26: Understand How Context Is Used in Type
Inference */

/***Things to Remember
• Be aware of how context is used in type inference.
• If factoring out a variable introduces a type error, consider adding a type declara‐
tion.
• If the variable is truly a constant, use a const assertion ( as const ). But be aware
that this may result in errors surfacing at use, rather than definition. */

/***TypeScript doesn’t just infer types based on values. It also considers the context in
which the value occurs. This usually works well but can sometimes lead to surprises. */

/***In JavaScript you can factor an expression out into a constant without changing the
behavior of your code */

function setLanguage(language: string) { /* ... */ }

// these two statements are equivalent

// Inline form
setLanguage('JavaScript');

// Reference form
let language = 'JavaScript';
setLanguage(language);

type Language = 'JavaScript' | 'TypeScript' | 'Python';
function setLanguageWithType(language: Language) { /* ... */ }
setLanguageWithType('JavaScript');
// OK
let languageStr = 'JavaScript';

// this will cause error, type string can not assign to type Language
// even if type Language is a union type of string
setLanguageWithType(languageStr);

// Solution: set language value to be string, but still language type
let languageStrType: Language = 'JavaScript';
setLanguage(languageStrType); // OK

// The good thing about this method is it will detect typo, like following
let lan: Language = 'Typeo'

// The other solution is to make the variable constant:
const language = 'JavaScript';
setLanguage(language); // OK

/**By using const , we’ve told the type checker that this variable cannot change. So Type‐
Script can infer a more precise type for language , the string literal type "Java
Script" . */


/***Tuple Types */

// Parameter is a (latitude, longitude) pair.
// in this example, typescript infer where to be a tuple
function panTo(where: [number, number]) { /* ... */ }
panTo([10, 20]); // OK

// in this case there is no context for typescript to infer to
// a more precise type, so it is number[]
const loc = [10, 20];

// as a result number[] is not assignable to [number, number]
panTo(loc);
//~~~ Argument of type 'number[]' is not assignable to
// parameter of type '[number, number]'

// To fix this: provide a type declaration
const locT: [number, number] = [10, 20]
panTo(locT)

/**Another way is to provide a “const context.” This tells TypeScript that you intend the
value to be deeply constant, rather than the shallow constant that const gives: */
const locC = [10, 20] as const // readonly [10,20]

// The problem is it is too precise, the function use it may need to update it
panTo(locC)

// Solution: make the parameter readonly
function panToReadOnly(where: readonly [number, number]) { /* ... */ }
const loc = [10, 20] as const;
panToReadOnly(loc); // OK

/***Objects
The problem of separating a value from its context also comes up when you factor
out a constant from a larger object that contains some string literals or tuples. For
example: */

type Language = 'JavaScript' | 'TypeScript' | 'Python';
interface GovernedLanguage {
    language: Language;
    organization: string;
}
function complain(language: GovernedLanguage) { /* ... */ }
complain({ language: 'TypeScript', organization: 'Microsoft' });
// OK
const ts = {
    language: 'TypeScript',
    organization: 'Microsoft',
};
// context lost here
complain(ts);

const tsT: GovernedLanguage = {
    language: 'TypeScript',
    organization: 'Microsoft',
}

complain(tsT)

/***Same apply to callback function */