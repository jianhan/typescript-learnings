/*
 * @Author: your name
 * @Date: 2020-06-05 21:48:31
 * @LastEditTime: 2020-06-06 00:52:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /typescript-learnings/effective_typescript/item33.ts
 */

/***Item 33: Prefer More Precise Alternatives to String Types */

/***Things to Remember
• Avoid “stringly typed” code. Prefer more appropriate types where not every
string is a possibility.
• Prefer a union of string literal types to string if that more accurately describes
the domain of a variable. You’ll get stricter type checking and improve the devel‐
opment experience.
• Prefer keyof T to string for function parameters that are expected to be proper‐
ties of an object. */

/***#Case1: properties in object, considering the following example, (this is simple to grasp) */

interface AlbumPoorVersion {
    artist: string;
    title: string;
    // problem here, should be date type
    releaseDate: string; // YYYY-MM-DD
    // should be union type or enum
    recordingType: string; // E.g., "live" or "studio"
    isPublished: boolean;
}


type RecordingType = 'studio' | 'live';
interface AlbumIdealVersion {
    artist: string;
    title: string;
    releaseDate: Date;
    recordingType: RecordingType;
    isPublished: boolean;
}


/***#Case2: Function parameters */

// a JS version
function pluckJsVer(records, key) {
    return record.map(record => record[key]);
}

// typescript version with any
function pluckTsVerAny(record: any[], key: string): any[] {
    return record.map(r => r[key]);
}

// TS generic version
function pluckTsGeneric<T>(record: T[], key: string): any[] {
    return record.map(r => r[key]);
    // ~~~~~~ Element implicitly has an 'any' type
    //because type '{}' has no index signature
}

// TS keyof version both paramter and return type
function pluckTsKeyof<T>(record: T[], key: keyof T): T[keyof T][] {
    return record.map(r => r[key]);
}

const albums: AlbumIdealVersion[] = [];

// this is the problem, we want releaseDates to be array of Date object, but it is, (string | Date | Boolean)[
const releaseDates = pluckTsKeyof(albums, 'releaseDate'); // Type is (string | Date | Boolean)[]

// Solution: we need to narrow it down further
/***To narrow it further, we need to introduce a
second generic parameter that is a subset of keyof T (probably a single value) */

// best typescript version
function pluckBest<T, K extends keyof T>(record: T[], key: K): T[K][] {
    return record.map(r => r[key]);
}



const releaseDates1 = pluckBest(albums, 'releaseDate'); // Type is Date[]