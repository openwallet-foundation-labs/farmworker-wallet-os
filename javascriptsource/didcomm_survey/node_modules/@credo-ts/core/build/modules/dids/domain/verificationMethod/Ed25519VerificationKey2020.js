"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getKeyFromEd25519VerificationKey2020 = exports.isEd25519VerificationKey2020 = exports.getEd25519VerificationKey2020 = exports.VERIFICATION_METHOD_TYPE_ED25519_VERIFICATION_KEY_2020 = void 0;
const crypto_1 = require("../../../../crypto");
const Key_1 = require("../../../../crypto/Key");
const error_1 = require("../../../../error");
const VerificationMethod_1 = require("./VerificationMethod");
exports.VERIFICATION_METHOD_TYPE_ED25519_VERIFICATION_KEY_2020 = 'Ed25519VerificationKey2020';
/**
 * Get a Ed25519VerificationKey2020 verification method.
 */
function getEd25519VerificationKey2020({ key, id, controller }) {
    return new VerificationMethod_1.VerificationMethod({
        id,
        type: exports.VERIFICATION_METHOD_TYPE_ED25519_VERIFICATION_KEY_2020,
        controller,
        publicKeyMultibase: key.fingerprint,
    });
}
exports.getEd25519VerificationKey2020 = getEd25519VerificationKey2020;
/**
 * Check whether a verification method is a Ed25519VerificationKey2020 verification method.
 */
function isEd25519VerificationKey2020(verificationMethod) {
    return verificationMethod.type === exports.VERIFICATION_METHOD_TYPE_ED25519_VERIFICATION_KEY_2020;
}
exports.isEd25519VerificationKey2020 = isEd25519VerificationKey2020;
/**
 * Get a key from a Ed25519VerificationKey2020 verification method.
 */
function getKeyFromEd25519VerificationKey2020(verificationMethod) {
    if (!verificationMethod.publicKeyMultibase) {
        throw new error_1.CredoError('verification method is missing publicKeyMultibase');
    }
    const key = Key_1.Key.fromFingerprint(verificationMethod.publicKeyMultibase);
    if (key.keyType !== crypto_1.KeyType.Ed25519) {
        throw new error_1.CredoError(`Verification method publicKeyMultibase is for unexpected key type ${key.keyType}`);
    }
    return key;
}
exports.getKeyFromEd25519VerificationKey2020 = getKeyFromEd25519VerificationKey2020;
//# sourceMappingURL=Ed25519VerificationKey2020.js.map