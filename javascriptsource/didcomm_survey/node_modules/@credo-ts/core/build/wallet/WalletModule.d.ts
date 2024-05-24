import type { DependencyManager, Module } from '../plugins';
import { WalletApi } from './WalletApi';
export declare class WalletModule implements Module {
    readonly api: typeof WalletApi;
    /**
     * Registers the dependencies of the wallet module on the injection dependencyManager.
     */
    register(dependencyManager: DependencyManager): void;
}
