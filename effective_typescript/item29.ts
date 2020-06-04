/*
 * @Author: your name
 * @Date: 2020-06-04 18:53:17
 * @LastEditTime: 2020-06-04 20:42:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /typescript-learnings/effective_typescript/item29.ts
 */

/***Item 29: Be Liberal in What You Accept and Strict in What
You Produce */

/***Things to Remember
• Input types tend to be broader than output types. Optional properties and union
types are more common in parameter types than return types.
• To reuse types between parameters and return types, introduce a canonical form
(for return types) and a looser form (for parameters). */

/***robustness principle or Postel’s Law:
 * TCP implementations should follow a general principle of robustness: be conservative
in what you do, be liberal in what you accept from others.
 */

declare function setCamera(camera: CameraOptions): void;
declare function viewportForBounds(bounds: LngLatBounds): CameraOptions;

// The fields in CameraOptions are liberal since all fields are optional 
interface CameraOptions {
    center?: LngLat;
    zoom?: number;
    bearing?: number;
    pitch?: number;
}

// LngLat is liberal because there are multiply possibilities of data structure union
// by type definition
type LngLat =
    { lng: number; lat: number; } |
    { lon: number; lat: number; } |
    [number, number];

// LngLatBounds is liberal for the same reason above
type LngLatBounds =
    { northeast: LngLat, southwest: LngLat } |
    [LngLat, LngLat] |
    [number, number, number, number];


// Now let’s write a function that adjusts the viewport to accommodate a GeoJSON Fea‐
// ture and stores the new viewport in the URL
function focusOnFeature(f: Feature) {
    const bounds = calculateBoundingBox(f);
    const camera = viewportForBounds(bounds);
    setCamera(camera);
    const { center: { lat, lng }, zoom } = camera;
    // ~~~Property 'lat' does not exist on type ...
    // ~~~Property 'lng' does not exist on type ...
    zoom; // Type is number | undefined
    window.location.search = `?v=@${lat},${lng}z${zoom}`;
}

/***Problem: The return type with lots of optional properties and union types makes viewportFor
Bounds difficult to use. Its broad parameter type is convenient, but its broad return
type is not. A more convenient API would be strict in what it produces. */


interface LngLat { lng: number; lat: number; };
type LngLatLike = LngLat | { lon: number; lat: number; } | [number, number];
interface Camera {
    center: LngLat;
    zoom: number;
    bearing: number;
    pitch: number;
}

// Using Partial<Camera> as the parameter type in setCamera would not work here
// since you do want to allow LngLatLike objects for the center property.
interface CameraOptions extends Omit<Partial<Camera>, 'center'> {
    /**And you can’t
write " CameraOptions extends Partial<Camera> " since LngLatLike is a superset of
LngLat , not a subset */
    center?: LngLatLike;
}
type LngLatBounds =
    { northeast: LngLatLike, southwest: LngLatLike } |
    [LngLatLike, LngLatLike] |
    [number, number, number, number];
declare function setCamera(camera: CameraOptions): void;
declare function viewportForBounds(bounds: LngLatBounds): Camera;

function focusOnFeature(f: Feature) {
    const bounds = calculateBoundingBox(f);
    const camera = viewportForBounds(bounds);
    setCamera(camera);
    const { center: { lat, lng }, zoom } = camera; // OK
    zoom; // Type is number
    window.location.search = `?v=@${lat},${lng}z${zoom}`;
}