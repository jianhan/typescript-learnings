/*
 * @Author: your name
 * @Date: 2020-05-24 19:50:19
 * @LastEditTime: 2020-05-25 21:13:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /typescript-learnings/effective_typescript/item11.ts
 */
var book = {
    title: "James's new book",
    published: new Date(),
    author: "James"
    // pageCount: 12 // this will fail
};
/**However, this makes no sense from structural view point, any super set should be compatible with sub set*/
function printBook(book) {
    console.log("Book title: " + book.title + ", book published: " + book.published + ", book author: " + book.author);
}
// call print book as expected
printBook(book);
// now call with super set
var myBook = {
    title: "Tom's new book",
    published: new Date(),
    author: "Tom",
    pageCount: 12 // this will fail
};
printBook(myBook);
