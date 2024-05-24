import type { DependencyManager, Module } from '../../plugins';
import { GenericRecordsApi } from './GenericRecordsApi';
export declare class GenericRecordsModule implements Module {
    readonly api: typeof GenericRecordsApi;
    /**
     * Registers the dependencies of the generic records module on the dependency manager.
     */
    register(dependencyManager: DependencyManager): void;
}
