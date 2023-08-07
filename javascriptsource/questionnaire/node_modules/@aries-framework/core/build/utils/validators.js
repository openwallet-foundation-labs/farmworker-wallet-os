"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsUri = exports.isUri = exports.UriValidator = exports.isStringArray = exports.IsInstanceOrArrayOfInstances = exports.IsStringOrInstance = void 0;
const class_validator_1 = require("class-validator");
const array_1 = require("./array");
/**
 * Checks if the value is a string or the specified instance
 */
function IsStringOrInstance(targetType, validationOptions) {
    return (0, class_validator_1.ValidateBy)({
        name: 'IsStringOrInstance',
        constraints: [targetType],
        validator: {
            validate: (value, args) => (0, class_validator_1.isString)(value) || (0, class_validator_1.isInstance)(value, args === null || args === void 0 ? void 0 : args.constraints[0]),
            defaultMessage: (0, class_validator_1.buildMessage)((eachPrefix, args) => {
                if (args === null || args === void 0 ? void 0 : args.constraints[0]) {
                    return eachPrefix + `$property must be of type string or instance of ${args.constraints[0].name}`;
                }
                else {
                    return eachPrefix + `IsStringOrInstance decorator expects an object as value, but got falsy value.`;
                }
            }, validationOptions),
        },
    }, validationOptions);
}
exports.IsStringOrInstance = IsStringOrInstance;
function IsInstanceOrArrayOfInstances(validationOptions) {
    var _a;
    const classTypes = (0, array_1.asArray)(validationOptions.classType);
    const allowEmptyArray = (_a = validationOptions.allowEmptyArray) !== null && _a !== void 0 ? _a : false;
    return (0, class_validator_1.ValidateBy)({
        name: 'isInstanceOrArrayOfInstances',
        validator: {
            validate: (values) => {
                if (!values)
                    return false;
                if (Array.isArray(values) && values.length === 0)
                    return allowEmptyArray;
                return ((0, array_1.asArray)(values)
                    // all values MUST be instance of one of the class types
                    .every((value) => classTypes.some((classType) => (0, class_validator_1.isInstance)(value, classType))));
            },
            defaultMessage: (0, class_validator_1.buildMessage)((eachPrefix) => eachPrefix +
                `$property value must be an instance of, or an array of instances containing ${classTypes
                    .map((c) => c.name)
                    .join(', ')}`, validationOptions),
        },
    }, validationOptions);
}
exports.IsInstanceOrArrayOfInstances = IsInstanceOrArrayOfInstances;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isStringArray(value) {
    return Array.isArray(value) && value.every((v) => typeof v === 'string');
}
exports.isStringArray = isStringArray;
exports.UriValidator = /\w+:(\/?\/?)[^\s]+/;
function isUri(value) {
    return exports.UriValidator.test(value);
}
exports.isUri = isUri;
function IsUri(validationOptions) {
    return (0, class_validator_1.ValidateBy)({
        name: 'isUri',
        validator: {
            validate: (value) => isUri(value),
            defaultMessage: (0, class_validator_1.buildMessage)((eachPrefix) => eachPrefix + `$property must be an URI (that matches regex: ${exports.UriValidator.source})`, validationOptions),
        },
    }, validationOptions);
}
exports.IsUri = IsUri;
//# sourceMappingURL=validators.js.map