"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsCredentialJsonLdContext = void 0;
const class_validator_1 = require("class-validator");
const utils_1 = require("../../utils");
const constants_1 = require("./constants");
function IsCredentialJsonLdContext(validationOptions) {
    return (0, class_validator_1.ValidateBy)({
        name: 'IsCredentialJsonLdContext',
        validator: {
            validate: (value) => {
                if (!Array.isArray(value))
                    return false;
                // First item must be the verifiable credential context
                if (value[0] !== constants_1.CREDENTIALS_CONTEXT_V1_URL)
                    return false;
                return value.every((v) => ((0, class_validator_1.isString)(v) && (0, class_validator_1.isURL)(v)) || (0, utils_1.isJsonObject)(v));
            },
            defaultMessage: (0, class_validator_1.buildMessage)((eachPrefix) => eachPrefix +
                '$property must be an array of strings or objects, where the first item is the verifiable credential context URL.', validationOptions),
        },
    }, validationOptions);
}
exports.IsCredentialJsonLdContext = IsCredentialJsonLdContext;
//# sourceMappingURL=validators.js.map