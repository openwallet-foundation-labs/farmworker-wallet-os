"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJsonWebKey2020DidDocument = exports.getDidDocumentForKey = void 0;
const Key_1 = require("../../../crypto/Key");
const KeyType_1 = require("../../../crypto/KeyType");
const error_1 = require("../../../error");
const constants_1 = require("../../vc/constants");
const constants_2 = require("../../vc/data-integrity/signature-suites/ed25519/constants");
const DidDocumentBuilder_1 = require("./DidDocumentBuilder");
const key_type_1 = require("./key-type");
const ed25519_1 = require("./key-type/ed25519");
const verificationMethod_1 = require("./verificationMethod");
const didDocumentKeyTypeMapping = {
    [KeyType_1.KeyType.Ed25519]: getEd25519DidDoc,
    [KeyType_1.KeyType.X25519]: getX25519DidDoc,
    [KeyType_1.KeyType.Bls12381g1]: getBls12381g1DidDoc,
    [KeyType_1.KeyType.Bls12381g2]: getBls12381g2DidDoc,
    [KeyType_1.KeyType.Bls12381g1g2]: getBls12381g1g2DidDoc,
    [KeyType_1.KeyType.P256]: getJsonWebKey2020DidDocument,
    [KeyType_1.KeyType.P384]: getJsonWebKey2020DidDocument,
    [KeyType_1.KeyType.P521]: getJsonWebKey2020DidDocument,
};
function getDidDocumentForKey(did, key) {
    const getDidDocument = didDocumentKeyTypeMapping[key.keyType];
    return getDidDocument(did, key);
}
exports.getDidDocumentForKey = getDidDocumentForKey;
function getBls12381g1DidDoc(did, key) {
    const verificationMethod = (0, verificationMethod_1.getBls12381G1Key2020)({ id: `${did}#${key.fingerprint}`, key, controller: did });
    return getSignatureKeyBase({
        did,
        key,
        verificationMethod,
    })
        .addContext(constants_1.SECURITY_CONTEXT_BBS_URL)
        .build();
}
function getBls12381g1g2DidDoc(did, key) {
    const verificationMethods = (0, key_type_1.getBls12381g1g2VerificationMethod)(did, key);
    const didDocumentBuilder = new DidDocumentBuilder_1.DidDocumentBuilder(did);
    for (const verificationMethod of verificationMethods) {
        didDocumentBuilder
            .addVerificationMethod(verificationMethod)
            .addAuthentication(verificationMethod.id)
            .addAssertionMethod(verificationMethod.id)
            .addCapabilityDelegation(verificationMethod.id)
            .addCapabilityInvocation(verificationMethod.id);
    }
    return didDocumentBuilder.addContext(constants_1.SECURITY_CONTEXT_BBS_URL).build();
}
function getJsonWebKey2020DidDocument(did, key) {
    const verificationMethod = (0, verificationMethod_1.getJsonWebKey2020)({ did, key });
    const didDocumentBuilder = new DidDocumentBuilder_1.DidDocumentBuilder(did);
    didDocumentBuilder.addContext(constants_1.SECURITY_JWS_CONTEXT_URL).addVerificationMethod(verificationMethod);
    if (!key.supportsEncrypting && !key.supportsSigning) {
        throw new error_1.AriesFrameworkError('Key must support at least signing or encrypting');
    }
    if (key.supportsSigning) {
        didDocumentBuilder
            .addAuthentication(verificationMethod.id)
            .addAssertionMethod(verificationMethod.id)
            .addCapabilityDelegation(verificationMethod.id)
            .addCapabilityInvocation(verificationMethod.id);
    }
    if (key.supportsEncrypting) {
        didDocumentBuilder.addKeyAgreement(verificationMethod.id);
    }
    return didDocumentBuilder.build();
}
exports.getJsonWebKey2020DidDocument = getJsonWebKey2020DidDocument;
function getEd25519DidDoc(did, key) {
    const verificationMethod = (0, verificationMethod_1.getEd25519VerificationKey2018)({ id: `${did}#${key.fingerprint}`, key, controller: did });
    const publicKeyX25519 = (0, ed25519_1.convertPublicKeyToX25519)(key.publicKey);
    const didKeyX25519 = Key_1.Key.fromPublicKey(publicKeyX25519, KeyType_1.KeyType.X25519);
    const x25519VerificationMethod = (0, verificationMethod_1.getX25519KeyAgreementKey2019)({
        id: `${did}#${didKeyX25519.fingerprint}`,
        key: didKeyX25519,
        controller: did,
    });
    const didDocBuilder = getSignatureKeyBase({ did, key, verificationMethod });
    didDocBuilder
        .addContext(constants_2.ED25519_SUITE_CONTEXT_URL_2018)
        .addContext(constants_1.SECURITY_X25519_CONTEXT_URL)
        .addKeyAgreement(x25519VerificationMethod);
    return didDocBuilder.build();
}
function getX25519DidDoc(did, key) {
    const verificationMethod = (0, verificationMethod_1.getX25519KeyAgreementKey2019)({ id: `${did}#${key.fingerprint}`, key, controller: did });
    const document = new DidDocumentBuilder_1.DidDocumentBuilder(did)
        .addKeyAgreement(verificationMethod)
        .addContext(constants_1.SECURITY_X25519_CONTEXT_URL)
        .build();
    return document;
}
function getBls12381g2DidDoc(did, key) {
    const verificationMethod = (0, verificationMethod_1.getBls12381G2Key2020)({ id: `${did}#${key.fingerprint}`, key, controller: did });
    return getSignatureKeyBase({
        did,
        key,
        verificationMethod,
    })
        .addContext(constants_1.SECURITY_CONTEXT_BBS_URL)
        .build();
}
function getSignatureKeyBase({ did, key, verificationMethod, }) {
    const keyId = `${did}#${key.fingerprint}`;
    return new DidDocumentBuilder_1.DidDocumentBuilder(did)
        .addVerificationMethod(verificationMethod)
        .addAuthentication(keyId)
        .addAssertionMethod(keyId)
        .addCapabilityDelegation(keyId)
        .addCapabilityInvocation(keyId);
}
//# sourceMappingURL=keyDidDocument.js.map