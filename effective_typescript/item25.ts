/*
 * @Author: your name
 * @Date: 2020-05-31 13:41:59
 * @LastEditTime: 2020-05-31 14:10:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /typescript-learnings/effective_typescript/item25.ts
 */

/**Item 25: Use async Functions Instead of Callbacks for
Asynchronous Code */

/***Things to Remember
• Prefer Promises to callbacks for better composability and type flow.
• Prefer async and await to raw Promises when possible. They produce more con‐
cise, straightforward code and eliminate whole classes of errors.
• If a function returns a Promise, declare it async . */

// pyramid of doom
fetchURL(url1, function (response1) {
    fetchURL(url2, function (response2) {
        fetchURL(url3, function (response3) {
            // ...
            console.log(1);
        });
        console.log(2);
    });
    console.log(3);
});
console.log(4);

// ES 2015 solution: promise and then
const page1Promise = fetch(url1);
page1Promise.then(response1 => {
    return fetch(url2);
}).then(response2 => {
    return fetch(url3);
}).then(response3 => {
    // ...
}).catch(error => {
    // ...
});

// ES2017 solution await
async function fetchPages() {
    // ** await will pause execution until the fetch is finished
    // so only use it when the next execution is truely depended on
    // the previous fetch to finish
    try {
        const response1 = await fetch(url1);
        const response2 = await fetch(url2);
        const response3 = await fetch(url3);
    } catch (e) {

    }

    // ...
}

// ** Parallel fetching doing this
async function fetchPages() {
    // Using destructuring assignment with await is particularly nice in this context.
    const [response1, response2, response3] = await Promise.all([
        fetch(url1), fetch(url2), fetch(url3)
    ]);
    // ...
}

// Type inference also works well with Promise.race
function timeout(millis: number): Promise<never> {
    return new Promise((resolve, reject) => {
        setTimeout(() => reject('timeout'), millis);
    });
}

// The return type of fetchWithTimeout is inferred as Promise<Response> , no type
// annotations required
async function fetchWithTimeout(url: string, ms: number) {
    return Promise.race([fetch(url), timeout(ms)]);
}

/***you should gener‐
ally prefer async / await to raw Promises for two reasons:
• It typically produces more concise and straightforward code.
• It enforces that async functions always return Promises. */

// An async function always returns a Promise , even if it doesn’t involve await ing any‐
// thing. TypeScript can help you build an intuition for this:
// function getNumber(): Promise<number>
async function getNumber() {
    return 42;
}

// is the same as arrow function version
const getNumber = async () => 42;
// Type is () => Promise<number>

//same as 
const getNumber = () => Promise.resolve(42);

/**While it may seem odd to return a Promise for an immediately available value, this
actually helps enforce an important rule: a function should either always be run syn‐
chronously or always be run asynchronously. It should never mix the two. */