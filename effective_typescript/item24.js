/*
 * @Author: your name
 * @Date: 2020-05-31 11:57:20
 * @LastEditTime: 2020-05-31 13:24:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /typescript-learnings/effective_typescript/item24.ts
 */
var dieHard = {
    title: 'Die Hard',
    reviews: 5
};
function incMovieReview(m) {
    m.reviews = m.reviews + 1;
}
console.log('before: ', dieHard); // 5
incMovieReview(dieHard);
console.log('after: ', dieHard); // 6
// ** when assign a variable from property of object(assume it is mutable, like object , array ,etc..), 
// when assigned variable updated it also changed in original, those can cause bugs 
var rew = dieHard.reviews;
rew = 200;
console.log('after updated review: ', dieHard);
var cinema = {
    location: 'test',
    bestMovie: dieHard
};
console.log("before cinema: ", cinema);
var m = cinema.bestMovie;
m.title = "Die Hard 2";
console.log("after cinema: ", cinema);
function isPointInPolygon(polygon, pt) {
    // polygon.bbox is repeated 5 times
    if (polygon.bbox) {
        if (pt.x < polygon.bbox.x[0] || pt.x > polygon.bbox.x[1] ||
            pt.y < polygon.bbox.y[1] || pt.y > polygon.bbox.y[1]) {
            return false;
        }
    }
    // ... more complex check
}
function isPointInPolygonV1(polygon, pt) {
    var box = polygon.bbox;
    if (box) {
        if (pt.x < box.x[0] || pt.x > box.x[1] ||
            pt.y < box.y[1] || pt.y > box.y[1]) {
            return false;
        }
    }
    // ... more complex check
}
var num;
console.log(num = 12);
