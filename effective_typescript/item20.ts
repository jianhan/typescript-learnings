/*
 * @Author: your name
 * @Date: 2020-05-30 11:29:58
 * @LastEditTime: 2020-05-30 11:32:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /typescript-learnings/effective_typescript/item20.ts
 */

/**Item 20: Use Different Variables for Different Types */
/**Things to Remember
• While a variable’s value can change, its type generally does not.
• To avoid confusion, both for human readers and for the type checker, avoid reus‐
ing variables for differently typed values. */

// Following code is confusing, do not do it.
let id: string | number = "12-34-56";
fetchProduct(id);
id = 123456; // OK
fetchProductBySerialNumber(id); // OK

// If you see a variable was defined as different type, type
// to refactor into two variables with it's own types

const id: string = "12-34-56";
fetchProduct(id);
const identifier = 123456; // OK
fetchProductBySerialNumber(identifier); // OK
