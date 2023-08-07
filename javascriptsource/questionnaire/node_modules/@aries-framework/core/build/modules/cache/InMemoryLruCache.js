"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryLruCache = void 0;
const lru_map_1 = require("lru_map");
/**
 * In memory LRU cache.
 *
 * This cache can be used with multiple agent context instances, however all instances will share the same cache.
 * If you need the cache to be isolated per agent context instance, make sure to use a different cache implementation.
 */
class InMemoryLruCache {
    constructor({ limit }) {
        this.cache = new lru_map_1.LRUMap(limit);
    }
    async get(agentContext, key) {
        this.removeExpiredItems();
        const item = this.cache.get(key);
        // Does not exist
        if (!item)
            return null;
        return item.value;
    }
    async set(agentContext, key, value, expiresInSeconds) {
        this.removeExpiredItems();
        let expiresDate = undefined;
        if (expiresInSeconds) {
            expiresDate = new Date();
            expiresDate.setSeconds(expiresDate.getSeconds() + expiresInSeconds);
        }
        this.cache.set(key, {
            expiresAt: expiresDate === null || expiresDate === void 0 ? void 0 : expiresDate.getTime(),
            value,
        });
    }
    clear() {
        this.cache.clear();
    }
    async remove(agentContext, key) {
        this.removeExpiredItems();
        this.cache.delete(key);
    }
    removeExpiredItems() {
        this.cache.forEach((value, key) => {
            if (value.expiresAt && Date.now() > value.expiresAt) {
                this.cache.delete(key);
            }
        });
    }
}
exports.InMemoryLruCache = InMemoryLruCache;
//# sourceMappingURL=InMemoryLruCache.js.map