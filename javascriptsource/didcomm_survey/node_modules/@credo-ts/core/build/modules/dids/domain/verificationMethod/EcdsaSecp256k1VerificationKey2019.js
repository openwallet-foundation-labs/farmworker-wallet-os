"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getKeyFromEcdsaSecp256k1VerificationKey2019 = exports.isEcdsaSecp256k1VerificationKey2019 = exports.getEcdsaSecp256k1VerificationKey2019 = exports.VERIFICATION_METHOD_TYPE_ECDSA_SECP256K1_VERIFICATION_KEY_2019 = void 0;
const crypto_1 = require("../../../../crypto");
const Key_1 = require("../../../../crypto/Key");
const error_1 = require("../../../../error");
const VerificationMethod_1 = require("./VerificationMethod");
exports.VERIFICATION_METHOD_TYPE_ECDSA_SECP256K1_VERIFICATION_KEY_2019 = 'EcdsaSecp256k1VerificationKey2019';
/**
 * Get a EcdsaSecp256k1VerificationKey2019 verification method.
 */
function getEcdsaSecp256k1VerificationKey2019({ key, id, controller, }) {
    return new VerificationMethod_1.VerificationMethod({
        id,
        type: exports.VERIFICATION_METHOD_TYPE_ECDSA_SECP256K1_VERIFICATION_KEY_2019,
        controller,
        publicKeyBase58: key.publicKeyBase58,
    });
}
exports.getEcdsaSecp256k1VerificationKey2019 = getEcdsaSecp256k1VerificationKey2019;
/**
 * Check whether a verification method is a EcdsaSecp256k1VerificationKey2019 verification method.
 */
function isEcdsaSecp256k1VerificationKey2019(verificationMethod) {
    return verificationMethod.type === exports.VERIFICATION_METHOD_TYPE_ECDSA_SECP256K1_VERIFICATION_KEY_2019;
}
exports.isEcdsaSecp256k1VerificationKey2019 = isEcdsaSecp256k1VerificationKey2019;
/**
 * Get a key from a EcdsaSecp256k1VerificationKey2019 verification method.
 */
function getKeyFromEcdsaSecp256k1VerificationKey2019(verificationMethod) {
    if (!verificationMethod.publicKeyBase58) {
        throw new error_1.CredoError('verification method is missing publicKeyBase58');
    }
    return Key_1.Key.fromPublicKeyBase58(verificationMethod.publicKeyBase58, crypto_1.KeyType.K256);
}
exports.getKeyFromEcdsaSecp256k1VerificationKey2019 = getKeyFromEcdsaSecp256k1VerificationKey2019;
//# sourceMappingURL=EcdsaSecp256k1VerificationKey2019.js.map