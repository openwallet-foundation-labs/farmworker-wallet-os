import type { ProofsModuleConfigOptions } from './ProofsModuleConfig';
import type { ProofProtocol } from './protocol/ProofProtocol';
import type { FeatureRegistry } from '../../agent/FeatureRegistry';
import type { ApiModule, DependencyManager } from '../../plugins';
import type { Optional } from '../../utils';
import type { Constructor } from '../../utils/mixins';
import { ProofsApi } from './ProofsApi';
import { ProofsModuleConfig } from './ProofsModuleConfig';
import { V2ProofProtocol } from './protocol';
/**
 * Default proofProtocols that will be registered if the `proofProtocols` property is not configured.
 */
export type DefaultProofProtocols = [V2ProofProtocol<[]>];
export type ProofsModuleOptions<ProofProtocols extends ProofProtocol[]> = Optional<ProofsModuleConfigOptions<ProofProtocols>, 'proofProtocols'>;
export declare class ProofsModule<ProofProtocols extends ProofProtocol[] = DefaultProofProtocols> implements ApiModule {
    readonly config: ProofsModuleConfig<ProofProtocols>;
    readonly api: Constructor<ProofsApi<ProofProtocols>>;
    constructor(config?: ProofsModuleOptions<ProofProtocols>);
    /**
     * Registers the dependencies of the proofs module on the dependency manager.
     */
    register(dependencyManager: DependencyManager, featureRegistry: FeatureRegistry): void;
}
