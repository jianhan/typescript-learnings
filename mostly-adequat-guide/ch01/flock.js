/*
 * @Author: your name
 * @Date: 2020-06-02 22:47:12
 * @LastEditTime: 2020-06-02 22:56:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /typescript-learnings/mostly-adequat-guide/ch01/flock.ts
 */
/**A seagull breading app */
var Flock = /** @class */ (function () {
    function Flock(n) {
        this.seagulls = n;
    }
    Flock.prototype.getSeagulls = function () {
        return this.seagulls;
    };
    /**
     * State mutated here
     *
     * @param {Flock} other
     * @returns
     * @memberof Flock
     */
    Flock.prototype.conjoin = function (other) {
        this.seagulls += other.seagulls;
        return this;
    };
    /**
     * State mutated here
     *
     * @param {Flock} other
     * @returns
     * @memberof Flock
     */
    Flock.prototype.breed = function (other) {
        this.seagulls *= other.seagulls;
        return this;
    };
    return Flock;
}());
var flockA = new Flock(4);
var flockB = new Flock(2);
var flockC = new Flock(0);
var result = flockA
    .conjoin(flockC)
    .breed(flockB)
    .conjoin(flockA.breed(flockB))
    .getSeagulls();
// result is 32 which is wrong
console.log(result);
/*** Refactor as following using functions only */
var conjoin = function (flockA, flockB) { return new Flock(flockA.getSeagulls() + flockB.getSeagulls()); };
var breed = function (flockA, flockB) { return new Flock(flockA.getSeagulls() * flockB.getSeagulls()); };
var flockAA = new Flock(4);
var flockBB = new Flock(2);
var flockCC = new Flock(6);
var resultRefactored = conjoin(breed(flockB, conjoin(flockA, flockC)), breed(flockA, flockB));
console.log(resultRefactored);
