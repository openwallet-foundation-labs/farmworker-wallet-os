import type { Cache } from './Cache';
import type { AgentContext } from '../../agent/context';
export interface InMemoryLruCacheOptions {
    /** The maximum number of entries allowed in the cache */
    limit: number;
}
/**
 * In memory LRU cache.
 *
 * This cache can be used with multiple agent context instances, however all instances will share the same cache.
 * If you need the cache to be isolated per agent context instance, make sure to use a different cache implementation.
 */
export declare class InMemoryLruCache implements Cache {
    private readonly cache;
    constructor({ limit }: InMemoryLruCacheOptions);
    get<CacheValue>(agentContext: AgentContext, key: string): Promise<CacheValue | null>;
    set<CacheValue>(agentContext: AgentContext, key: string, value: CacheValue, expiresInSeconds?: number): Promise<void>;
    clear(): void;
    remove(agentContext: AgentContext, key: string): Promise<void>;
    private removeExpiredItems;
}
