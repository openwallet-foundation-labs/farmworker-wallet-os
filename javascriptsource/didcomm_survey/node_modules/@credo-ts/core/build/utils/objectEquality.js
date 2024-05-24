"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.areObjectsEqual = void 0;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function areObjectsEqual(a, b) {
    if (typeof a == 'object' && a != null && typeof b == 'object' && b != null) {
        const definedA = Object.fromEntries(Object.entries(a).filter(([, value]) => value !== undefined));
        const definedB = Object.fromEntries(Object.entries(b).filter(([, value]) => value !== undefined));
        if (Object.keys(definedA).length !== Object.keys(definedB).length)
            return false;
        for (const key in definedA) {
            if (!(key in definedB) || !areObjectsEqual(definedA[key], definedB[key])) {
                return false;
            }
        }
        for (const key in definedB) {
            if (!(key in definedA) || !areObjectsEqual(definedB[key], definedA[key])) {
                return false;
            }
        }
        return true;
    }
    else {
        return a === b;
    }
}
exports.areObjectsEqual = areObjectsEqual;
//# sourceMappingURL=objectEquality.js.map