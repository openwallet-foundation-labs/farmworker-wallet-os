"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsStringOrStringArray = exports.IsMap = exports.DateParser = exports.DateTransformer = exports.MetadataTransformer = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const luxon_1 = require("luxon");
const Metadata_1 = require("../storage/Metadata");
/*
 * Decorator that transforms to and from a metadata instance.
 */
function MetadataTransformer() {
    return (0, class_transformer_1.Transform)(({ value, type }) => {
        if (type === class_transformer_1.TransformationType.CLASS_TO_PLAIN) {
            return Object.assign({}, value.data);
        }
        if (type === class_transformer_1.TransformationType.PLAIN_TO_CLASS) {
            return new Metadata_1.Metadata(value);
        }
        if (type === class_transformer_1.TransformationType.CLASS_TO_CLASS) {
            return new Metadata_1.Metadata(Object.assign({}, value.data));
        }
    });
}
exports.MetadataTransformer = MetadataTransformer;
/**
 * Decorator that transforms to and from a date instance.
 */
function DateTransformer() {
    return (0, class_transformer_1.Transform)(({ value, type }) => {
        if (value === undefined)
            return undefined;
        if (type === class_transformer_1.TransformationType.CLASS_TO_PLAIN) {
            return value.toISOString();
        }
        if (type === class_transformer_1.TransformationType.PLAIN_TO_CLASS) {
            return new Date(value);
        }
        if (type === class_transformer_1.TransformationType.CLASS_TO_CLASS) {
            return new Date(value.getTime());
        }
    });
}
exports.DateTransformer = DateTransformer;
/*
 * Function that parses date from multiple formats
 * including SQL formats.
 */
function DateParser(value) {
    const parsedDate = new Date(value);
    if (parsedDate instanceof Date && !isNaN(parsedDate.getTime())) {
        return parsedDate;
    }
    const luxonDate = luxon_1.DateTime.fromSQL(value);
    if (luxonDate.isValid) {
        return new Date(luxonDate.toString());
    }
    return new Date();
}
exports.DateParser = DateParser;
/**
 * Checks if a given value is a Map
 */
function IsMap(validationOptions) {
    return (0, class_validator_1.ValidateBy)({
        name: 'isMap',
        validator: {
            validate: (value) => value instanceof Map,
            defaultMessage: (0, class_validator_1.buildMessage)((eachPrefix) => eachPrefix + '$property must be a Map', validationOptions),
        },
    }, validationOptions);
}
exports.IsMap = IsMap;
/**
 * Checks if a given value is a string or string array.
 */
function IsStringOrStringArray(validationOptions) {
    return (0, class_validator_1.ValidateBy)({
        name: 'isStringOrStringArray',
        validator: {
            validate: (value) => (0, class_validator_1.isString)(value) || (Array.isArray(value) && value.every((v) => (0, class_validator_1.isString)(v))),
            defaultMessage: (0, class_validator_1.buildMessage)((eachPrefix) => eachPrefix + '$property must be a string or string array', validationOptions),
        },
    }, validationOptions);
}
exports.IsStringOrStringArray = IsStringOrStringArray;
//# sourceMappingURL=transformers.js.map