"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFirstVersionEqualToSecond = exports.isFirstVersionHigherThanSecond = exports.parseVersionString = void 0;
function parseVersionString(version) {
    const [major, minor, patch] = version.split('.');
    return [Number(major), Number(minor), Number(patch !== null && patch !== void 0 ? patch : '0')];
}
exports.parseVersionString = parseVersionString;
function isFirstVersionHigherThanSecond(first, second) {
    return (first[0] > second[0] ||
        (first[0] === second[0] && first[1] > second[1]) ||
        (first[0] === second[0] && first[1] === second[1] && first[2] > second[2]));
}
exports.isFirstVersionHigherThanSecond = isFirstVersionHigherThanSecond;
function isFirstVersionEqualToSecond(first, second) {
    return first[0] === second[0] && first[1] === second[1] && first[2] === second[2];
}
exports.isFirstVersionEqualToSecond = isFirstVersionEqualToSecond;
//# sourceMappingURL=version.js.map