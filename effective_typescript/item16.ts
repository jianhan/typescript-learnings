/*
 * @Author: your name
 * @Date: 2020-05-27 20:41:37
 * @LastEditTime: 2020-05-27 20:44:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /typescript-learnings/effective_typescript/item16.ts
 */
/**Item 16: Prefer Arrays, Tuples, and ArrayLike to number
Index Signatures */

/**Things to Remember
• Use index signatures when the properties of an object cannot be known until
runtime—for example, if you’re loading them from a CSV file.
• Consider adding undefined to the value type of an index signature for safer
access.
• Prefer more precise types to index signatures when possible: interface s,
Record s, or mapped types. */

// What is an object? In JavaScript it’s a collection of key/value pairs

// If you try to use a more complex object as a key, it is converted into a string by calling 
// its toString method

x = {}
x[[1, 2, 3]] = 2

// x: { '1,2,3': 1 }
// number can not be used as keys