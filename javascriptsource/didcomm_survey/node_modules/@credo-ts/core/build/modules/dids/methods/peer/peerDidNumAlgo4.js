"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.outOfBandServiceToNumAlgo4Did = exports.didDocumentToNumAlgo4Did = exports.didToNumAlgo4DidDocument = exports.getAlternativeDidsForNumAlgo4Did = exports.isLongFormDidPeer4 = exports.isShortFormDidPeer4 = void 0;
const error_1 = require("../../../../error");
const utils_1 = require("../../../../utils");
const buffer_1 = require("../../../../utils/buffer");
const domain_1 = require("../../domain");
const DidDocumentBuilder_1 = require("../../domain/DidDocumentBuilder");
const parse_1 = require("../../domain/parse");
const key_1 = require("../key");
const LONG_RE = new RegExp(`^did:peer:4(z[1-9a-km-zA-HJ-NP-Z]{46}):(z[1-9a-km-zA-HJ-NP-Z]{6,})$`);
const SHORT_RE = new RegExp(`^did:peer:4(z[1-9a-km-zA-HJ-NP-Z]{46})$`);
const JSON_MULTICODEC_VARINT = 0x0200;
const isShortFormDidPeer4 = (did) => SHORT_RE.test(did);
exports.isShortFormDidPeer4 = isShortFormDidPeer4;
const isLongFormDidPeer4 = (did) => LONG_RE.test(did);
exports.isLongFormDidPeer4 = isLongFormDidPeer4;
const hashEncodedDocument = (encodedDocument) => utils_1.MultiBaseEncoder.encode(utils_1.MultiHashEncoder.encode(utils_1.TypedArrayEncoder.fromString(encodedDocument), 'sha-256'), 'base58btc');
function getAlternativeDidsForNumAlgo4Did(did) {
    const match = did.match(LONG_RE);
    if (!match)
        return;
    const [, hash] = match;
    return [`did:peer:4${hash}`];
}
exports.getAlternativeDidsForNumAlgo4Did = getAlternativeDidsForNumAlgo4Did;
function didToNumAlgo4DidDocument(did) {
    const parsed = (0, parse_1.parseDid)(did);
    const match = parsed.did.match(LONG_RE);
    if (!match) {
        throw new error_1.CredoError(`Invalid long form algo 4 did:peer: ${parsed.did}`);
    }
    const [, hash, encodedDocument] = match;
    if (hash !== hashEncodedDocument(encodedDocument)) {
        throw new error_1.CredoError(`Hash is invalid for did: ${did}`);
    }
    const { data } = utils_1.MultiBaseEncoder.decode(encodedDocument);
    const [multiCodecValue] = utils_1.VarintEncoder.decode(data.subarray(0, 2));
    if (multiCodecValue !== JSON_MULTICODEC_VARINT) {
        throw new error_1.CredoError(`Not a JSON multicodec data`);
    }
    const didDocumentJson = utils_1.JsonEncoder.fromBuffer(data.subarray(2));
    didDocumentJson.id = parsed.did;
    didDocumentJson.alsoKnownAs = [parsed.did.slice(0, did.lastIndexOf(':'))];
    // Populate all verification methods without controller
    const addControllerIfNotPresent = (item) => {
        if (Array.isArray(item))
            item.forEach(addControllerIfNotPresent);
        if (item && typeof item === 'object' && item.controller === undefined) {
            ;
            item.controller = parsed.did;
        }
    };
    addControllerIfNotPresent(didDocumentJson.verificationMethod);
    addControllerIfNotPresent(didDocumentJson.authentication);
    addControllerIfNotPresent(didDocumentJson.assertionMethod);
    addControllerIfNotPresent(didDocumentJson.keyAgreement);
    addControllerIfNotPresent(didDocumentJson.capabilityDelegation);
    addControllerIfNotPresent(didDocumentJson.capabilityInvocation);
    const didDocument = utils_1.JsonTransformer.fromJSON(didDocumentJson, domain_1.DidDocument);
    return didDocument;
}
exports.didToNumAlgo4DidDocument = didToNumAlgo4DidDocument;
function didDocumentToNumAlgo4Did(didDocument) {
    const didDocumentJson = didDocument.toJSON();
    // Build input document based on did document, without any
    // reference to controller
    const deleteControllerIfPresent = (item) => {
        if (Array.isArray(item)) {
            item.forEach((method) => {
                if (method.controller === '#id' || method.controller === didDocument.id)
                    delete method.controller;
            });
        }
    };
    delete didDocumentJson.id;
    delete didDocumentJson.alsoKnownAs;
    deleteControllerIfPresent(didDocumentJson.verificationMethod);
    deleteControllerIfPresent(didDocumentJson.authentication);
    deleteControllerIfPresent(didDocumentJson.assertionMethod);
    deleteControllerIfPresent(didDocumentJson.keyAgreement);
    deleteControllerIfPresent(didDocumentJson.capabilityDelegation);
    deleteControllerIfPresent(didDocumentJson.capabilityInvocation);
    // Construct encoded document by prefixing did document with multicodec prefix for JSON
    const buffer = buffer_1.Buffer.concat([
        utils_1.VarintEncoder.encode(JSON_MULTICODEC_VARINT),
        buffer_1.Buffer.from(JSON.stringify(didDocumentJson)),
    ]);
    const encodedDocument = utils_1.MultiBaseEncoder.encode(buffer, 'base58btc');
    const shortFormDid = `did:peer:4${hashEncodedDocument(encodedDocument)}`;
    const longFormDid = `${shortFormDid}:${encodedDocument}`;
    return { shortFormDid, longFormDid };
}
exports.didDocumentToNumAlgo4Did = didDocumentToNumAlgo4Did;
function outOfBandServiceToNumAlgo4Did(service) {
    var _a;
    // FIXME: add the key entries for the recipientKeys to the did document.
    const didDocument = new DidDocumentBuilder_1.DidDocumentBuilder('')
        .addService(new domain_1.DidCommV1Service({
        id: service.id,
        serviceEndpoint: service.serviceEndpoint,
        accept: service.accept,
        // FIXME: this should actually be local key references, not did:key:123#456 references
        recipientKeys: service.recipientKeys.map((recipientKey) => {
            const did = key_1.DidKey.fromDid(recipientKey);
            return `${did.did}#${did.key.fingerprint}`;
        }),
        // Map did:key:xxx to actual did:key:xxx#123
        routingKeys: (_a = service.routingKeys) === null || _a === void 0 ? void 0 : _a.map((routingKey) => {
            const did = key_1.DidKey.fromDid(routingKey);
            return `${did.did}#${did.key.fingerprint}`;
        }),
    }))
        .build();
    return didDocumentToNumAlgo4Did(didDocument);
}
exports.outOfBandServiceToNumAlgo4Did = outOfBandServiceToNumAlgo4Did;
//# sourceMappingURL=peerDidNumAlgo4.js.map