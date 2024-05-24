"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getKeyFromJsonWebKey2020 = exports.isJsonWebKey2020 = exports.getJsonWebKey2020 = exports.VERIFICATION_METHOD_TYPE_JSON_WEB_KEY_2020 = void 0;
const jwk_1 = require("../../../../crypto/jose/jwk");
const error_1 = require("../../../../error");
exports.VERIFICATION_METHOD_TYPE_JSON_WEB_KEY_2020 = 'JsonWebKey2020';
/**
 * Get a JsonWebKey2020 verification method.
 */
function getJsonWebKey2020({ did, key, jwk, verificationMethodId }) {
    if (!verificationMethodId) {
        const k = key !== null && key !== void 0 ? key : (0, jwk_1.getJwkFromJson)(jwk).key;
        verificationMethodId = `${did}#${k.fingerprint}`;
    }
    return {
        id: verificationMethodId,
        type: exports.VERIFICATION_METHOD_TYPE_JSON_WEB_KEY_2020,
        controller: did,
        publicKeyJwk: jwk !== null && jwk !== void 0 ? jwk : (0, jwk_1.getJwkFromKey)(key).toJson(),
    };
}
exports.getJsonWebKey2020 = getJsonWebKey2020;
/**
 * Check whether a verification method is a JsonWebKey2020 verification method.
 */
function isJsonWebKey2020(verificationMethod) {
    return verificationMethod.type === exports.VERIFICATION_METHOD_TYPE_JSON_WEB_KEY_2020;
}
exports.isJsonWebKey2020 = isJsonWebKey2020;
/**
 * Get a key from a JsonWebKey2020 verification method.
 */
function getKeyFromJsonWebKey2020(verificationMethod) {
    if (!verificationMethod.publicKeyJwk) {
        throw new error_1.CredoError(`Missing publicKeyJwk on verification method with type ${exports.VERIFICATION_METHOD_TYPE_JSON_WEB_KEY_2020}`);
    }
    return (0, jwk_1.getJwkFromJson)(verificationMethod.publicKeyJwk).key;
}
exports.getKeyFromJsonWebKey2020 = getKeyFromJsonWebKey2020;
//# sourceMappingURL=JsonWebKey2020.js.map