/*
 * @Author: your name
 * @Date: 2020-06-09 22:19:29
 * @LastEditTime: 2020-06-09 23:00:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /typescript-learnings/effective_typescript/item40.ts
 */

/***Item 40: Hide Unsafe Type Assertions in Well-Typed
Functions */

/***Things to Remember
• Sometimes unsafe type assertions are necessary or expedient. When you need to
use one, hide it inside a function with a correct signature. */

/***Unsafe assertions hidden inside well-typed functions
are much better than unsafe assertions scattered throughout your code. */

declare function cacheLast<T extends Function>(fn: T): T;

function cacheLast<T extends Function>(fn: T): T {
    let lastArgs: any[] | null = null;
    let lastResult: any;
    return function (...args: any[]) {
        // ~~~~~~~~~~~~~~~~~~~~~~~~~~
        //Type '(...args: any[]) => any' is not assignable to type 'T'
        if (!lastArgs || !shallowEqual(lastArgs, args)) {
            lastResult = fn(...args);
            lastArgs = args;
        }
        return lastResult;
    };
}

function cacheLastHideAny<T extends Function>(fn: T): T {
    let lastArgs: any[] | null = null;
    let lastResult: any;
    return function (...args: any[]) {
        if (!lastArgs || !shallowEqual(lastArgs, args)) {
            lastResult = fn(...args);
            lastArgs = args;
        }
        return lastResult;
    } as unknown as T;
}

declare function shallowObjectEqual<T extends object>(a: T, b: T): boolean;

function shallowObjectEqualIncorrect<T extends object>(a: T, b: T): boolean {
    for (const [k, aVal] of Object.entries(a)) {
        if (!(k in b) || aVal !== b[k]) {
            // ~~~~ Element implicitly has an 'any' type
            // because type '{}' has no index signature
            return false;
        }
    }
    return Object.keys(a).length === Object.keys(b).length;
}

function shallowObjectEqual<T extends object>(a: T, b: T): boolean {
    for (const [k, aVal] of Object.entries(a)) {
        if (!(k in b) || aVal !== (b as any)[k]) {
            return false;
        }
    }
    return Object.keys(a).length === Object.keys(b).length;
}