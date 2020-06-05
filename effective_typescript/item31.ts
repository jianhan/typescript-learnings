/*
 * @Author: your name
 * @Date: 2020-06-04 20:45:08
 * @LastEditTime: 2020-06-05 20:54:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /typescript-learnings/effective_typescript/item31.ts
 */

/***Item 31: Push Null Values to the Perimeter of Your Types */

/***Things to Remember
• Avoid designs in which one value being null or not null is implicitly related to
another value being null or not null .
• Push null values to the perimeter of your API by making larger objects either
null or fully non- null . This will make code clearer both for human readers and
for the type checker.
• Consider creating a fully non- null class and constructing it when all values are
available.
• While strictNullChecks may flag many issues in your code, it’s indispensable
for surfacing the behavior of functions with respect to null values. */

/*** it may seem as though you have to add
scores of if statements checking for null and undefined values throughout your
code. This is often because the relationships between null and non-null values are
implicit: when variable A is non-null, you know that variable B is also non-null and
vice versa. These implicit relationships are confusing both for human readers of your
code and for the type checker. */

/***Example: Suppose you want to calculate the min and max of a list of numbers */

function extent(nums: number[]) {
    let min, max;
    for (const num of nums) {
        if (!min) {
            min = num;
            max = num;
        } else {
            min = Math.min(min, num);
            max = Math.max(max, num);
        }
    }
    return [min, max];
}

/***A better solution is to put the min and max in the same object and make this object
either fully null or fully non- null : */
function extentRefactored(nums: number[]) {
    // magic is here, define a related two variables into one object/tuple
    // and make the entire object null or none null.
    let result: [number, number] | null = null;
    for (const num of nums) {
        if (!result) {
            result = [num, num];
        } else {
            result = [Math.min(num, result[0]), Math.max(num, result[1])];
        }
    }
    return result;
}

// mix of null and none null values can be problematic 