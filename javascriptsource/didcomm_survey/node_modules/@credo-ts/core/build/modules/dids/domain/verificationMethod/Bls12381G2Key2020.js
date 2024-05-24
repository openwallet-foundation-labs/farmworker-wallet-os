"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getKeyFromBls12381G2Key2020 = exports.isBls12381G2Key2020 = exports.getBls12381G2Key2020 = exports.VERIFICATION_METHOD_TYPE_BLS12381G2_KEY_2020 = void 0;
const crypto_1 = require("../../../../crypto");
const Key_1 = require("../../../../crypto/Key");
const error_1 = require("../../../../error");
const VerificationMethod_1 = require("./VerificationMethod");
exports.VERIFICATION_METHOD_TYPE_BLS12381G2_KEY_2020 = 'Bls12381G2Key2020';
/**
 * Get a Bls12381G2Key2020 verification method.
 */
function getBls12381G2Key2020({ key, id, controller }) {
    return new VerificationMethod_1.VerificationMethod({
        id,
        type: exports.VERIFICATION_METHOD_TYPE_BLS12381G2_KEY_2020,
        controller,
        publicKeyBase58: key.publicKeyBase58,
    });
}
exports.getBls12381G2Key2020 = getBls12381G2Key2020;
/**
 * Check whether a verification method is a Bls12381G2Key2020 verification method.
 */
function isBls12381G2Key2020(verificationMethod) {
    return verificationMethod.type === exports.VERIFICATION_METHOD_TYPE_BLS12381G2_KEY_2020;
}
exports.isBls12381G2Key2020 = isBls12381G2Key2020;
/**
 * Get a key from a Bls12381G2Key2020 verification method.
 */
function getKeyFromBls12381G2Key2020(verificationMethod) {
    if (!verificationMethod.publicKeyBase58) {
        throw new error_1.CredoError('verification method is missing publicKeyBase58');
    }
    return Key_1.Key.fromPublicKeyBase58(verificationMethod.publicKeyBase58, crypto_1.KeyType.Bls12381g2);
}
exports.getKeyFromBls12381G2Key2020 = getKeyFromBls12381G2Key2020;
//# sourceMappingURL=Bls12381G2Key2020.js.map