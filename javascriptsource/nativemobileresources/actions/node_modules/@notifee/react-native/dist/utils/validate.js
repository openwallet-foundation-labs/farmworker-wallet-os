"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNull = isNull;
exports.isObject = isObject;
exports.isFunction = isFunction;
exports.isString = isString;
exports.isNumber = isNumber;
exports.isBoolean = isBoolean;
exports.isArray = isArray;
exports.isArrayOfStrings = isArrayOfStrings;
exports.isUndefined = isUndefined;
exports.objectKeyValuesAreStrings = objectKeyValuesAreStrings;
exports.isAlphaNumericUnderscore = isAlphaNumericUnderscore;
exports.isValidUrl = isValidUrl;
exports.isValidEnum = isValidEnum;
/* eslint-disable @typescript-eslint/ban-types */
/*
 * Copyright (c) 2016-present Invertase Limited
 */
function isNull(value) {
    return value === null;
}
function isObject(value) {
    return value ? typeof value === 'object' && !Array.isArray(value) && !isNull(value) : false;
}
function isFunction(value) {
    return value ? typeof value === 'function' : false;
}
function isString(value) {
    return typeof value === 'string';
}
function isNumber(value) {
    return typeof value === 'number';
}
function isBoolean(value) {
    return typeof value === 'boolean';
}
function isArray(value) {
    return Array.isArray(value);
}
function isArrayOfStrings(value) {
    if (!isArray(value))
        return false;
    for (let i = 0; i < value.length; i++) {
        if (!isString(value[i]))
            return false;
    }
    return true;
}
function isUndefined(value) {
    return value === undefined;
}
function objectKeyValuesAreStrings(value) {
    if (!isObject(value)) {
        return false;
    }
    const entries = Object.entries(value);
    for (let i = 0; i < entries.length; i++) {
        const [key, entryValue] = entries[i];
        if (!isString(key) || !isString(entryValue)) {
            return false;
        }
    }
    return true;
}
/**
 * /^[a-zA-Z0-9_]+$/
 *
 * @param value
 * @returns {boolean}
 */
const AlphaNumericUnderscore = /^[a-zA-Z0-9_]+$/;
function isAlphaNumericUnderscore(value) {
    return AlphaNumericUnderscore.test(value);
}
/**
 * URL test
 * @param url
 * @returns {boolean}
 */
const IS_VALID_URL_REGEX = /^(http|https):\/\/[^ "]+$/;
function isValidUrl(url) {
    return IS_VALID_URL_REGEX.test(url);
}
function isValidEnum(value, enumType) {
    if (!Object.values(enumType).includes(value)) {
        return false;
    }
    return true;
}
//# sourceMappingURL=validate.js.map