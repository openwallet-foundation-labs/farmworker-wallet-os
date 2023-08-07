/**
 * ConnectionsModuleConfigOptions defines the interface for the options of the ConnectionsModuleConfig class.
 * This can contain optional parameters that have default values in the config class itself.
 */
export interface ConnectionsModuleConfigOptions {
    /**
     * Whether to automatically accept connection messages. Applies to both the connection protocol (RFC 0160)
     * and the DID exchange protocol (RFC 0023).
     *
     * @default false
     */
    autoAcceptConnections?: boolean;
}
export declare class ConnectionsModuleConfig {
    #private;
    private options;
    constructor(options?: ConnectionsModuleConfigOptions);
    /** See {@link ConnectionsModuleConfigOptions.autoAcceptConnections} */
    get autoAcceptConnections(): boolean;
    /** See {@link ConnectionsModuleConfigOptions.autoAcceptConnections} */
    set autoAcceptConnections(autoAcceptConnections: boolean);
}
