import type { CacheModuleConfigOptions } from './CacheModuleConfig';
import type { DependencyManager, Module } from '../../plugins';
import type { Optional } from '../../utils';
import { CacheModuleConfig } from './CacheModuleConfig';
export type CacheModuleOptions = Optional<CacheModuleConfigOptions, 'cache'>;
export declare class CacheModule implements Module {
    readonly config: CacheModuleConfig;
    constructor(config?: CacheModuleOptions);
    register(dependencyManager: DependencyManager): void;
}
