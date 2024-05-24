import type { DependencyManager, Module } from '../../plugins';
/**
 * @public
 */
export declare class DifPresentationExchangeModule implements Module {
    /**
     * Registers the dependencies of the presentation-exchange module on the dependency manager.
     */
    register(dependencyManager: DependencyManager): void;
}
