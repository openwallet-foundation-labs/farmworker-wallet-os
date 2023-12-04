"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.keyDidJsonWebKey = void 0;
const jwk_1 = require("../../../../crypto/jose/jwk");
const error_1 = require("../../../../error");
const verificationMethod_1 = require("../verificationMethod");
const JsonWebKey2020_1 = require("../verificationMethod/JsonWebKey2020");
exports.keyDidJsonWebKey = {
    supportedVerificationMethodTypes: [JsonWebKey2020_1.VERIFICATION_METHOD_TYPE_JSON_WEB_KEY_2020],
    getVerificationMethods: (did, key) => [(0, verificationMethod_1.getJsonWebKey2020)({ did, key })],
    getKeyFromVerificationMethod: (verificationMethod) => {
        if (!(0, JsonWebKey2020_1.isJsonWebKey2020)(verificationMethod) || !verificationMethod.publicKeyJwk) {
            throw new error_1.AriesFrameworkError('Invalid verification method passed');
        }
        return (0, jwk_1.getJwkFromJson)(verificationMethod.publicKeyJwk).key;
    },
};
//# sourceMappingURL=keyDidJsonWebKey.js.map