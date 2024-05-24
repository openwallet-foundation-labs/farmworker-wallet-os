import type { Cache } from './Cache';
/**
 * CacheModuleConfigOptions defines the interface for the options of the CacheModuleConfig class.
 */
export interface CacheModuleConfigOptions {
    /**
     * Implementation of the {@link Cache} interface.
     *
     * NOTE: Starting from Credo 0.4.0 the default cache implementation will be {@link InMemoryLruCache}
     * @default SingleContextStorageLruCache - with a limit of 500
     *
     *
     */
    cache: Cache;
}
export declare class CacheModuleConfig {
    private options;
    constructor(options: CacheModuleConfigOptions);
    /** See {@link CacheModuleConfigOptions.cache} */
    get cache(): Cache;
}
