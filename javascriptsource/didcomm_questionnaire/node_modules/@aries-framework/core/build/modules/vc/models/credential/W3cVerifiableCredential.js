"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.W3cVerifiableCredentialTransformer = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const error_1 = require("../../../../error");
const utils_1 = require("../../../../utils");
const W3cJsonLdVerifiableCredential_1 = require("../../data-integrity/models/W3cJsonLdVerifiableCredential");
const W3cJwtVerifiableCredential_1 = require("../../jwt-vc/W3cJwtVerifiableCredential");
const getCredential = (v) => {
    try {
        return typeof v === 'string'
            ? W3cJwtVerifiableCredential_1.W3cJwtVerifiableCredential.fromSerializedJwt(v)
            : // Validation is done separately
                utils_1.JsonTransformer.fromJSON(v, W3cJsonLdVerifiableCredential_1.W3cJsonLdVerifiableCredential, { validate: false });
    }
    catch (error) {
        if (error instanceof class_validator_1.ValidationError || error instanceof error_1.ClassValidationError)
            throw error;
        throw new error_1.AriesFrameworkError(`value '${v}' is not a valid W3cJwtVerifiableCredential. ${error.message}`);
    }
};
const getEncoded = (v) => v instanceof W3cJwtVerifiableCredential_1.W3cJwtVerifiableCredential ? v.serializedJwt : utils_1.JsonTransformer.toJSON(v);
function W3cVerifiableCredentialTransformer() {
    return (0, class_transformer_1.Transform)(({ value, type }) => {
        if (type === class_transformer_1.TransformationType.PLAIN_TO_CLASS) {
            return Array.isArray(value) ? value.map(getCredential) : getCredential(value);
        }
        else if (type === class_transformer_1.TransformationType.CLASS_TO_PLAIN) {
            if (Array.isArray(value))
                return value.map(getEncoded);
            return getEncoded(value);
        }
        // PLAIN_TO_PLAIN
        return value;
    });
}
exports.W3cVerifiableCredentialTransformer = W3cVerifiableCredentialTransformer;
//# sourceMappingURL=W3cVerifiableCredential.js.map