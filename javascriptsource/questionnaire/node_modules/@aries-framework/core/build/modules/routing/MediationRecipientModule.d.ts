import type { MediationRecipientModuleConfigOptions } from './MediationRecipientModuleConfig';
import type { FeatureRegistry } from '../../agent/FeatureRegistry';
import type { DependencyManager, Module } from '../../plugins';
import { MediationRecipientApi } from './MediationRecipientApi';
import { MediationRecipientModuleConfig } from './MediationRecipientModuleConfig';
export declare class MediationRecipientModule implements Module {
    readonly config: MediationRecipientModuleConfig;
    readonly api: typeof MediationRecipientApi;
    constructor(config?: MediationRecipientModuleConfigOptions);
    /**
     * Registers the dependencies of the mediator recipient module on the dependency manager.
     */
    register(dependencyManager: DependencyManager, featureRegistry: FeatureRegistry): void;
}
