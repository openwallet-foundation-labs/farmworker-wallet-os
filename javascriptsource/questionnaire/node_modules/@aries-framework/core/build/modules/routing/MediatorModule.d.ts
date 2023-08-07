import type { MediatorModuleConfigOptions } from './MediatorModuleConfig';
import type { FeatureRegistry } from '../../agent/FeatureRegistry';
import type { DependencyManager, Module } from '../../plugins';
import { MediatorApi } from './MediatorApi';
import { MediatorModuleConfig } from './MediatorModuleConfig';
export declare class MediatorModule implements Module {
    readonly config: MediatorModuleConfig;
    readonly api: typeof MediatorApi;
    constructor(config?: MediatorModuleConfigOptions);
    /**
     * Registers the dependencies of the question answer module on the dependency manager.
     */
    register(dependencyManager: DependencyManager, featureRegistry: FeatureRegistry): void;
}
