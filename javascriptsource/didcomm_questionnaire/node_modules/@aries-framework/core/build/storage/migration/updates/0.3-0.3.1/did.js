"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrateDidRecordToV0_3_1 = void 0;
const dids_1 = require("../../../../modules/dids");
const uuid_1 = require("../../../../utils/uuid");
/**
 * Migrates the {@link DidRecord} to 0.3 compatible format. It fetches all records from storage
 * and applies the needed updates to the records. After a record has been transformed, it is updated
 * in storage and the next record will be transformed.
 *
 * The following transformations are applied:
 *  - {@link extractDidAsSeparateProperty}
 */
async function migrateDidRecordToV0_3_1(agent) {
    agent.config.logger.info('Migrating did records to storage version 0.3.1');
    const didRepository = agent.dependencyManager.resolve(dids_1.DidRepository);
    agent.config.logger.debug(`Fetching all did records from storage`);
    const allDids = await didRepository.getAll(agent.context);
    agent.config.logger.debug(`Found a total of ${allDids.length} did records to update.`);
    for (const didRecord of allDids) {
        agent.config.logger.debug(`Migrating did record with id ${didRecord.id} to storage version 0.3.1`);
        const newId = (0, uuid_1.uuid)();
        agent.config.logger.debug(`Updating id ${didRecord.id} to ${newId} for did record`);
        // The id of the didRecord was previously the did itself. This prevented us from connecting to ourselves
        didRecord.did = didRecord.id;
        didRecord.id = newId;
        // Save new did record
        await didRepository.save(agent.context, didRecord);
        // Delete old did record
        await didRepository.deleteById(agent.context, didRecord.did);
        agent.config.logger.debug(`Successfully migrated did record with old id ${didRecord.did} to new id ${didRecord.id} to storage version 0.3.1`);
    }
}
exports.migrateDidRecordToV0_3_1 = migrateDidRecordToV0_3_1;
//# sourceMappingURL=did.js.map