import type { FeatureRegistry } from '../../agent/FeatureRegistry';
import type { DependencyManager, Module } from '../../plugins';
import { BasicMessagesApi } from './BasicMessagesApi';
export declare class BasicMessagesModule implements Module {
    readonly api: typeof BasicMessagesApi;
    /**
     * Registers the dependencies of the basic message module on the dependency manager.
     */
    register(dependencyManager: DependencyManager, featureRegistry: FeatureRegistry): void;
}
