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
exports.DidsApi = void 0;
const agent_1 = require("../../agent");
const error_1 = require("../../error");
const plugins_1 = require("../../plugins");
const error_2 = require("../../wallet/error");
const DidsModuleConfig_1 = require("./DidsModuleConfig");
const methods_1 = require("./methods");
const repository_1 = require("./repository");
const services_1 = require("./services");
let DidsApi = class DidsApi {
    constructor(didResolverService, didRegistrarService, didRepository, agentContext, config) {
        this.didResolverService = didResolverService;
        this.didRegistrarService = didRegistrarService;
        this.didRepository = didRepository;
        this.agentContext = agentContext;
        this.config = config;
    }
    /**
     * Resolve a did to a did document.
     *
     * Follows the interface as defined in https://w3c-ccg.github.io/did-resolution/
     */
    resolve(didUrl, options) {
        return this.didResolverService.resolve(this.agentContext, didUrl, options);
    }
    /**
     * Create, register and store a did and did document.
     *
     * Follows the interface as defined in https://identity.foundation/did-registration
     */
    create(options) {
        return this.didRegistrarService.create(this.agentContext, options);
    }
    /**
     * Update an existing did document.
     *
     * Follows the interface as defined in https://identity.foundation/did-registration
     */
    update(options) {
        return this.didRegistrarService.update(this.agentContext, options);
    }
    /**
     * Deactivate an existing did.
     *
     * Follows the interface as defined in https://identity.foundation/did-registration
     */
    deactivate(options) {
        return this.didRegistrarService.deactivate(this.agentContext, options);
    }
    /**
     * Resolve a did to a did document. This won't return the associated metadata as defined
     * in the did resolution specification, and will throw an error if the did document could not
     * be resolved.
     */
    resolveDidDocument(didUrl) {
        return this.didResolverService.resolveDidDocument(this.agentContext, didUrl);
    }
    /**
     * Get a list of all dids created by the agent. This will return a list of {@link DidRecord} objects.
     * Each document will have an id property with the value of the did. Optionally, it will contain a did document,
     * but this is only for documents that can't be resolved from the did itself or remotely.
     *
     * You can call `${@link DidsModule.resolve} to resolve the did document based on the did itself.
     */
    getCreatedDids({ method, did } = {}) {
        return this.didRepository.getCreatedDids(this.agentContext, { method, did });
    }
    /**
     * Import an existing did that was created outside of the DidsApi. This will create a `DidRecord` for the did
     * and will allow the did to be used in other parts of the agent. If you need to create a new did document,
     * you can use the {@link DidsApi.create} method to create and register the did.
     *
     * If no `didDocument` is provided, the did document will be resolved using the did resolver. You can optionally provide a list
     * of private key buffer with the respective private key bytes. These keys will be stored in the wallet, and allows you to use the
     * did for other operations. Providing keys that already exist in the wallet is allowed, and those keys will be skipped from being
     * added to the wallet.
     *
     * By default, this method will throw an error if the did already exists in the wallet. You can override this behavior by setting
     * the `overwrite` option to `true`. This will update the did document in the record, and allows you to update the did over time.
     */
    async import({ did, didDocument, privateKeys = [], overwrite }) {
        if (didDocument && didDocument.id !== did) {
            throw new error_1.CredoError(`Did document id ${didDocument.id} does not match did ${did}`);
        }
        const existingDidRecord = await this.didRepository.findCreatedDid(this.agentContext, did);
        if (existingDidRecord && !overwrite) {
            throw new error_1.CredoError(`A created did ${did} already exists. If you want to override the existing did, set the 'overwrite' option to update the did.`);
        }
        if (!didDocument) {
            didDocument = await this.resolveDidDocument(did);
        }
        // Loop over all private keys and store them in the wallet. We don't check whether the keys are actually associated
        // with the did document, this is up to the user.
        for (const key of privateKeys) {
            try {
                // We can't check whether the key already exists in the wallet, but we can try to create it and catch the error
                // if the key already exists.
                await this.agentContext.wallet.createKey({
                    keyType: key.keyType,
                    privateKey: key.privateKey,
                });
            }
            catch (error) {
                if (error instanceof error_2.WalletKeyExistsError) {
                    // If the error is a WalletKeyExistsError, we can ignore it. This means the key
                    // already exists in the wallet. We don't want to throw an error in this case.
                }
                else {
                    throw error;
                }
            }
        }
        // Update existing did record
        if (existingDidRecord) {
            existingDidRecord.didDocument = didDocument;
            existingDidRecord.setTags({
                alternativeDids: (0, methods_1.isValidPeerDid)(didDocument.id) ? (0, methods_1.getAlternativeDidsForPeerDid)(did) : undefined,
            });
            await this.didRepository.update(this.agentContext, existingDidRecord);
            return;
        }
        // Create new did record
        await this.didRepository.storeCreatedDid(this.agentContext, {
            did,
            didDocument,
            tags: {
                alternativeDids: (0, methods_1.isValidPeerDid)(didDocument.id) ? (0, methods_1.getAlternativeDidsForPeerDid)(did) : undefined,
            },
        });
    }
    get supportedResolverMethods() {
        return this.didResolverService.supportedMethods;
    }
    get supportedRegistrarMethods() {
        return this.didRegistrarService.supportedMethods;
    }
};
DidsApi = __decorate([
    (0, plugins_1.injectable)(),
    __metadata("design:paramtypes", [services_1.DidResolverService,
        services_1.DidRegistrarService,
        repository_1.DidRepository,
        agent_1.AgentContext,
        DidsModuleConfig_1.DidsModuleConfig])
], DidsApi);
exports.DidsApi = DidsApi;
//# sourceMappingURL=DidsApi.js.map