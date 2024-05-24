"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectUtils = void 0;
class ObjectUtils {
    static asArray(value) {
        return Array.isArray(value) ? value : [value];
    }
    static isObject(value) {
        return typeof value === 'object' || Object.prototype.toString.call(value) === '[object Object]';
    }
    static isUrlAbsolute(url) {
        // regex to check for absolute IRI (starting scheme and ':') or blank node IRI
        const isAbsoluteRegex = /^([A-Za-z][A-Za-z0-9+-.]*|_):[^\s]*$/;
        ObjectUtils.isString(url) && isAbsoluteRegex.test(url);
    }
    static isString(value) {
        return typeof value === 'string' || Object.prototype.toString.call(value) === '[object String]';
    }
}
exports.ObjectUtils = ObjectUtils;
//# sourceMappingURL=object.js.map