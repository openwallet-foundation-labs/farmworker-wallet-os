"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SingleContextStorageLruCache = exports.InMemoryLruCache = exports.CacheModuleConfig = exports.CacheModule = void 0;
// Module
var CacheModule_1 = require("./CacheModule");
Object.defineProperty(exports, "CacheModule", { enumerable: true, get: function () { return CacheModule_1.CacheModule; } });
var CacheModuleConfig_1 = require("./CacheModuleConfig");
Object.defineProperty(exports, "CacheModuleConfig", { enumerable: true, get: function () { return CacheModuleConfig_1.CacheModuleConfig; } });
// Cache Implementations
var InMemoryLruCache_1 = require("./InMemoryLruCache");
Object.defineProperty(exports, "InMemoryLruCache", { enumerable: true, get: function () { return InMemoryLruCache_1.InMemoryLruCache; } });
var singleContextLruCache_1 = require("./singleContextLruCache");
Object.defineProperty(exports, "SingleContextStorageLruCache", { enumerable: true, get: function () { return singleContextLruCache_1.SingleContextStorageLruCache; } });
//# sourceMappingURL=index.js.map