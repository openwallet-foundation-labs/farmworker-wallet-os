import type { DidsModuleConfigOptions } from './DidsModuleConfig';
import type { DependencyManager, Module } from '../../plugins';
import { DidsApi } from './DidsApi';
import { DidsModuleConfig } from './DidsModuleConfig';
export declare class DidsModule implements Module {
    readonly config: DidsModuleConfig;
    constructor(config?: DidsModuleConfigOptions);
    readonly api: typeof DidsApi;
    /**
     * Registers the dependencies of the dids module module on the dependency manager.
     */
    register(dependencyManager: DependencyManager): void;
}
