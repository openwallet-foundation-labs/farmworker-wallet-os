"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getKeyFromX25519KeyAgreementKey2019 = exports.isX25519KeyAgreementKey2019 = exports.getX25519KeyAgreementKey2019 = exports.VERIFICATION_METHOD_TYPE_X25519_KEY_AGREEMENT_KEY_2019 = void 0;
const crypto_1 = require("../../../../crypto");
const Key_1 = require("../../../../crypto/Key");
const error_1 = require("../../../../error");
const VerificationMethod_1 = require("./VerificationMethod");
exports.VERIFICATION_METHOD_TYPE_X25519_KEY_AGREEMENT_KEY_2019 = 'X25519KeyAgreementKey2019';
/**
 * Get a X25519KeyAgreementKey2019 verification method.
 */
function getX25519KeyAgreementKey2019({ key, id, controller }) {
    return new VerificationMethod_1.VerificationMethod({
        id,
        type: exports.VERIFICATION_METHOD_TYPE_X25519_KEY_AGREEMENT_KEY_2019,
        controller,
        publicKeyBase58: key.publicKeyBase58,
    });
}
exports.getX25519KeyAgreementKey2019 = getX25519KeyAgreementKey2019;
/**
 * Check whether a verification method is a X25519KeyAgreementKey2019 verification method.
 */
function isX25519KeyAgreementKey2019(verificationMethod) {
    return verificationMethod.type === exports.VERIFICATION_METHOD_TYPE_X25519_KEY_AGREEMENT_KEY_2019;
}
exports.isX25519KeyAgreementKey2019 = isX25519KeyAgreementKey2019;
/**
 * Get a key from a X25519KeyAgreementKey2019 verification method.
 */
function getKeyFromX25519KeyAgreementKey2019(verificationMethod) {
    if (!verificationMethod.publicKeyBase58) {
        throw new error_1.AriesFrameworkError('verification method is missing publicKeyBase58');
    }
    return Key_1.Key.fromPublicKeyBase58(verificationMethod.publicKeyBase58, crypto_1.KeyType.X25519);
}
exports.getKeyFromX25519KeyAgreementKey2019 = getKeyFromX25519KeyAgreementKey2019;
//# sourceMappingURL=X25519KeyAgreementKey2019.js.map