"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.keyDidEd25519 = exports.convertPublicKeyToX25519 = void 0;
const KeyType_1 = require("../../../../crypto/KeyType");
const error_1 = require("../../../../error");
const verificationMethod_1 = require("../verificationMethod");
var ed25519_1 = require("@stablelib/ed25519");
Object.defineProperty(exports, "convertPublicKeyToX25519", { enumerable: true, get: function () { return ed25519_1.convertPublicKeyToX25519; } });
exports.keyDidEd25519 = {
    supportedVerificationMethodTypes: [
        verificationMethod_1.VERIFICATION_METHOD_TYPE_ED25519_VERIFICATION_KEY_2018,
        verificationMethod_1.VERIFICATION_METHOD_TYPE_ED25519_VERIFICATION_KEY_2020,
        verificationMethod_1.VERIFICATION_METHOD_TYPE_JSON_WEB_KEY_2020,
        verificationMethod_1.VERIFICATION_METHOD_TYPE_MULTIKEY,
    ],
    getVerificationMethods: (did, key) => [
        (0, verificationMethod_1.getEd25519VerificationKey2018)({ id: `${did}#${key.fingerprint}`, key, controller: did }),
    ],
    getKeyFromVerificationMethod: (verificationMethod) => {
        if ((0, verificationMethod_1.isEd25519VerificationKey2018)(verificationMethod)) {
            return (0, verificationMethod_1.getKeyFromEd25519VerificationKey2018)(verificationMethod);
        }
        if ((0, verificationMethod_1.isEd25519VerificationKey2020)(verificationMethod)) {
            return (0, verificationMethod_1.getKeyFromEd25519VerificationKey2020)(verificationMethod);
        }
        if ((0, verificationMethod_1.isJsonWebKey2020)(verificationMethod)) {
            return (0, verificationMethod_1.getKeyFromJsonWebKey2020)(verificationMethod);
        }
        if ((0, verificationMethod_1.isMultikey)(verificationMethod)) {
            return (0, verificationMethod_1.getKeyFromMultikey)(verificationMethod);
        }
        throw new error_1.CredoError(`Verification method with type '${verificationMethod.type}' not supported for key type '${KeyType_1.KeyType.Ed25519}'`);
    },
};
//# sourceMappingURL=ed25519.js.map