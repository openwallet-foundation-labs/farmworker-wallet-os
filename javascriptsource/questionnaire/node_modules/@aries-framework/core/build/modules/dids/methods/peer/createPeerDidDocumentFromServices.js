"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPeerDidDocumentFromServices = void 0;
const ed25519_1 = require("@stablelib/ed25519");
const Key_1 = require("../../../../crypto/Key");
const KeyType_1 = require("../../../../crypto/KeyType");
const error_1 = require("../../../../error");
const uuid_1 = require("../../../../utils/uuid");
const domain_1 = require("../../domain");
const DidDocumentBuilder_1 = require("../../domain/DidDocumentBuilder");
const DidCommV1Service_1 = require("../../domain/service/DidCommV1Service");
const key_1 = require("../key");
function createPeerDidDocumentFromServices(services) {
    const didDocumentBuilder = new DidDocumentBuilder_1.DidDocumentBuilder('');
    // Keep track off all added key id based on the fingerprint so we can add them to the recipientKeys as references
    const recipientKeyIdMapping = {};
    services.forEach((service, index) => {
        var _a;
        // Get the local key reference for each of the recipient keys
        const recipientKeys = service.recipientKeys.map((recipientKey) => {
            // Key already added to the did document
            if (recipientKeyIdMapping[recipientKey.fingerprint])
                return recipientKeyIdMapping[recipientKey.fingerprint];
            if (recipientKey.keyType !== KeyType_1.KeyType.Ed25519) {
                throw new error_1.AriesFrameworkError(`Unable to create did document from services. recipient key type ${recipientKey.keyType} is not supported. Supported key types are ${KeyType_1.KeyType.Ed25519}`);
            }
            const x25519Key = Key_1.Key.fromPublicKey((0, ed25519_1.convertPublicKeyToX25519)(recipientKey.publicKey), KeyType_1.KeyType.X25519);
            const ed25519VerificationMethod = (0, domain_1.getEd25519VerificationKey2018)({
                id: `#${(0, uuid_1.uuid)()}`,
                key: recipientKey,
                controller: '#id',
            });
            const x25519VerificationMethod = (0, domain_1.getX25519KeyAgreementKey2019)({
                id: `#${(0, uuid_1.uuid)()}`,
                key: x25519Key,
                controller: '#id',
            });
            recipientKeyIdMapping[recipientKey.fingerprint] = ed25519VerificationMethod.id;
            // We should not add duplicated keys for services
            didDocumentBuilder.addAuthentication(ed25519VerificationMethod).addKeyAgreement(x25519VerificationMethod);
            return recipientKeyIdMapping[recipientKey.fingerprint];
        });
        // Transform all routing keys into did:key:xxx#key-id references. This will probably change for didcomm v2
        const routingKeys = (_a = service.routingKeys) === null || _a === void 0 ? void 0 : _a.map((key) => {
            const didKey = new key_1.DidKey(key);
            return `${didKey.did}#${key.fingerprint}`;
        });
        didDocumentBuilder.addService(new DidCommV1Service_1.DidCommV1Service({
            id: service.id,
            priority: index,
            serviceEndpoint: service.serviceEndpoint,
            recipientKeys,
            routingKeys,
        }));
    });
    return didDocumentBuilder.build();
}
exports.createPeerDidDocumentFromServices = createPeerDidDocumentFromServices;
//# sourceMappingURL=createPeerDidDocumentFromServices.js.map