import type { AgentDependencies } from './AgentDependencies';
import type { Logger } from '../logger';
import type { InitConfig } from '../types';
import { LogLevel } from '../logger';
import { DidCommMimeType } from '../types';
export declare class AgentConfig {
    private initConfig;
    private _endpoints;
    label: string;
    logger: Logger;
    readonly agentDependencies: AgentDependencies;
    constructor(initConfig: InitConfig, agentDependencies: AgentDependencies);
    /**
     * @todo move to context configuration
     */
    get walletConfig(): import("../types").WalletConfig | undefined;
    get didCommMimeType(): DidCommMimeType;
    /**
     * Encode keys in did:key format instead of 'naked' keys, as stated in Aries RFC 0360.
     *
     * This setting will not be taken into account if the other party has previously used naked keys
     * in a given protocol (i.e. it does not support Aries RFC 0360).
     */
    get useDidKeyInProtocols(): boolean;
    get endpoints(): [string, ...string[]];
    set endpoints(endpoints: string[]);
    get useDidSovPrefixWhereAllowed(): boolean;
    /**
     * @todo move to context configuration
     */
    get connectionImageUrl(): string | undefined;
    get autoUpdateStorageOnStartup(): boolean;
    extend(config: Partial<InitConfig>): AgentConfig;
    toJSON(): {
        walletConfig: {
            key: string | undefined;
            storage: {
                credentials: string | undefined;
                type?: string | undefined;
            };
            id?: string | undefined;
            keyDerivationMethod?: import("../types").KeyDerivationMethod | undefined;
        };
        logger: LogLevel;
        agentDependencies: boolean;
        label: string;
        endpoints?: string[] | undefined;
        didCommMimeType?: DidCommMimeType | undefined;
        useDidKeyInProtocols?: boolean | undefined;
        useDidSovPrefixWhereAllowed?: boolean | undefined;
        connectionImageUrl?: string | undefined;
        autoUpdateStorageOnStartup?: boolean | undefined;
    };
}
