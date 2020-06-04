/*
 * @Author: your name
 * @Date: 2020-06-04 21:28:55
 * @LastEditTime: 2020-06-04 22:00:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /typescript-learnings/functional-light-js/ch02/index.ts
 */

/*** All for one */
// a helper function ensure unary

function unary(fn) {
    return function onlyOneArg(arg) {
        return fn(arg)
    }
}

const twoArgs = (x, y) => {
    console.log(x, y, '-----')
    return x * y;
}

const oneArg = (x) => {
    console.log(x, '-----')
    return x * 2;
}

const twoArgsRes = ["1", "2", "3"].map(twoArgs);

const oneArgRes = ["1", "2", "3"].map(oneArg);

// this is because if map function accept a function has 2 parameters, then the first is value
// second is index, so following will not work

const parseIntResult = ["1", "2", "3"].map(parseInt);
// this works as following
// return parseInt("1", 0)
// return parseInt("2", 1)
// return parseInt("3", 2)

console.log(parseIntResult, parseInt("1", 0), parseInt("2", 1), parseInt("3", 2)) // [1, NaN, NaN] 1, NaN, NaN

// this is because For the signature parseInt(str,radix), it's clear that when map(..) passes index in the 
// second argument position, it's interpreted by parseInt(..) as the radix.

// Solution is to use unary

const parseIntUnaryResult = ["1", "2", "3"].map(unary(parseInt));
console.log(parseIntUnaryResult) // this works fine

/*
.####.########..########.##....##.########.####.########.##....##
..##..##.....##.##.......###...##....##.....##.....##.....##..##.
..##..##.....##.##.......####..##....##.....##.....##......####..
..##..##.....##.######...##.##.##....##.....##.....##.......##...
..##..##.....##.##.......##..####....##.....##.....##.......##...
..##..##.....##.##.......##...###....##.....##.....##.......##...
.####.########..########.##....##....##....####....##.......##...
*/

/*** One on One */
const identity = <T>(v: T): T => v

// one of the usage is to filter
var words = "   Now is the time for all...  ".split(/\s|\b/);
words;
// ["","Now","is","the","time","for","all","...",""]

words.filter(identity);
// ["Now","is","the","time","for","all","..."]

// another usage is to transformation

function output(msg, formatFn = identity) {
    msg = formatFn(msg);
    console.log(msg);
}

function upper(txt) {
    return txt.toUpperCase();
}

output("Hello World", upper);     // HELLO WORLD
output("Hello World");            // Hello World

/*
..######...#######..##....##..######..########....###....##....##.########....########.##.....##.##....##..######.
.##....##.##.....##.###...##.##....##....##......##.##...###...##....##.......##.......##.....##.###...##.##....##
.##.......##.....##.####..##.##..........##.....##...##..####..##....##.......##.......##.....##.####..##.##......
.##.......##.....##.##.##.##..######.....##....##.....##.##.##.##....##.......######...##.....##.##.##.##.##......
.##.......##.....##.##..####.......##....##....#########.##..####....##.......##.......##.....##.##..####.##......
.##....##.##.....##.##...###.##....##....##....##.....##.##...###....##.......##.......##.....##.##...###.##....##
..######...#######..##....##..######.....##....##.....##.##....##....##.......##........#######..##....##..######.
*/

// some API does not allow you to pass a simple value, it must be a function, event if
// that function just return a simple value, for instance, promise then
// doesn't work:
p1.then(foo).then(p2).then(bar);

// instead:
p1.then(foo).then(function () { return p2; }).then(bar);

// or arrow function version
p1.then(foo).then(() => p2).then(bar);

// with a little helper, to convert a value into a function that just return that value
function constant(v) {
    return function value() {
        return v;
    };
}


p1.then(foo).then(constant(p2)).then(bar);