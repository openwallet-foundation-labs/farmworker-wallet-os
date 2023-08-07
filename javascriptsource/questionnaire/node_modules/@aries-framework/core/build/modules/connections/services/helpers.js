"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToNewDidDocument = void 0;
const crypto_1 = require("../../../crypto");
const error_1 = require("../../../error");
const dids_1 = require("../../dids");
const peerDidNumAlgo1_1 = require("../../dids/methods/peer/peerDidNumAlgo1");
const models_1 = require("../models");
function convertToNewDidDocument(didDoc) {
    const didDocumentBuilder = new dids_1.DidDocumentBuilder('');
    const oldIdNewIdMapping = {};
    didDoc.authentication.forEach((auth) => {
        const { publicKey: pk } = auth;
        // did:peer did documents can only use referenced keys.
        if (pk.type === 'Ed25519VerificationKey2018' && pk.value) {
            const ed25519VerificationMethod = convertPublicKeyToVerificationMethod(pk);
            const oldKeyId = normalizeId(pk.id);
            oldIdNewIdMapping[oldKeyId] = ed25519VerificationMethod.id;
            didDocumentBuilder.addAuthentication(ed25519VerificationMethod.id);
            // Only the auth is embedded, we also need to add the key to the verificationMethod
            // for referenced authentication this should already be the case
            if (auth instanceof models_1.EmbeddedAuthentication) {
                didDocumentBuilder.addVerificationMethod(ed25519VerificationMethod);
            }
        }
    });
    didDoc.publicKey.forEach((pk) => {
        if (pk.type === 'Ed25519VerificationKey2018' && pk.value) {
            const ed25519VerificationMethod = convertPublicKeyToVerificationMethod(pk);
            const oldKeyId = normalizeId(pk.id);
            oldIdNewIdMapping[oldKeyId] = ed25519VerificationMethod.id;
            didDocumentBuilder.addVerificationMethod(ed25519VerificationMethod);
        }
    });
    didDoc.didCommServices.forEach((service) => {
        const serviceId = normalizeId(service.id);
        // For didcommv1, we need to replace the old id with the new ones
        if (service instanceof dids_1.DidCommV1Service) {
            const recipientKeys = service.recipientKeys.map((keyId) => {
                const oldKeyId = normalizeId(keyId);
                return oldIdNewIdMapping[oldKeyId];
            });
            service = new dids_1.DidCommV1Service({
                id: serviceId,
                recipientKeys,
                serviceEndpoint: service.serviceEndpoint,
                routingKeys: service.routingKeys,
                accept: service.accept,
                priority: service.priority,
            });
        }
        else if (service instanceof dids_1.IndyAgentService) {
            service = new dids_1.IndyAgentService({
                id: serviceId,
                recipientKeys: service.recipientKeys,
                serviceEndpoint: service.serviceEndpoint,
                routingKeys: service.routingKeys,
                priority: service.priority,
            });
        }
        didDocumentBuilder.addService(service);
    });
    const didDocument = didDocumentBuilder.build();
    const peerDid = (0, peerDidNumAlgo1_1.didDocumentJsonToNumAlgo1Did)(didDocument.toJSON());
    didDocument.id = peerDid;
    return didDocument;
}
exports.convertToNewDidDocument = convertToNewDidDocument;
function normalizeId(fullId) {
    // Some old dids use `;` as the delimiter for the id. If we can't find a `#`
    // and a `;` exists, we will parse everything after `;` as the id.
    if (!fullId.includes('#') && fullId.includes(';')) {
        const [, ...ids] = fullId.split(';');
        return `#${ids.join(';')}`;
    }
    const [, ...ids] = fullId.split('#');
    return `#${ids.length ? ids.join('#') : fullId}`;
}
function convertPublicKeyToVerificationMethod(publicKey) {
    if (!publicKey.value) {
        throw new error_1.AriesFrameworkError(`Public key ${publicKey.id} does not have value property`);
    }
    const publicKeyBase58 = publicKey.value;
    const ed25519Key = crypto_1.Key.fromPublicKeyBase58(publicKeyBase58, crypto_1.KeyType.Ed25519);
    return (0, dids_1.getEd25519VerificationKey2018)({
        id: `#${publicKeyBase58.slice(0, 8)}`,
        key: ed25519Key,
        controller: '#id',
    });
}
//# sourceMappingURL=helpers.js.map