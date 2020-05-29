/*
 * @Author: your name
 * @Date: 2020-05-29 21:10:25
 * @LastEditTime: 2020-05-29 22:51:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /typescript-learnings/effective_typescript/item17.ts
 */

/**Item 17: Use readonly to Avoid Errors Associated with
Mutation */

/**Things to Remember
• If your function does not modify its parameters then declare them readonly .
This makes its contract clearer and prevents inadvertent mutations in its
implementation.
• Use readonly to prevent errors with mutation and to find the places in your code
where mutations occur.
• Understand the difference between const and readonly .
• Understand that readonly is shallow. */

// Task: print (1, 1+2, 1+2+3, etc.)

function printTriangles(n: number) {
    const nums = [];
    for (let i = 0; i < n; i++) {
        nums.push(i);
        console.log(arraySum(nums));
    }
}

function arraySum(arr: number[]) {
    let sum = 0, num;
    // this is the problem, arr.pop actually mutate the array
    while ((num = arr.pop()) !== undefined) {
        sum += num;
    }
    return sum;
}

function arraySumReadOnly(arr: readonly number[]) {
    let sum = 0, num;
    while ((num = arr.pop()) !== undefined) {
        // ~~~ 'pop' does not exist on type 'readonly number[]'
        sum += num;
    }
    return sum
}

function arraySumFixedReadOnly(arr: readonly number[]) {
    let sum = 0;
    for (const num of arr) {
        sum += num;
    }
    return sum;
}

// So you can assign a mutable array to a readonly array, but not
// vice versa:
const a: number[] = [1, 2, 3];
const b: readonly number[] = a;
const c: number[] = b;

/**!!! Read only is shallow, as you can see object within a read only array still mutable
 * unless object property itself is readonly
 */
type VideoGame = {
    title: string;
    company: string;
    age: number;
}

type Player = {
    name: string;
    age: number;
    favGame: VideoGame;
}

const players: readonly Player[] = [{
    name: "Bob",
    age: 30,
    favGame: {
        title: "Half Life",
        company: "Valve",
        age: 12
    }
}]

players[0].favGame.title = "Tetris";
players[0].name = "Jim";

console.log(players) // name and favGame title was mutated

/**When to use: If you have a function with parameters and these don’t mutate their parameters and are in your control,
make them readonly */

/**Downside: readonly tends to be contagious: once you mark one function
with readonly , you’ll also need to mark all the functions that it calls. This is a good
thing since it leads to clearer contracts and better type safety */


// If you want to make a deep readonly, use a lib, it is tricky to implement