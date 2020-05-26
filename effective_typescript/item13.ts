/*
 * @Author: your name
 * @Date: 2020-05-26 16:18:53
 * @LastEditTime: 2020-05-26 19:58:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /typescript-learnings/effective_typescript/item13.ts
 */

/**Item 13: Know the Differences Between type and
interface */

/**Things to Remember
• Understand the differences and similarities between type and interface .
• Know how to write the same types using either syntax.
• In deciding which to use in your project, consider the established style and
whether augmentation might be beneficial. */

/**They are almost identical in many ways
 * 
 * Similarities 1. normal usage*/

type TState = {
    name: string;
    capital: string;
}

interface IState {
    name: string;
    capital: string;
}

/**Similarity 2: index signature */
type TDict = { [key: string]: string };
interface IDict {
    [key: string]: string;
}


/**Similarity 3: defines function type */
type TFn = (x: number) => string;
interface IFn {
    (x: number): string;
}
const toStrT: TFn = x => '' + x; // OK
const toStrI: IFn = x => '' + x; // OK

/**Similarity 4: when type contains properties and functions */
type TFnWithProperties = {
    (x: number): number;
    prop: string;
}
interface IFnWithProperties {
    (x: number): number;
    prop: string;
}

/**Similarity 5: Both type aliases and interfaces can be generic */
type TPair<T> = {
    first: T;
    second: T;
}
interface IPair<T> {
    first: T;
    second: T;
}

/**Similarity 6: An interface can extend a type (with some caveats, explained momentarily), and a
type can extend an interface */
interface IStateWithPop extends TState {
    population: number;
}
type TStateWithPop = IState & { population: number; };


/**Similarity 7: A class can implement either an interface or a simple type **/
class StateT implements TState {
    name: string = '';
    capital: string = '';
}
class StateI implements IState {
    name: string = '';
    capital: string = '';
}

/**Diff 1: there are union types but no union interfaces */
type AorB = 'a' | 'b';

/**WHen to use : Extending union types can be useful. If you have separate types for Input and Output
variables and a mapping from name to variable: */
type Input = { /* ... */ };
type Output = { /* ... */ };
interface VariableMap {
    [name: string]: Input | Output;
}

/**then you might want a type that attaches the name to the variable */
type NamedVariable = (Input | Output) & { name: string };

/**Advantage of Type: This type cannot be expressed with interface . A type is, in general, more capable
than an interface . It can be a union, and it can also take advantage of more
advanced features like mapped or conditional types. */


/**Tuple and array */
type Pair = [number, number];
type StringList = string[];
type NamedNums = [string, ...number[]];


/**Advantage of interface: augmentation AKA: declaration merging*/
interface IState {
    name: string;
    capital: string;
}
interface IState {
    population: number;
}
const wyoming: IState = {
    name: 'Wyoming',
    capital: 'Cheyenne',
    population: 500_000
}; // OK

/**Conclusion: When to use interface and when to use type:
 * Generally speaking, type is more capable than interface, however, if you working on a team
 * and current convention is favor interface, then go with it, likewise for type.
 *
 * If you are working on a new project, then the rules are simple
 * Using type can avoid accidentally declaration merging, which can be confusing, so, for internal
 * typing, use type
 *
 * If developing API and you want interface to be extended / augmented then use interface.
 *
*/
