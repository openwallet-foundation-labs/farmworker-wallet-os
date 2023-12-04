"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getKeyFromEd25519VerificationKey2018 = exports.isEd25519VerificationKey2018 = exports.getEd25519VerificationKey2018 = exports.VERIFICATION_METHOD_TYPE_ED25519_VERIFICATION_KEY_2018 = void 0;
const crypto_1 = require("../../../../crypto");
const Key_1 = require("../../../../crypto/Key");
const error_1 = require("../../../../error");
const VerificationMethod_1 = require("./VerificationMethod");
exports.VERIFICATION_METHOD_TYPE_ED25519_VERIFICATION_KEY_2018 = 'Ed25519VerificationKey2018';
/**
 * Get a Ed25519VerificationKey2018 verification method.
 */
function getEd25519VerificationKey2018({ key, id, controller }) {
    return new VerificationMethod_1.VerificationMethod({
        id,
        type: exports.VERIFICATION_METHOD_TYPE_ED25519_VERIFICATION_KEY_2018,
        controller,
        publicKeyBase58: key.publicKeyBase58,
    });
}
exports.getEd25519VerificationKey2018 = getEd25519VerificationKey2018;
/**
 * Check whether a verification method is a Ed25519VerificationKey2018 verification method.
 */
function isEd25519VerificationKey2018(verificationMethod) {
    return verificationMethod.type === exports.VERIFICATION_METHOD_TYPE_ED25519_VERIFICATION_KEY_2018;
}
exports.isEd25519VerificationKey2018 = isEd25519VerificationKey2018;
/**
 * Get a key from a Ed25519VerificationKey2018 verification method.
 */
function getKeyFromEd25519VerificationKey2018(verificationMethod) {
    if (!verificationMethod.publicKeyBase58) {
        throw new error_1.AriesFrameworkError('verification method is missing publicKeyBase58');
    }
    return Key_1.Key.fromPublicKeyBase58(verificationMethod.publicKeyBase58, crypto_1.KeyType.Ed25519);
}
exports.getKeyFromEd25519VerificationKey2018 = getKeyFromEd25519VerificationKey2018;
//# sourceMappingURL=Ed25519VerificationKey2018.js.map