import type { ProofProtocol } from './protocol/ProofProtocol';
import { AutoAcceptProof } from './models/ProofAutoAcceptType';
/**
 * ProofsModuleConfigOptions defines the interface for the options of the ProofsModuleConfig class.
 * This can contain optional parameters that have default values in the config class itself.
 */
export interface ProofsModuleConfigOptions<ProofProtocols extends ProofProtocol[]> {
    /**
     * Whether to automatically accept proof messages. Applies to all present proof protocol versions.
     *
     * @default {@link AutoAcceptProof.Never}
     */
    autoAcceptProofs?: AutoAcceptProof;
    /**
     * Proof protocols to make available to the proofs module. Only one proof protocol should be registered for each proof
     * protocol version.
     *
     * When not provided, the `V2ProofProtocol` is registered by default.
     *
     * @default
     * ```
     * [V2ProofProtocol]
     * ```
     */
    proofProtocols: ProofProtocols;
}
export declare class ProofsModuleConfig<ProofProtocols extends ProofProtocol[]> {
    private options;
    constructor(options: ProofsModuleConfigOptions<ProofProtocols>);
    /** See {@link ProofsModuleConfigOptions.autoAcceptProofs} */
    get autoAcceptProofs(): AutoAcceptProof;
    /** See {@link ProofsModuleConfigOptions.proofProtocols} */
    get proofProtocols(): ProofProtocols;
}
