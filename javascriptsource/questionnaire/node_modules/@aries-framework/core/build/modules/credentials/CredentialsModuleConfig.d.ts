import type { CredentialProtocol } from './protocol/CredentialProtocol';
import { AutoAcceptCredential } from './models';
/**
 * CredentialsModuleConfigOptions defines the interface for the options of the CredentialsModuleConfig class.
 * This can contain optional parameters that have default values in the config class itself.
 */
export interface CredentialsModuleConfigOptions<CredentialProtocols extends CredentialProtocol[]> {
    /**
     * Whether to automatically accept credential messages. Applies to all issue credential protocol versions.
     *
     * @default {@link AutoAcceptCredential.Never}
     */
    autoAcceptCredentials?: AutoAcceptCredential;
    /**
     * Credential protocols to make available to the credentials module. Only one credential protocol should be registered for each credential
     * protocol version.
     *
     * When not provided, the `V2CredentialProtocol` is registered by default.
     *
     * @default
     * ```
     * [V2CredentialProtocol]
     * ```
     */
    credentialProtocols: CredentialProtocols;
}
export declare class CredentialsModuleConfig<CredentialProtocols extends CredentialProtocol[]> {
    private options;
    constructor(options: CredentialsModuleConfigOptions<CredentialProtocols>);
    /** See {@link CredentialsModuleConfigOptions.autoAcceptCredentials} */
    get autoAcceptCredentials(): AutoAcceptCredential;
    /** See {@link CredentialsModuleConfigOptions.credentialProtocols} */
    get credentialProtocols(): CredentialProtocols;
}
