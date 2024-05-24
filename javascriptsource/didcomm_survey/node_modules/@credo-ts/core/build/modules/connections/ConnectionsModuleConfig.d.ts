import { PeerDidNumAlgo } from '../dids';
/**
 * ConnectionsModuleConfigOptions defines the interface for the options of the ConnectionsModuleConfig class.
 * This can contain optional parameters that have default values in the config class itself.
 */
export interface ConnectionsModuleConfigOptions {
    /**
     * Whether to automatically accept connection messages. Applies to both the connection protocol (RFC 0160)
     * and the DID exchange protocol (RFC 0023).
     *
     * Note: this setting does not apply to implicit invitation flows, which always need to be manually accepted
     * using ConnectionStateChangedEvent
     *
     * @default false
     */
    autoAcceptConnections?: boolean;
    /**
     * Peer did num algo to use in requests for DID exchange protocol (RFC 0023). It will be also used by default
     * in responses in case that the request does not use a peer did.
     *
     * @default PeerDidNumAlgo.GenesisDoc
     */
    peerNumAlgoForDidExchangeRequests?: PeerDidNumAlgo;
    /**
     * Peer did num algo to use for DID rotation (RFC 0794).
     *
     * @default PeerDidNumAlgo.ShortFormAndLongForm
     */
    peerNumAlgoForDidRotation?: PeerDidNumAlgo.MultipleInceptionKeyWithoutDoc | PeerDidNumAlgo.ShortFormAndLongForm;
}
export declare class ConnectionsModuleConfig {
    #private;
    private options;
    constructor(options?: ConnectionsModuleConfigOptions);
    /** See {@link ConnectionsModuleConfigOptions.autoAcceptConnections} */
    get autoAcceptConnections(): boolean;
    /** See {@link ConnectionsModuleConfigOptions.autoAcceptConnections} */
    set autoAcceptConnections(autoAcceptConnections: boolean);
    /** See {@link ConnectionsModuleConfigOptions.peerNumAlgoForDidExchangeRequests} */
    get peerNumAlgoForDidExchangeRequests(): PeerDidNumAlgo;
    /** See {@link ConnectionsModuleConfigOptions.peerNumAlgoForDidExchangeRequests} */
    set peerNumAlgoForDidExchangeRequests(peerNumAlgoForDidExchangeRequests: PeerDidNumAlgo);
    /** See {@link ConnectionsModuleConfigOptions.peerNumAlgoForDidRotation} */
    get peerNumAlgoForDidRotation(): PeerDidNumAlgo.MultipleInceptionKeyWithoutDoc | PeerDidNumAlgo.ShortFormAndLongForm;
    /** See {@link ConnectionsModuleConfigOptions.peerNumAlgoForDidRotation} */
    set peerNumAlgoForDidRotation(peerNumAlgoForDidRotation: PeerDidNumAlgo.MultipleInceptionKeyWithoutDoc | PeerDidNumAlgo.ShortFormAndLongForm);
}
