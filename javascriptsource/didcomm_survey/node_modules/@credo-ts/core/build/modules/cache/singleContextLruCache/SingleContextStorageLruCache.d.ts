import type { AgentContext } from '../../../agent/context';
import type { Cache } from '../Cache';
export interface SingleContextStorageLruCacheOptions {
    /** The maximum number of entries allowed in the cache */
    limit: number;
}
/**
 * Cache that leverages the storage associated with the agent context to store cache records.
 * It will keep an in-memory cache of the records to avoid hitting the storage on every read request.
 * Therefor this cache is meant to be used with a single instance of the agent.
 *
 * Due to keeping an in-memory copy of the cache, it is also not meant to be used with multiple
 * agent context instances (meaning multi-tenancy), as they will overwrite the in-memory cache.
 *
 * However, this means the cache is not meant for usage with multiple instances.
 */
export declare class SingleContextStorageLruCache implements Cache {
    private limit;
    private _cache?;
    private _contextCorrelationId?;
    constructor({ limit }: SingleContextStorageLruCacheOptions);
    get<CacheValue>(agentContext: AgentContext, key: string): Promise<CacheValue | null>;
    set<CacheValue>(agentContext: AgentContext, key: string, value: CacheValue, expiresInSeconds?: number): Promise<void>;
    remove(agentContext: AgentContext, key: string): Promise<void>;
    private getCache;
    private lruFromRecord;
    private fetchCacheRecord;
    private removeExpiredItems;
    private persistCache;
    /**
     * Asserts this class is not used with multiple agent context instances.
     */
    private assertContextCorrelationId;
}
