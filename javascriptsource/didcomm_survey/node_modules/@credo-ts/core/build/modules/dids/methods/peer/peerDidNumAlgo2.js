"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.outOfBandServiceToInlineKeysNumAlgo2Did = exports.outOfBandServiceToNumAlgo2Did = exports.didDocumentToNumAlgo2Did = exports.didToNumAlgo2DidDocument = void 0;
const Key_1 = require("../../../../crypto/Key");
const error_1 = require("../../../../error");
const utils_1 = require("../../../../utils");
const domain_1 = require("../../domain");
const DidDocumentBuilder_1 = require("../../domain/DidDocumentBuilder");
const key_type_1 = require("../../domain/key-type");
const parse_1 = require("../../domain/parse");
const helpers_1 = require("../../helpers");
const key_1 = require("../key");
const createPeerDidDocumentFromServices_1 = require("./createPeerDidDocumentFromServices");
var DidPeerPurpose;
(function (DidPeerPurpose) {
    DidPeerPurpose["Assertion"] = "A";
    DidPeerPurpose["Encryption"] = "E";
    DidPeerPurpose["Verification"] = "V";
    DidPeerPurpose["CapabilityInvocation"] = "I";
    DidPeerPurpose["CapabilityDelegation"] = "D";
    DidPeerPurpose["Service"] = "S";
})(DidPeerPurpose || (DidPeerPurpose = {}));
function isDidPeerKeyPurpose(purpose) {
    return purpose !== DidPeerPurpose.Service && Object.values(DidPeerPurpose).includes(purpose);
}
const didPeerAbbreviations = {
    type: 't',
    DIDCommMessaging: 'dm',
    serviceEndpoint: 's',
    routingKeys: 'r',
    accept: 'a',
};
const didPeerExpansions = {
    t: 'type',
    dm: 'DIDCommMessaging',
    s: 'serviceEndpoint',
    r: 'routingKeys',
    a: 'accept',
};
function didToNumAlgo2DidDocument(did) {
    const parsed = (0, parse_1.parseDid)(did);
    const identifierWithoutNumAlgo = parsed.id.substring(2);
    // Get a list of all did document entries splitted by .
    const entries = identifierWithoutNumAlgo.split('.');
    const didDocument = new DidDocumentBuilder_1.DidDocumentBuilder(did);
    let serviceIndex = 0;
    let keyIndex = 1;
    for (const entry of entries) {
        // Remove the purpose identifier to get the service or key content
        const entryContent = entry.substring(1);
        // Get the purpose identifier
        const purpose = entry[0];
        // Handle service entry first
        if (purpose === DidPeerPurpose.Service) {
            let services = utils_1.JsonEncoder.fromBase64(entryContent);
            // Make sure we have an array of services (can be both json or array)
            services = Array.isArray(services) ? services : [services];
            for (let service of services) {
                // Expand abbreviations used for service key/values
                service = expandServiceAbbreviations(service);
                service.id = `${did}#${service.type.toLowerCase()}-${serviceIndex++}`;
                didDocument.addService(utils_1.JsonTransformer.fromJSON(service, domain_1.DidDocumentService));
            }
        }
        // Otherwise we can be sure it is a key
        else {
            // Decode the fingerprint, and extract the verification method(s)
            const key = Key_1.Key.fromFingerprint(entryContent);
            const { getVerificationMethods } = (0, key_type_1.getKeyDidMappingByKeyType)(key.keyType);
            const verificationMethods = getVerificationMethods(did, key);
            // Add all verification methods to the did document
            for (const verificationMethod of verificationMethods) {
                verificationMethod.id = `${did}#key-${keyIndex++}`;
                addVerificationMethodToDidDocument(didDocument, verificationMethod, purpose);
            }
        }
    }
    return didDocument.build();
}
exports.didToNumAlgo2DidDocument = didToNumAlgo2DidDocument;
function didDocumentToNumAlgo2Did(didDocument) {
    const purposeMapping = {
        [DidPeerPurpose.Assertion]: didDocument.assertionMethod,
        [DidPeerPurpose.Encryption]: didDocument.keyAgreement,
        // FIXME: should verification be authentication or verificationMethod
        // verificationMethod is general so it doesn't make a lot of sense to add
        // it to the verificationMethod list
        [DidPeerPurpose.Verification]: didDocument.authentication,
        [DidPeerPurpose.CapabilityInvocation]: didDocument.capabilityInvocation,
        [DidPeerPurpose.CapabilityDelegation]: didDocument.capabilityDelegation,
    };
    let did = 'did:peer:2';
    const keys = [];
    for (const [purpose, entries] of Object.entries(purposeMapping)) {
        // Not all entries are required to be defined
        if (entries === undefined)
            continue;
        // Dereference all entries to full verification methods
        const dereferenced = entries.map((entry) => typeof entry === 'string' ? didDocument.dereferenceVerificationMethod(entry) : entry);
        // Transform all verification methods into a fingerprint (multibase, multicodec)
        dereferenced.forEach((entry) => {
            const key = (0, key_type_1.getKeyFromVerificationMethod)(entry);
            // Encode as '.PurposeFingerprint'
            const encoded = `.${purpose}${key.fingerprint}`;
            keys.push({ id: entry.id, encoded });
        });
    }
    const prefix = 'key-';
    if (!keys.every((key) => { var _a; return (_a = key.id.split('#')[1]) === null || _a === void 0 ? void 0 : _a.startsWith(prefix); })) {
        throw new error_1.CredoError('Ids for keys within DID Document for did:peer:2 creation must follow the pattern `#key-n`');
    }
    // Add all encoded keys ordered by their id (#key-1, #key-2, etc.)
    did += keys
        .sort((a, b) => {
        const aFragment = a.id.split('#')[1];
        const bFragment = b.id.split('#')[1];
        const aIndex = Number(aFragment.replace(prefix, ''));
        const bIndex = Number(bFragment.replace(prefix, ''));
        return aIndex - bIndex;
    })
        .map((key) => key.encoded)
        .join('');
    if (didDocument.service && didDocument.service.length > 0) {
        const abbreviatedServices = didDocument.service.map((service) => {
            // Transform to JSON, remove id property
            const serviceJson = utils_1.JsonTransformer.toJSON(service);
            delete serviceJson.id;
            return abbreviateServiceJson(serviceJson);
        });
        for (const abbreviatedService of abbreviatedServices) {
            const encodedService = utils_1.JsonEncoder.toBase64URL(abbreviatedService);
            did += `.${DidPeerPurpose.Service}${encodedService}`;
        }
    }
    return did;
}
exports.didDocumentToNumAlgo2Did = didDocumentToNumAlgo2Did;
function outOfBandServiceToNumAlgo2Did(service) {
    var _a, _b;
    const didDocument = (0, createPeerDidDocumentFromServices_1.createPeerDidDocumentFromServices)([
        {
            id: service.id,
            recipientKeys: service.recipientKeys.map(helpers_1.didKeyToInstanceOfKey),
            serviceEndpoint: service.serviceEndpoint,
            routingKeys: (_b = (_a = service.routingKeys) === null || _a === void 0 ? void 0 : _a.map(helpers_1.didKeyToInstanceOfKey)) !== null && _b !== void 0 ? _b : [],
        },
    ]);
    const did = didDocumentToNumAlgo2Did(didDocument);
    return did;
}
exports.outOfBandServiceToNumAlgo2Did = outOfBandServiceToNumAlgo2Did;
// This method is kept to support searching for existing connections created by
// credo-ts <= 0.5.1
// TODO: Remove in 0.6.0 (when ConnectionRecord.invitationDid will be migrated)
function outOfBandServiceToInlineKeysNumAlgo2Did(service) {
    var _a;
    const didDocument = new DidDocumentBuilder_1.DidDocumentBuilder('')
        .addService(new domain_1.DidCommV1Service({
        id: service.id,
        serviceEndpoint: service.serviceEndpoint,
        accept: service.accept,
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
    const did = didDocumentToNumAlgo2Did(didDocument);
    return did;
}
exports.outOfBandServiceToInlineKeysNumAlgo2Did = outOfBandServiceToInlineKeysNumAlgo2Did;
function expandServiceAbbreviations(service) {
    const expand = (abbreviated) => { var _a; return (_a = didPeerExpansions[abbreviated]) !== null && _a !== void 0 ? _a : abbreviated; };
    const fullService = Object.entries(service).reduce((serviceBody, [key, value]) => (Object.assign(Object.assign({}, serviceBody), { [expand(key)]: expand(value) })), {});
    return fullService;
}
function abbreviateServiceJson(service) {
    const abbreviate = (expanded) => { var _a; return (_a = didPeerAbbreviations[expanded]) !== null && _a !== void 0 ? _a : expanded; };
    const abbreviatedService = Object.entries(service).reduce((serviceBody, [key, value]) => (Object.assign(Object.assign({}, serviceBody), { [abbreviate(key)]: abbreviate(value) })), {});
    return abbreviatedService;
}
function addVerificationMethodToDidDocument(didDocument, verificationMethod, purpose) {
    const purposeMapping = {
        [DidPeerPurpose.Assertion]: didDocument.addAssertionMethod.bind(didDocument),
        [DidPeerPurpose.Encryption]: didDocument.addKeyAgreement.bind(didDocument),
        // FIXME: should verification be authentication or verificationMethod
        // verificationMethod is general so it doesn't make a lot of sense to add
        // it to the verificationMethod list
        [DidPeerPurpose.Verification]: didDocument.addAuthentication.bind(didDocument),
        [DidPeerPurpose.CapabilityInvocation]: didDocument.addCapabilityInvocation.bind(didDocument),
        [DidPeerPurpose.CapabilityDelegation]: didDocument.addCapabilityDelegation.bind(didDocument),
    };
    // Verify the purpose is a did peer key purpose (service excluded)
    if (isDidPeerKeyPurpose(purpose)) {
        const addVerificationMethod = purposeMapping[purpose];
        // Add the verification method based on the method from the mapping
        addVerificationMethod(verificationMethod);
    }
    else {
        throw new error_1.CredoError(`Unsupported peer did purpose '${purpose}'`);
    }
}
//# sourceMappingURL=peerDidNumAlgo2.js.map