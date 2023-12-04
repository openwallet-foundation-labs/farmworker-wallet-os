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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletApi = void 0;
const agent_1 = require("../agent");
const constants_1 = require("../constants");
const plugins_1 = require("../plugins");
const storage_1 = require("../storage");
const updates_1 = require("../storage/migration/updates");
const WalletError_1 = require("./error/WalletError");
const WalletNotFoundError_1 = require("./error/WalletNotFoundError");
let WalletApi = class WalletApi {
    constructor(storageUpdateService, agentContext, logger) {
        this.storageUpdateService = storageUpdateService;
        this.logger = logger;
        this.wallet = agentContext.wallet;
        this.agentContext = agentContext;
    }
    get isInitialized() {
        return this.wallet.isInitialized;
    }
    get isProvisioned() {
        return this.wallet.isProvisioned;
    }
    get walletConfig() {
        return this._walletConfig;
    }
    async initialize(walletConfig) {
        var _a;
        this.logger.info(`Initializing wallet '${walletConfig.id}'`, Object.assign(Object.assign({}, walletConfig), { key: (walletConfig === null || walletConfig === void 0 ? void 0 : walletConfig.key) ? '[*****]' : undefined, storage: Object.assign(Object.assign({}, walletConfig === null || walletConfig === void 0 ? void 0 : walletConfig.storage), { credentials: ((_a = walletConfig === null || walletConfig === void 0 ? void 0 : walletConfig.storage) === null || _a === void 0 ? void 0 : _a.credentials) ? '[*****]' : undefined }) }));
        if (this.isInitialized) {
            throw new WalletError_1.WalletError('Wallet instance already initialized. Close the currently opened wallet before re-initializing the wallet');
        }
        // Open wallet, creating if it doesn't exist yet
        try {
            await this.open(walletConfig);
        }
        catch (error) {
            // If the wallet does not exist yet, create it and try to open again
            if (error instanceof WalletNotFoundError_1.WalletNotFoundError) {
                // Keep the wallet open after creating it, this saves an extra round trip of closing/opening
                // the wallet, which can save quite some time.
                await this.createAndOpen(walletConfig);
            }
            else {
                throw error;
            }
        }
    }
    async createAndOpen(walletConfig) {
        // Always keep the wallet open, as we still need to store the storage version in the wallet.
        await this.wallet.createAndOpen(walletConfig);
        this._walletConfig = walletConfig;
        // Store the storage version in the wallet
        await this.storageUpdateService.setCurrentStorageVersion(this.agentContext, updates_1.CURRENT_FRAMEWORK_STORAGE_VERSION);
    }
    async create(walletConfig) {
        await this.createAndOpen(walletConfig);
        await this.close();
    }
    async open(walletConfig) {
        await this.wallet.open(walletConfig);
        this._walletConfig = walletConfig;
    }
    async close() {
        await this.wallet.close();
    }
    async rotateKey(walletConfig) {
        await this.wallet.rotateKey(walletConfig);
    }
    async generateNonce() {
        return await this.wallet.generateNonce();
    }
    async delete() {
        await this.wallet.delete();
    }
    async export(exportConfig) {
        await this.wallet.export(exportConfig);
    }
    async import(walletConfig, importConfig) {
        await this.wallet.import(walletConfig, importConfig);
    }
    /**
     * Create a key for and store it in the wallet. You can optionally provide a `privateKey`
     * or `seed` for deterministic key generation.
     *
     * @param privateKey Buffer Private key (formerly called 'seed')
     * @param seed Buffer  (formerly called 'seed')
     * @param keyType KeyType the type of key that should be created
     *
     * @returns a `Key` instance
     *
     * @throws {WalletError} When an unsupported `KeyType` is provided
     * @throws {WalletError} When the key could not be created
     */
    async createKey(options) {
        return this.wallet.createKey(options);
    }
};
WalletApi = __decorate([
    (0, plugins_1.injectable)(),
    __param(2, (0, plugins_1.inject)(constants_1.InjectionSymbols.Logger)),
    __metadata("design:paramtypes", [storage_1.StorageUpdateService,
        agent_1.AgentContext, Object])
], WalletApi);
exports.WalletApi = WalletApi;
//# sourceMappingURL=WalletApi.js.map