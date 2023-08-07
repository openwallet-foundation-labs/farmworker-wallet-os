import type { DiscoverFeaturesModuleConfigOptions } from './DiscoverFeaturesModuleConfig';
import type { FeatureRegistry } from '../../agent/FeatureRegistry';
import type { DependencyManager, Module } from '../../plugins';
import { DiscoverFeaturesApi } from './DiscoverFeaturesApi';
import { DiscoverFeaturesModuleConfig } from './DiscoverFeaturesModuleConfig';
export declare class DiscoverFeaturesModule implements Module {
    readonly api: typeof DiscoverFeaturesApi;
    readonly config: DiscoverFeaturesModuleConfig;
    constructor(config?: DiscoverFeaturesModuleConfigOptions);
    /**
     * Registers the dependencies of the discover features module on the dependency manager.
     */
    register(dependencyManager: DependencyManager, featureRegistry: FeatureRegistry): void;
}
