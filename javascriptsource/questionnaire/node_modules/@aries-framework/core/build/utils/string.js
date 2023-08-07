"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rightSplit = void 0;
function rightSplit(string, sep, limit) {
    const split = string.split(sep);
    return limit ? [split.slice(0, -limit).join(sep)].concat(split.slice(-limit)) : split;
}
exports.rightSplit = rightSplit;
//# sourceMappingURL=string.js.map