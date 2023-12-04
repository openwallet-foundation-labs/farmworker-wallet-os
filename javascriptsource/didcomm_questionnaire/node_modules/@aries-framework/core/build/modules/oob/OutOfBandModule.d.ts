import type { FeatureRegistry } from '../../agent/FeatureRegistry';
import type { DependencyManager, Module } from '../../plugins';
import { OutOfBandApi } from './OutOfBandApi';
export declare class OutOfBandModule implements Module {
    readonly api: typeof OutOfBandApi;
    /**
     * Registers the dependencies of the ot of band module on the dependency manager.
     */
    register(dependencyManager: DependencyManager, featureRegistry: FeatureRegistry): void;
}
