/*
 * @Author: your name
 * @Date: 2020-05-29 23:02:37
 * @LastEditTime: 2020-05-29 23:11:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /typescript-learnings/effective_typescript/item18.ts
 */

/**Item 18: Use Mapped Types to Keep Values in Sync */

/**Things to Remember
• Use mapped types to keep related values and types synchronized.
• Consider using mapped types to force choices when adding new properties to an
interface. */

// it is common in frontend development, for instance in react,
// you have a type, when some of the properties in the type changed,
// it required some function to be called, for instance redraw,
// kind of like reactive
// example

interface ScatterProps {
    // The data
    xs: number[];
    ys: number[];
    // Display
    xRange: [number, number];
    yRange: [number, number];
    color: string;
    // Events
    onClick: (x: number, y: number, index: number) => void;
}

// first attempt
function shouldUpdate(
    oldProps: ScatterProps,
    newProps: ScatterProps
) {
    let k: keyof ScatterProps;
    for (k in oldProps) {
        if (oldProps[k] !== newProps[k]) {
            if (k !== 'onClick') return true;
        }
    }
    return false;
}

// Problem: the problem is it will redraw too often

// second attempt
function shouldUpdate2(
    oldProps: ScatterProps,
    newProps: ScatterProps
) {
    return (
        oldProps.xs !== newProps.xs ||
        oldProps.ys !== newProps.ys ||
        oldProps.xRange !== newProps.xRange ||
        oldProps.yRange !== newProps.yRange ||
        oldProps.color !== newProps.color
        // (no check for onClick)
    );
}

// Problem: With this approach there won’t be any unnecessary redraws, but there might be some
// necessary draws that get dropped. This violates the “first, do no harm” principle of
// optimization and so is less common.

/**Neither approach is ideal. What you’d really like is to force your coworker or future
self to make a decision when adding the new property */

interface ScatterProps {
    xs: number[];
    ys: number[];
    // ...
    onClick: (x: number, y: number, index: number) => void;
    // Note: if you add a property here, update shouldUpdate!
}

// this is the magic
const REQUIRES_UPDATE: { [k in keyof ScatterProps]: boolean } = {
    xs: true,
    ys: true,
    xRange: true,
    yRange: true,
    color: true,
    onClick: false,
};

function shouldUpdate(
    oldProps: ScatterProps,
    newProps: ScatterProps
) {
    let k: keyof ScatterProps;
    for (k in oldProps) {
        // notice how it checks the key in the map here ?
        if (oldProps[k] !== newProps[k] && REQUIRES_UPDATE[k]) {
            return true;
        }
    }
    return false;
}

/**this means in the future, if someone added a new property to ScatterProps, then it will
 * ENFORCE him/her to add the same property in REQUIRES_UPDATE map, nothing else needed to change,
 * this way we always make sure no missing props, everything works in a explicit way, more clear
 */