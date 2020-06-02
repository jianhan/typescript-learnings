/*
 * @Author: your name
 * @Date: 2020-06-02 22:47:12
 * @LastEditTime: 2020-06-02 22:56:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /typescript-learnings/mostly-adequat-guide/ch01/flock.ts
 */

/**A seagull breading app */

class Flock {

    private seagulls: number;

    constructor(n: number) {
        this.seagulls = n;
    }

    public getSeagulls(): number {
        return this.seagulls
    }

    /**
     * State mutated here
     *
     * @param {Flock} other
     * @returns
     * @memberof Flock
     */
    conjoin(other: Flock) {
        this.seagulls += other.seagulls
        return this
    }

    /**
     * State mutated here
     *
     * @param {Flock} other
     * @returns
     * @memberof Flock
     */
    breed(other: Flock) {
        this.seagulls *= other.seagulls
        return this
    }

}

const flockA = new Flock(4);
const flockB = new Flock(2);
const flockC = new Flock(0);
const result = flockA
    .conjoin(flockC)
    .breed(flockB)
    .conjoin(flockA.breed(flockB))
    .getSeagulls();
// result is 32 which is wrong
console.log(result)

/*** Refactor as following using functions only */

const conjoin = (flockA: Flock, flockB: Flock): Flock => new Flock(flockA.getSeagulls() + flockB.getSeagulls())

const breed = (flockA: Flock, flockB: Flock): Flock => new Flock(flockA.getSeagulls() * flockB.getSeagulls())

const flockAA = new Flock(4)
const flockBB = new Flock(2)
const flockCC = new Flock(6)
const resultRefactored =
    conjoin(breed(flockB, conjoin(flockA, flockC)), breed(flockA, flockB));

console.log(resultRefactored)