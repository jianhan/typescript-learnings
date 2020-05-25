/*
 * @Author: your name
 * @Date: 2020-05-24 19:50:19
 * @LastEditTime: 2020-05-25 21:46:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /typescript-learnings/effective_typescript/item11.ts
 */

/**Item 11: Recognize the Limits of Excess Property Checking */

/**Things to Remember
• When you assign an object literal to a variable or pass it as an argument to a
function, it undergoes excess property checking.
• Excess property checking is an effective way to find errors, but it is distinct from
the usual structural assignability checks done by the TypeScript type checker.
Conflating these processes will make it harder for you to build a mental model of
assignability.
• Be aware of the limits of excess property checking: introducing an intermediate
variable will remove these checks. */

// Declare a variable with type, the compiler ensure the variable conform with the interface
// EXACTLY, no more no less 

interface Book {
    title: string;
    published: Date;
    author: string;
}

const book: Book = {
    title: "James's new book",
    published: new Date(),
    author: "James"
    // pageCount: 12 // this will fail
}

/**However, this makes no sense from structural view point, any super set should be compatible with sub set*/

function printBook(book: Book): void {
    console.log(`Book title: ${book.title}, book published: ${book.published}, book author: ${book.author}`)
}

// call print book as expected
printBook(book)

// now call with super set of book, and it works
const myBook = {
    title: "Tom's new book",
    published: new Date(),
    author: "Tom",
    pageCount: 12 // this will fail
}

printBook(myBook)

/**Super set can be used as a sub set (kind of like polymorphism but in the other direction)
 * not only apply to function call, but also apply to inferred variable assignment
*/

const inferredBook = {
    title: "James's new book",
    published: new Date(),
    author: "James",
    pageCount: 12 // this will fail
}

// this works !!
let bookSample: Book = inferredBook;

/**Notice: this excess property checking only apply to object literal */

interface ProgrammingBook {
    title: string;
    published: Date;
    author: string;
    page: number;
}

const pBook: ProgrammingBook = {
    title: "James's new book",
    published: new Date(),
    author: "James",
    page: 12
}

// this works also because it is not an object literal
let normalBook: Book = pBook;

// Excess property checking does not happen when you use a type assertion:
// however, the variable declared in object literal must be a super set of
// the type of asserted
const invalidBook = {
    title: "James's new book",
    published: new Date(),
    author: "James",
    page: 13
} as Book;

// This is a good reason to prefer declarations to assertions

// **** Excess property checking is an effective way of catching typos and other mistakes in
// property names that would otherwise be allowed by the structural typing system
// But it is also very limited in scope: it only applies to object literals. Recognize this limitation and
// distinguish between excess property checking and ordinary type checking. This will
// help you build a mental model of both
