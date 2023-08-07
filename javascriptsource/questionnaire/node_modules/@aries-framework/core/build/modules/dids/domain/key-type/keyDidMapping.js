"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSupportedVerificationMethodTypesFromKeyType = exports.getKeyFromVerificationMethod = exports.getKeyDidMappingByKeyType = void 0;
const KeyType_1 = require("../../../../crypto/KeyType");
const jwk_1 = require("../../../../crypto/jose/jwk");
const error_1 = require("../../../../error");
const JsonWebKey2020_1 = require("../verificationMethod/JsonWebKey2020");
const bls12381g1_1 = require("./bls12381g1");
const bls12381g1g2_1 = require("./bls12381g1g2");
const bls12381g2_1 = require("./bls12381g2");
const ed25519_1 = require("./ed25519");
const keyDidJsonWebKey_1 = require("./keyDidJsonWebKey");
const x25519_1 = require("./x25519");
// TODO: Maybe we should make this dynamically?
const keyDidMapping = {
    [KeyType_1.KeyType.Ed25519]: ed25519_1.keyDidEd25519,
    [KeyType_1.KeyType.X25519]: x25519_1.keyDidX25519,
    [KeyType_1.KeyType.Bls12381g1]: bls12381g1_1.keyDidBls12381g1,
    [KeyType_1.KeyType.Bls12381g2]: bls12381g2_1.keyDidBls12381g2,
    [KeyType_1.KeyType.Bls12381g1g2]: bls12381g1g2_1.keyDidBls12381g1g2,
    [KeyType_1.KeyType.P256]: keyDidJsonWebKey_1.keyDidJsonWebKey,
    [KeyType_1.KeyType.P384]: keyDidJsonWebKey_1.keyDidJsonWebKey,
    [KeyType_1.KeyType.P521]: keyDidJsonWebKey_1.keyDidJsonWebKey,
};
/**
 * Dynamically creates a mapping from verification method key type to the key Did interface
 * for all key types.
 *
 * {
 *    "Ed25519VerificationKey2018": KeyDidMapping
 * }
 */
const verificationMethodKeyDidMapping = Object.values(KeyType_1.KeyType).reduce((mapping, keyType) => {
    const supported = keyDidMapping[keyType].supportedVerificationMethodTypes.reduce((accumulator, vMethodKeyType) => (Object.assign(Object.assign({}, accumulator), { [vMethodKeyType]: keyDidMapping[keyType] })), {});
    return Object.assign(Object.assign({}, mapping), supported);
}, {});
function getKeyDidMappingByKeyType(keyType) {
    const keyDid = keyDidMapping[keyType];
    if (!keyDid) {
        throw new error_1.AriesFrameworkError(`Unsupported key did from key type '${keyType}'`);
    }
    return keyDid;
}
exports.getKeyDidMappingByKeyType = getKeyDidMappingByKeyType;
function getKeyFromVerificationMethod(verificationMethod) {
    // This is a special verification method, as it supports basically all key types.
    if ((0, JsonWebKey2020_1.isJsonWebKey2020)(verificationMethod)) {
        // TODO: move this validation to another place
        if (!verificationMethod.publicKeyJwk) {
            throw new error_1.AriesFrameworkError(`Missing publicKeyJwk on verification method with type ${JsonWebKey2020_1.VERIFICATION_METHOD_TYPE_JSON_WEB_KEY_2020}`);
        }
        return (0, jwk_1.getJwkFromJson)(verificationMethod.publicKeyJwk).key;
    }
    const keyDid = verificationMethodKeyDidMapping[verificationMethod.type];
    if (!keyDid) {
        throw new error_1.AriesFrameworkError(`Unsupported key did from verification method type '${verificationMethod.type}'`);
    }
    return keyDid.getKeyFromVerificationMethod(verificationMethod);
}
exports.getKeyFromVerificationMethod = getKeyFromVerificationMethod;
function getSupportedVerificationMethodTypesFromKeyType(keyType) {
    const keyDid = keyDidMapping[keyType];
    if (!keyDid) {
        throw new error_1.AriesFrameworkError(`Unsupported key did from key type '${keyType}'`);
    }
    return keyDid.supportedVerificationMethodTypes;
}
exports.getSupportedVerificationMethodTypesFromKeyType = getSupportedVerificationMethodTypesFromKeyType;
//# sourceMappingURL=keyDidMapping.js.map