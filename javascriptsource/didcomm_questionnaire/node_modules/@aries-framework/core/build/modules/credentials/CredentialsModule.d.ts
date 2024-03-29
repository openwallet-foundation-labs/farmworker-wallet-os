import type { CredentialsModuleConfigOptions } from './CredentialsModuleConfig';
import type { CredentialProtocol } from './protocol/CredentialProtocol';
import type { FeatureRegistry } from '../../agent/FeatureRegistry';
import type { ApiModule, DependencyManager } from '../../plugins';
import type { Constructor } from '../../utils/mixins';
import type { Optional } from '../../utils/type';
import { CredentialsApi } from './CredentialsApi';
import { CredentialsModuleConfig } from './CredentialsModuleConfig';
/**
 * Default credentialProtocols that will be registered if the `credentialProtocols` property is not configured.
 */
export type DefaultCredentialProtocols = [];
export type CredentialsModuleOptions<CredentialProtocols extends CredentialProtocol[]> = Optional<CredentialsModuleConfigOptions<CredentialProtocols>, 'credentialProtocols'>;
export declare class CredentialsModule<CredentialProtocols extends CredentialProtocol[] = DefaultCredentialProtocols> implements ApiModule {
    readonly config: CredentialsModuleConfig<CredentialProtocols>;
    readonly api: Constructor<CredentialsApi<CredentialProtocols>>;
    constructor(config?: CredentialsModuleOptions<CredentialProtocols>);
    /**
     * Registers the dependencies of the credentials module on the dependency manager.
     */
    register(dependencyManager: DependencyManager, featureRegistry: FeatureRegistry): void;
}
