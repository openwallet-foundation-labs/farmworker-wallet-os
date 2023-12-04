"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findMatchingEd25519Key = void 0;
const crypto_1 = require("../../../crypto");
const dids_1 = require("../../dids");
const ed25519_1 = require("../../dids/domain/key-type/ed25519");
/**
 * Tries to find a matching Ed25519 key to the supplied X25519 key
 * @param x25519Key X25519 key
 * @param didDocument Did document containing all the keys
 * @returns a matching Ed25519 key or `undefined` (if no matching key found)
 */
function findMatchingEd25519Key(x25519Key, didDocument) {
    var _a, _b, _c;
    if (x25519Key.keyType !== crypto_1.KeyType.X25519)
        return undefined;
    const verificationMethods = (_a = didDocument.verificationMethod) !== null && _a !== void 0 ? _a : [];
    const keyAgreements = (_b = didDocument.keyAgreement) !== null && _b !== void 0 ? _b : [];
    const authentications = (_c = didDocument.authentication) !== null && _c !== void 0 ? _c : [];
    const allKeyReferences = [
        ...verificationMethods,
        ...authentications.filter((keyAgreement) => typeof keyAgreement !== 'string'),
        ...keyAgreements.filter((keyAgreement) => typeof keyAgreement !== 'string'),
    ];
    return allKeyReferences
        .map((keyReference) => (0, dids_1.keyReferenceToKey)(didDocument, keyReference.id))
        .filter((key) => (key === null || key === void 0 ? void 0 : key.keyType) === crypto_1.KeyType.Ed25519)
        .find((keyEd25519) => {
        const keyX25519 = crypto_1.Key.fromPublicKey((0, ed25519_1.convertPublicKeyToX25519)(keyEd25519.publicKey), crypto_1.KeyType.X25519);
        return keyX25519.publicKeyBase58 === x25519Key.publicKeyBase58;
    });
}
exports.findMatchingEd25519Key = findMatchingEd25519Key;
//# sourceMappingURL=matchingEd25519Key.js.map