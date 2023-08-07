import type { W3cCredentialsModuleConfigOptions } from './W3cCredentialsModuleConfig';
import type { DependencyManager, Module } from '../../plugins';
import { W3cCredentialsApi } from './W3cCredentialsApi';
import { W3cCredentialsModuleConfig } from './W3cCredentialsModuleConfig';
/**
 * @public
 */
export declare class W3cCredentialsModule implements Module {
    readonly config: W3cCredentialsModuleConfig;
    readonly api: typeof W3cCredentialsApi;
    constructor(config?: W3cCredentialsModuleConfigOptions);
    register(dependencyManager: DependencyManager): void;
}
