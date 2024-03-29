"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrateCacheToV0_4 = void 0;
const constants_1 = require("../../../../constants");
const BaseRecord_1 = require("../../../BaseRecord");
/**
 * removes the all cache records as used in 0.3.0, as they have been updated to use the new cache interface.
 */
async function migrateCacheToV0_4(agent) {
    agent.config.logger.info('Removing 0.3 cache records from storage');
    const storageService = agent.dependencyManager.resolve(constants_1.InjectionSymbols.StorageService);
    agent.config.logger.debug(`Fetching all cache records`);
    const records = await storageService.getAll(agent.context, CacheRecord);
    for (const record of records) {
        agent.config.logger.debug(`Removing cache record with id ${record.id}`);
        await storageService.deleteById(agent.context, CacheRecord, record.id);
        agent.config.logger.debug(`Successfully removed cache record with id ${record.id}`);
    }
}
exports.migrateCacheToV0_4 = migrateCacheToV0_4;
class CacheRecord extends BaseRecord_1.BaseRecord {
    constructor() {
        super(...arguments);
        this.type = CacheRecord.type;
    }
    getTags() {
        return this._tags;
    }
}
CacheRecord.type = 'CacheRecord';
//# sourceMappingURL=cache.js.map