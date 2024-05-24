"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DidCommDocumentService = void 0;
const crypto_1 = require("../../../crypto");
const plugins_1 = require("../../../plugins");
const dids_1 = require("../../dids");
const domain_1 = require("../../dids/domain");
const helpers_1 = require("../../dids/helpers");
const matchingEd25519Key_1 = require("../util/matchingEd25519Key");
let DidCommDocumentService = class DidCommDocumentService {
    constructor(didResolverService) {
        this.didResolverService = didResolverService;
    }
    async resolveServicesFromDid(agentContext, did) {
        var _a, _b;
        const didDocument = await this.didResolverService.resolveDidDocument(agentContext, did);
        const resolvedServices = [];
        // If did specifies a particular service, filter by its id
        const didCommServices = (0, domain_1.parseDid)(did).fragment
            ? didDocument.didCommServices.filter((service) => service.id === did)
            : didDocument.didCommServices;
        // FIXME: we currently retrieve did documents for all didcomm services in the did document, and we don't have caching
        // yet so this will re-trigger ledger resolves for each one. Should we only resolve the first service, then the second service, etc...?
        for (const didCommService of didCommServices) {
            if (didCommService.type === domain_1.IndyAgentService.type) {
                // IndyAgentService (DidComm v0) has keys encoded as raw publicKeyBase58 (verkeys)
                resolvedServices.push({
                    id: didCommService.id,
                    recipientKeys: didCommService.recipientKeys.map(helpers_1.verkeyToInstanceOfKey),
                    routingKeys: ((_a = didCommService.routingKeys) === null || _a === void 0 ? void 0 : _a.map(helpers_1.verkeyToInstanceOfKey)) || [],
                    serviceEndpoint: didCommService.serviceEndpoint,
                });
            }
            else if (didCommService.type === domain_1.DidCommV1Service.type) {
                // Resolve dids to DIDDocs to retrieve routingKeys
                const routingKeys = [];
                for (const routingKey of (_b = didCommService.routingKeys) !== null && _b !== void 0 ? _b : []) {
                    const routingDidDocument = await this.didResolverService.resolveDidDocument(agentContext, routingKey);
                    routingKeys.push((0, domain_1.getKeyFromVerificationMethod)(routingDidDocument.dereferenceKey(routingKey, ['authentication', 'keyAgreement'])));
                }
                // DidCommV1Service has keys encoded as key references
                // Dereference recipientKeys
                const recipientKeys = didCommService.recipientKeys.map((recipientKeyReference) => {
                    // FIXME: we allow authentication keys as historically ed25519 keys have been used in did documents
                    // for didcomm. In the future we should update this to only be allowed for IndyAgent and DidCommV1 services
                    // as didcomm v2 doesn't have this issue anymore
                    const key = (0, domain_1.getKeyFromVerificationMethod)(didDocument.dereferenceKey(recipientKeyReference, ['authentication', 'keyAgreement']));
                    // try to find a matching Ed25519 key (https://sovrin-foundation.github.io/sovrin/spec/did-method-spec-template.html#did-document-notes)
                    // FIXME: Now that indy-sdk is deprecated, we should look into the possiblty of using the X25519 key directly
                    // removing the need to also include the Ed25519 key in the did document.
                    if (key.keyType === crypto_1.KeyType.X25519) {
                        const matchingEd25519Key = (0, matchingEd25519Key_1.findMatchingEd25519Key)(key, didDocument);
                        if (matchingEd25519Key)
                            return matchingEd25519Key;
                    }
                    return key;
                });
                resolvedServices.push({
                    id: didCommService.id,
                    recipientKeys,
                    routingKeys,
                    serviceEndpoint: didCommService.serviceEndpoint,
                });
            }
        }
        return resolvedServices;
    }
};
DidCommDocumentService = __decorate([
    (0, plugins_1.injectable)(),
    __metadata("design:paramtypes", [dids_1.DidResolverService])
], DidCommDocumentService);
exports.DidCommDocumentService = DidCommDocumentService;
//# sourceMappingURL=DidCommDocumentService.js.map