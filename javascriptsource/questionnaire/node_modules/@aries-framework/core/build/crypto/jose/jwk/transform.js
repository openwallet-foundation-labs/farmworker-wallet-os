"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJwkClassFromKeyType = exports.getJwkClassFromJwaSignatureAlgorithm = exports.getJwkFromKey = exports.getJwkFromJson = void 0;
const KeyType_1 = require("../../KeyType");
const jwa_1 = require("../jwa");
const Ed25519Jwk_1 = require("./Ed25519Jwk");
const P256Jwk_1 = require("./P256Jwk");
const P384Jwk_1 = require("./P384Jwk");
const P521Jwk_1 = require("./P521Jwk");
const X25519Jwk_1 = require("./X25519Jwk");
const validate_1 = require("./validate");
const JwkClasses = [Ed25519Jwk_1.Ed25519Jwk, P256Jwk_1.P256Jwk, P384Jwk_1.P384Jwk, P521Jwk_1.P521Jwk, X25519Jwk_1.X25519Jwk];
function getJwkFromJson(jwkJson) {
    if (jwkJson.kty === jwa_1.JwaKeyType.OKP) {
        if ((0, validate_1.hasCrv)(jwkJson, jwa_1.JwaCurve.Ed25519))
            return Ed25519Jwk_1.Ed25519Jwk.fromJson(jwkJson);
        if ((0, validate_1.hasCrv)(jwkJson, jwa_1.JwaCurve.X25519))
            return X25519Jwk_1.X25519Jwk.fromJson(jwkJson);
    }
    if (jwkJson.kty === jwa_1.JwaKeyType.EC) {
        if ((0, validate_1.hasCrv)(jwkJson, jwa_1.JwaCurve.P256))
            return P256Jwk_1.P256Jwk.fromJson(jwkJson);
        if ((0, validate_1.hasCrv)(jwkJson, jwa_1.JwaCurve.P384))
            return P384Jwk_1.P384Jwk.fromJson(jwkJson);
        if ((0, validate_1.hasCrv)(jwkJson, jwa_1.JwaCurve.P521))
            return P521Jwk_1.P521Jwk.fromJson(jwkJson);
    }
    throw new Error(`Cannot create JWK from JSON. Unsupported JWK with kty '${jwkJson.kty}'.`);
}
exports.getJwkFromJson = getJwkFromJson;
function getJwkFromKey(key) {
    if (key.keyType === KeyType_1.KeyType.Ed25519)
        return Ed25519Jwk_1.Ed25519Jwk.fromPublicKey(key.publicKey);
    if (key.keyType === KeyType_1.KeyType.X25519)
        return X25519Jwk_1.X25519Jwk.fromPublicKey(key.publicKey);
    if (key.keyType === KeyType_1.KeyType.P256)
        return P256Jwk_1.P256Jwk.fromPublicKey(key.publicKey);
    if (key.keyType === KeyType_1.KeyType.P384)
        return P384Jwk_1.P384Jwk.fromPublicKey(key.publicKey);
    if (key.keyType === KeyType_1.KeyType.P521)
        return P521Jwk_1.P521Jwk.fromPublicKey(key.publicKey);
    throw new Error(`Cannot create JWK from key. Unsupported key with type '${key.keyType}'.`);
}
exports.getJwkFromKey = getJwkFromKey;
function getJwkClassFromJwaSignatureAlgorithm(alg) {
    return JwkClasses.find((jwkClass) => jwkClass.supportedSignatureAlgorithms.includes(alg));
}
exports.getJwkClassFromJwaSignatureAlgorithm = getJwkClassFromJwaSignatureAlgorithm;
function getJwkClassFromKeyType(keyType) {
    return JwkClasses.find((jwkClass) => jwkClass.keyType === keyType);
}
exports.getJwkClassFromKeyType = getJwkClassFromKeyType;
//# sourceMappingURL=transform.js.map