"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceError = void 0;
/*
 * The replacer parameter allows you to specify a function that replaces values with your own. We can use it to control what gets stringified.
 */
function replaceError(_, value) {
    if (value instanceof Error) {
        const newValue = Object.getOwnPropertyNames(value).reduce((obj, propName) => {
            obj[propName] = value[propName];
            return obj;
        }, { name: value.name });
        return newValue;
    }
    return value;
}
exports.replaceError = replaceError;
//# sourceMappingURL=replaceError.js.map