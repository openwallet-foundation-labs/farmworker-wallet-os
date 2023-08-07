"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapSingleOrArray = exports.asArray = void 0;
const asArray = (val) => {
    if (!val)
        return [];
    if (Array.isArray(val))
        return val;
    return [val];
};
exports.asArray = asArray;
const mapSingleOrArray = (value, fn) => {
    const mapped = (0, exports.asArray)(value).map(fn);
    // We need to return a single or array value based on the input type
    return Array.isArray(value) ? mapped : mapped[0];
};
exports.mapSingleOrArray = mapSingleOrArray;
//# sourceMappingURL=array.js.map