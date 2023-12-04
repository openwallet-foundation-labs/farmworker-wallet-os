"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheModule = void 0;
const CacheModuleConfig_1 = require("./CacheModuleConfig");
const SingleContextLruCacheRepository_1 = require("./singleContextLruCache/SingleContextLruCacheRepository");
const SingleContextStorageLruCache_1 = require("./singleContextLruCache/SingleContextStorageLruCache");
class CacheModule {
    constructor(config) {
        var _a;
        this.config = new CacheModuleConfig_1.CacheModuleConfig(Object.assign(Object.assign({}, config), { cache: (_a = config === null || config === void 0 ? void 0 : config.cache) !== null && _a !== void 0 ? _a : new SingleContextStorageLruCache_1.SingleContextStorageLruCache({
                limit: 500,
            }) }));
    }
    register(dependencyManager) {
        dependencyManager.registerInstance(CacheModuleConfig_1.CacheModuleConfig, this.config);
        // Custom handling for when we're using the SingleContextStorageLruCache
        if (this.config.cache instanceof SingleContextStorageLruCache_1.SingleContextStorageLruCache) {
            dependencyManager.registerSingleton(SingleContextLruCacheRepository_1.SingleContextLruCacheRepository);
        }
    }
}
exports.CacheModule = CacheModule;
//# sourceMappingURL=CacheModule.js.map