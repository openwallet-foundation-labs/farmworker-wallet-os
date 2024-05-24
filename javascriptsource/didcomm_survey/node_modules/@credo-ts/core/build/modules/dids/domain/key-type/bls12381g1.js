"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.keyDidBls12381g1 = void 0;
const KeyType_1 = require("../../../../crypto/KeyType");
const error_1 = require("../../../../error");
const verificationMethod_1 = require("../verificationMethod");
exports.keyDidBls12381g1 = {
    supportedVerificationMethodTypes: [verificationMethod_1.VERIFICATION_METHOD_TYPE_BLS12381G1_KEY_2020],
    getVerificationMethods: (did, key) => [
        (0, verificationMethod_1.getBls12381G1Key2020)({ id: `${did}#${key.fingerprint}`, key, controller: did }),
    ],
    getKeyFromVerificationMethod: (verificationMethod) => {
        if ((0, verificationMethod_1.isBls12381G1Key2020)(verificationMethod)) {
            return (0, verificationMethod_1.getKeyFromBls12381G1Key2020)(verificationMethod);
        }
        throw new error_1.CredoError(`Verification method with type '${verificationMethod.type}' not supported for key type '${KeyType_1.KeyType.Bls12381g1}'`);
    },
};
//# sourceMappingURL=bls12381g1.js.map