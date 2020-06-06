/*
 * @Author: your name
 * @Date: 2020-06-05 20:55:31
 * @LastEditTime: 2020-06-05 21:18:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /typescript-learnings/effective_typescript/item32.ts
 */

/*** Item 32: Prefer Unions of Interfaces to Interfaces of
Unions */

/***Things to Remember
• Interfaces with multiple properties that are union types are often a mistake
because they obscure the relationships between these properties.
• Unions of interfaces are more precise and can be understood by TypeScript.
• Consider adding a “tag” to your structure to facilitate TypeScript’s control flow
analysis. Because they are so well supported, tagged unions are ubiquitous in
TypeScript code. */

/***If you create an interface whose properties are union types, you should ask whether
the type would make more sense as a union of more precise interfaces. */

/***It's all about dealing with relationship between properties */

/**# this pattern is useful when you find yourself in a situation where lot of null checks you need to do
 * , especially check related values, for instance min and max in the example below
 */

interface Layer {
    layout: FillLayout | LineLayout | PointLayout;
    paint: FillPaint | LinePaint | PointPaint;
}

// A better way
interface FillLayer {
    layout: FillLayout;
    paint: FillPaint;
}
interface LineLayer {
    layout: LineLayout;
    paint: LinePaint;
}
interface PointLayer {
    layout: PointLayout;
    paint: PointPaint;
}
type Layer = FillLayer | LineLayer | PointLayer;

//this is the same idea as type represent one state

// tagged union version
interface FillLayer {
    type: 'fill';
    layout: FillLayout;
    paint: FillPaint;
}
interface LineLayer {
    type: 'line';
    layout: LineLayout;
    paint: LinePaint;
}
interface PointLayer {
    type: 'paint';
    layout: PointLayout;
    paint: PointPaint;
}
type Layer = FillLayer | LineLayer | PointLayer;

// usage 
function drawLayer(layer: Layer) {
    if (layer.type === 'fill') {
        const { paint } = layer; // Type is FillPaint
        const { layout } = layer; // Type is FillLayout
    } else if (layer.type === 'line') {
        const { paint } = layer; // Type is LinePaint
        const { layout } = layer; // Type is LineLayout
    } else {
        const { paint } = layer; // Type is PointPaint
        const { layout } = layer; // Type is PointLayout
    }
}

// If you think of optional fields as a union of their type and undefined , then they fit
// this pattern as well.

/**If you are work with external API with interface already defined, then union of interfaces
 * can be used
 */

interface Name {
    name: string;
}
interface PersonWithBirth extends Name {
    placeOfBirth: string;
    dateOfBirth: Date;
}

type Person = Name | PersonWithBirth;

function eulogize(p: Person) {
    if ('placeOfBirth' in p) {
        p // Type is PersonWithBirth
        const { dateOfBirth } = p // OK, type is Date
    }
}