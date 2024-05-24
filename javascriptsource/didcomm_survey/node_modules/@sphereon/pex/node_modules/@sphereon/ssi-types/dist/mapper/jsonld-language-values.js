"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapLanguageValues = exports.mapLanguageValue = exports.toLanguageValueObjects = exports.toLanguageValueObject = exports.isLanguageValueObjects = exports.isLanguageValueObject = void 0;
const utils_1 = require("../utils");
const isLanguageValueObject = (claim) => {
    if (!claim || !utils_1.ObjectUtils.isObject(claim) || Array.isArray(claim)) {
        return false;
    }
    const keys = Object.keys(claim);
    if (keys.length !== 2) {
        return false; // Only 'language' and 'value' for now
    }
    else if (!('language' in claim && !!claim.language)) {
        return false;
    }
    else if (!('value' in claim && !!claim.value)) {
        return false;
    }
    return true;
};
exports.isLanguageValueObject = isLanguageValueObject;
const isLanguageValueObjects = (claim) => {
    if (!claim || !Array.isArray(claim)) {
        return false;
    }
    return claim.every((val) => (0, exports.isLanguageValueObject)(val));
};
exports.isLanguageValueObjects = isLanguageValueObjects;
const toLanguageValueObject = (claim) => {
    return (0, exports.isLanguageValueObject)(claim) ? claim : undefined;
};
exports.toLanguageValueObject = toLanguageValueObject;
const toLanguageValueObjects = (claim) => {
    if ((0, exports.isLanguageValueObject)(claim)) {
        return utils_1.ObjectUtils.asArray((0, exports.toLanguageValueObject)(claim));
    }
    else if ((0, exports.isLanguageValueObjects)(claim)) {
        return claim;
    }
    return undefined; // no empty array on purpose, as this really would not be a language value object
};
exports.toLanguageValueObjects = toLanguageValueObjects;
const mapLanguageValue = (claim, opts) => {
    const langValues = (0, exports.toLanguageValueObjects)(claim);
    if (Array.isArray(langValues)) {
        if (langValues.length === 0) {
            // should not happen, but let's return original claim to be sure
            return claim;
        }
        const filteredLangValues = langValues.filter((val) => ((opts === null || opts === void 0 ? void 0 : opts.language) ? val.language.toLowerCase().includes(opts.language.toLowerCase()) : true));
        let langValue;
        if (filteredLangValues.length > 0) {
            langValue = filteredLangValues[0];
        }
        else {
            if ((opts === null || opts === void 0 ? void 0 : opts.fallbackToFirstObject) === false) {
                // No match and we also do not fallback to the first value, so return the original claim
                return claim;
            }
            // Fallback to the first value
            langValue = langValues[0];
        }
        return langValue.value;
    }
    return claim;
};
exports.mapLanguageValue = mapLanguageValue;
const mapLanguageValues = (claimsOrCredential, opts) => {
    const result = (opts === null || opts === void 0 ? void 0 : opts.noDeepClone) ? claimsOrCredential : JSON.parse(JSON.stringify(claimsOrCredential));
    Object.keys(claimsOrCredential).forEach((key) => {
        result[key] = (0, exports.mapLanguageValue)(result[key], opts);
        if (utils_1.ObjectUtils.isObject(result[key]) || Array.isArray(result[key])) {
            result[key] = (0, exports.mapLanguageValues)(result[key], Object.assign(Object.assign({}, opts), { noDeepClone: true }));
        }
    });
    return result;
};
exports.mapLanguageValues = mapLanguageValues;
//# sourceMappingURL=jsonld-language-values.js.map