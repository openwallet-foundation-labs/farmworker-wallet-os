import type { ConnectionsModuleConfigOptions } from './ConnectionsModuleConfig';
import type { FeatureRegistry } from '../../agent/FeatureRegistry';
import type { DependencyManager, Module } from '../../plugins';
import { ConnectionsApi } from './ConnectionsApi';
import { ConnectionsModuleConfig } from './ConnectionsModuleConfig';
export declare class ConnectionsModule implements Module {
    readonly config: ConnectionsModuleConfig;
    readonly api: typeof ConnectionsApi;
    constructor(config?: ConnectionsModuleConfigOptions);
    /**
     * Registers the dependencies of the connections module on the dependency manager.
     */
    register(dependencyManager: DependencyManager, featureRegistry: FeatureRegistry): void;
}
