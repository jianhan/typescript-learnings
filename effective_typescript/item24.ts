/*
 * @Author: your name
 * @Date: 2020-05-31 11:57:20
 * @LastEditTime: 2020-05-31 13:30:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /typescript-learnings/effective_typescript/item24.ts
 */

/***Item 24: Be Consistent in Your Use of Aliases */

/***Things to Remember
• Aliasing can prevent TypeScript from narrowing types. If you create an alias for a
variable, use it consistently.
• Use destructuring syntax to encourage consistent naming.
• Be aware of how function calls can invalidate type refinements on properties.
Trust refinements on local variables more than on properties. */

// ** in typescript function arguments are passed by value , not reference

interface Movie {
    title: string
    reviews: number
}

const dieHard: Movie = {
    title: 'Die Hard',
    reviews: 5
}

function incMovieReview(m: Movie): void {
    m.reviews = m.reviews + 1
}
console.log('before: ', dieHard) // 5
incMovieReview(dieHard)

console.log('after: ', dieHard) // 6

// ** when assign a variable from property of object(assume it is mutable, like object , array ,etc..), 
// when assigned variable updated it also changed in original, those can cause bugs 

let rew = dieHard.reviews;

rew = 200

console.log('after updated review: ', dieHard)

interface Cinema {
    location: string
    bestMovie: Movie
}

const cinema: Cinema = {
    location: 'test',
    bestMovie: dieHard
}

console.log("before cinema: ", cinema)

const m = cinema.bestMovie
m.title = "Die Hard 2"


console.log("after cinema: ", cinema)

// Suppose you have a data structure that represents a polygon:
interface Coordinate {
    x: number;
    y: number;
}
interface BoundingBox {
    x: [number, number];
    y: [number, number];
}
interface Polygon {
    exterior: Coordinate[];
    holes: Coordinate[][];
    bbox?: BoundingBox;
}

function isPointInPolygon(polygon: Polygon, pt: Coordinate) {
    // polygon.bbox is repeated 5 times
    if (polygon.bbox) {
        if (pt.x < polygon.bbox.x[0] || pt.x > polygon.bbox.x[1] ||
            pt.y < polygon.bbox.y[1] || pt.y > polygon.bbox.y[1]) {
            return false;
        }
    }
    // ... more complex check
}

function isPointInPolygonV1(polygon: Polygon, pt: Coordinate) {
    const box = polygon.bbox;
    // this is the PROBLEM, right there: if declared a new variable from
    // polygon.bbox, and not check the box, still check the original value
    // then the box will possibly be undefined
    if (polygon.bbox) {
        if (pt.x < box.x[0] || pt.x > box.x[1] ||
            pt.y < box.y[1] || pt.y > box.y[1]) {
            return false;
        }
    }
    // ... more complex check
}

function isPointInPolygonV2(polygon: Polygon, pt: Coordinate) {
    const box = polygon.bbox;
    // a better version, once assigned a new variable, us it instead 
    // of original one from this point onward
    if (box) {
        // the problem is we introduce another variable called box
        // and  there already a property called bbox, this can cause a bit
        // confusion and visually noisy
        if (pt.x < box.x[0] || pt.x > box.x[1] ||
            pt.y < box.y[1] || pt.y > box.y[1]) { // OK
            return false;
        }
    }
    // ...
}

function isPointInPolygonV3(polygon: Polygon, pt: Coordinate) {
    // use object destructuring is much better
    const { bbox } = polygon
    if (bbox) {
        // the problem is we introduce another variable called box
        // and  there already a property called bbox, this can cause a bit
        // confusion and visually noisy
        if (pt.x < bbox.x[0] || pt.x > bbox.x[1] ||
            pt.y < bbox.y[1] || pt.y > bbox.y[1]) { // OK
            return false;
        }
    }
    // ...
}

let num;

console.log(num = 12) // print 12