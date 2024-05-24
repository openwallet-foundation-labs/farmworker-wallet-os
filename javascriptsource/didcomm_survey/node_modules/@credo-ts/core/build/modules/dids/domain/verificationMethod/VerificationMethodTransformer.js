"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerificationMethodTransformer = exports.IsStringOrVerificationMethod = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const JsonTransformer_1 = require("../../../../utils/JsonTransformer");
const VerificationMethod_1 = require("./VerificationMethod");
/**
 * Checks if a given value is a real string.
 */
function IsStringOrVerificationMethod(validationOptions) {
    return (0, class_validator_1.ValidateBy)({
        name: 'isStringOrVerificationMethod',
        validator: {
            validate: (value) => (0, class_validator_1.isString)(value) || (0, class_validator_1.isInstance)(value, VerificationMethod_1.VerificationMethod),
            defaultMessage: (0, class_validator_1.buildMessage)((eachPrefix) => eachPrefix + '$property must be a string or instance of VerificationMethod', validationOptions),
        },
    }, validationOptions);
}
exports.IsStringOrVerificationMethod = IsStringOrVerificationMethod;
/**
 * Decorator that transforms authentication json to corresponding class instances
 *
 * @example
 * class Example {
 *   VerificationMethodTransformer()
 *   private authentication: VerificationMethod
 * }
 */
function VerificationMethodTransformer() {
    return (0, class_transformer_1.Transform)(({ value, type }) => {
        if (type === class_transformer_1.TransformationType.PLAIN_TO_CLASS) {
            return value === null || value === void 0 ? void 0 : value.map((auth) => {
                // referenced verification method
                if (typeof auth === 'string') {
                    return String(auth);
                }
                // embedded verification method
                return JsonTransformer_1.JsonTransformer.fromJSON(auth, VerificationMethod_1.VerificationMethod);
            });
        }
        else if (type === class_transformer_1.TransformationType.CLASS_TO_PLAIN) {
            return value === null || value === void 0 ? void 0 : value.map((auth) => (typeof auth === 'string' ? auth : JsonTransformer_1.JsonTransformer.toJSON(auth)));
        }
        // PLAIN_TO_PLAIN
        return value;
    });
}
exports.VerificationMethodTransformer = VerificationMethodTransformer;
//# sourceMappingURL=VerificationMethodTransformer.js.map