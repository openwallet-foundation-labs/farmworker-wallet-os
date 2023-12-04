"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deepEquality = void 0;
const objectEquality_1 = require("./objectEquality");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function deepEquality(x, y) {
    // We do a simple equals here to check primitives, functions, regex, etc.
    // This will only happen if the typing of the function is ignored
    const isXSimpleEqualY = simpleEqual(x, y);
    if (isXSimpleEqualY !== undefined)
        return isXSimpleEqualY;
    if (!(x instanceof Map) || !(y instanceof Map))
        return (0, objectEquality_1.areObjectsEqual)(x, y);
    const xMap = x;
    const yMap = y;
    // At this point we are sure we have two instances of a Map
    const xKeys = Array.from(xMap.keys());
    const yKeys = Array.from(yMap.keys());
    // Keys from both maps are not equal, content has not been verified, yet
    if (!equalsIgnoreOrder(xKeys, yKeys))
        return false;
    // Here we recursively check whether the value of xMap is equals to the value of yMap
    return Array.from(xMap.entries()).every(([key, xVal]) => deepEquality(xVal, yMap.get(key)));
}
exports.deepEquality = deepEquality;
/**
 * @note This will only work for primitive array equality
 */
function equalsIgnoreOrder(a, b) {
    if (a.length !== b.length)
        return false;
    return a.every((k) => b.includes(k));
}
// We take any here as we have to check some properties, they will be undefined if they do not exist
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function simpleEqual(x, y) {
    // short circuit for easy equality
    if (x === y)
        return true;
    if ((x === null || x === undefined) && (y === null || y === undefined))
        return x === y;
    // after this just checking type of one would be enough
    if (x.constructor !== y.constructor)
        return false;
    // if they are functions, they should exactly refer to same one (because of closures)
    if (x instanceof Function)
        return x === y;
    // if they are regexps, they should exactly refer to same one (it is hard to better equality check on current ES)
    if (x instanceof RegExp)
        return x === y;
    if (x.valueOf && y.valueOf && x.valueOf() === y.valueOf())
        return true;
    // if they are dates, they must had equal valueOf
    if (x instanceof Date || y instanceof Date)
        return false;
}
//# sourceMappingURL=deepEquality.js.map