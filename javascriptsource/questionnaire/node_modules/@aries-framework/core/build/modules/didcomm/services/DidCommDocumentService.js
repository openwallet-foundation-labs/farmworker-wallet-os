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
const AgentConfig_1 = require("../../../agent/AgentConfig");
const crypto_1 = require("../../../crypto");
const plugins_1 = require("../../../plugins");
const dids_1 = require("../../dids");
const domain_1 = require("../../dids/domain");
const helpers_1 = require("../../dids/helpers");
const matchingEd25519Key_1 = require("../util/matchingEd25519Key");
let DidCommDocumentService = class DidCommDocumentService {
    constructor(agentConfig, didResolverService) {
        this.logger = agentConfig.logger;
        this.didResolverService = didResolverService;
    }
    async resolveServicesFromDid(agentContext, did) {
        var _a, _b;
        const didDocument = await this.didResolverService.resolveDidDocument(agentContext, did);
        const didCommServices = [];
        // FIXME: we currently retrieve did documents for all didcomm services in the did document, and we don't have caching
        // yet so this will re-trigger ledger resolves for each one. Should we only resolve the first service, then the second service, etc...?
        for (const didCommService of didDocument.didCommServices) {
            if (didCommService instanceof domain_1.IndyAgentService) {
                // IndyAgentService (DidComm v0) has keys encoded as raw publicKeyBase58 (verkeys)
                didCommServices.push({
                    id: didCommService.id,
                    recipientKeys: didCommService.recipientKeys.map(helpers_1.verkeyToInstanceOfKey),
                    routingKeys: ((_a = didCommService.routingKeys) === null || _a === void 0 ? void 0 : _a.map(helpers_1.verkeyToInstanceOfKey)) || [],
                    serviceEndpoint: didCommService.serviceEndpoint,
                });
            }
            else if (didCommService instanceof domain_1.DidCommV1Service) {
                // Resolve dids to DIDDocs to retrieve routingKeys
                const routingKeys = [];
                for (const routingKey of (_b = didCommService.routingKeys) !== null && _b !== void 0 ? _b : []) {
                    const routingDidDocument = await this.didResolverService.resolveDidDocument(agentContext, routingKey);
                    routingKeys.push((0, domain_1.keyReferenceToKey)(routingDidDocument, routingKey));
                }
                // DidCommV1Service has keys encoded as key references
                // Dereference recipientKeys
                const recipientKeys = didCommService.recipientKeys.map((recipientKeyReference) => {
                    const key = (0, domain_1.keyReferenceToKey)(didDocument, recipientKeyReference);
                    // try to find a matching Ed25519 key (https://sovrin-foundation.github.io/sovrin/spec/did-method-spec-template.html#did-document-notes)
                    if (key.keyType === crypto_1.KeyType.X25519) {
                        const matchingEd25519Key = (0, matchingEd25519Key_1.findMatchingEd25519Key)(key, didDocument);
                        if (matchingEd25519Key)
                            return matchingEd25519Key;
                    }
                    return key;
                });
                didCommServices.push({
                    id: didCommService.id,
                    recipientKeys,
                    routingKeys,
                    serviceEndpoint: didCommService.serviceEndpoint,
                });
            }
        }
        return didCommServices;
    }
};
DidCommDocumentService = __decorate([
    (0, plugins_1.injectable)(),
    __metadata("design:paramtypes", [AgentConfig_1.AgentConfig, dids_1.DidResolverService])
], DidCommDocumentService);
exports.DidCommDocumentService = DidCommDocumentService;
//# sourceMappingURL=DidCommDocumentService.js.map