import type { WalletCreateKeyOptions } from './Wallet';
import type { WalletConfig, WalletConfigRekey, WalletExportImportConfig } from '../types';
import { AgentContext } from '../agent';
import { Logger } from '../logger';
import { StorageUpdateService } from '../storage';
export declare class WalletApi {
    private agentContext;
    private wallet;
    private storageUpdateService;
    private logger;
    private _walletConfig?;
    constructor(storageUpdateService: StorageUpdateService, agentContext: AgentContext, logger: Logger);
    get isInitialized(): boolean;
    get isProvisioned(): boolean;
    get walletConfig(): WalletConfig | undefined;
    initialize(walletConfig: WalletConfig): Promise<void>;
    createAndOpen(walletConfig: WalletConfig): Promise<void>;
    create(walletConfig: WalletConfig): Promise<void>;
    open(walletConfig: WalletConfig): Promise<void>;
    close(): Promise<void>;
    rotateKey(walletConfig: WalletConfigRekey): Promise<void>;
    generateNonce(): Promise<string>;
    delete(): Promise<void>;
    export(exportConfig: WalletExportImportConfig): Promise<void>;
    import(walletConfig: WalletConfig, importConfig: WalletExportImportConfig): Promise<void>;
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
    createKey(options: WalletCreateKeyOptions): Promise<import("..").Key>;
}
