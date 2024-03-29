"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.keyDidX25519 = void 0;
const KeyType_1 = require("../../../../crypto/KeyType");
const error_1 = require("../../../../error");
const verificationMethod_1 = require("../verificationMethod");
exports.keyDidX25519 = {
    supportedVerificationMethodTypes: [
        verificationMethod_1.VERIFICATION_METHOD_TYPE_X25519_KEY_AGREEMENT_KEY_2019,
        verificationMethod_1.VERIFICATION_METHOD_TYPE_JSON_WEB_KEY_2020,
    ],
    getVerificationMethods: (did, key) => [
        (0, verificationMethod_1.getX25519KeyAgreementKey2019)({ id: `${did}#${key.fingerprint}`, key, controller: did }),
    ],
    getKeyFromVerificationMethod: (verificationMethod) => {
        if ((0, verificationMethod_1.isJsonWebKey2020)(verificationMethod)) {
            return (0, verificationMethod_1.getKeyFromJsonWebKey2020)(verificationMethod);
        }
        if ((0, verificationMethod_1.isX25519KeyAgreementKey2019)(verificationMethod)) {
            return (0, verificationMethod_1.getKeyFromX25519KeyAgreementKey2019)(verificationMethod);
        }
        throw new error_1.AriesFrameworkError(`Verification method with type '${verificationMethod.type}' not supported for key type '${KeyType_1.KeyType.X25519}'`);
    },
};
//# sourceMappingURL=x25519.js.map