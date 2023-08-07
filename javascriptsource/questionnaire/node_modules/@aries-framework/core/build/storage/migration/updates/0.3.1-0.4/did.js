"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrateSovDidToIndyDid = exports.migrateDidRecordToV0_4 = void 0;
const dids_1 = require("../../../../modules/dids");
/**
 * Migrates the {@link DidRecord} to 0.4 compatible format. It fetches all did records from storage
 * with method sov and applies the needed updates to the records. After a record has been transformed, it is updated
 * in storage and the next record will be transformed.
 *
 * The following transformations are applied:
 *  - {@link migrateSovDidToIndyDid}
 */
async function migrateDidRecordToV0_4(agent) {
    agent.config.logger.info('Migrating did records to storage version 0.4');
    const didRepository = agent.dependencyManager.resolve(dids_1.DidRepository);
    agent.config.logger.debug(`Fetching all did records with did method did:sov from storage`);
    const allSovDids = await didRepository.findByQuery(agent.context, {
        method: 'sov',
        role: dids_1.DidDocumentRole.Created,
    });
    agent.config.logger.debug(`Found a total of ${allSovDids.length} did:sov did records to update.`);
    for (const sovDidRecord of allSovDids) {
        agent.config.logger.debug(`Migrating did:sov did record with id ${sovDidRecord.id} to storage version 0.4`);
        const oldDid = sovDidRecord.did;
        migrateSovDidToIndyDid(agent, sovDidRecord);
        // Save updated did record
        await didRepository.update(agent.context, sovDidRecord);
        agent.config.logger.debug(`Successfully migrated did:sov did record with old did ${oldDid} to new did ${sovDidRecord.did} for storage version 0.4`);
    }
}
exports.migrateDidRecordToV0_4 = migrateDidRecordToV0_4;
function migrateSovDidToIndyDid(agent, didRecord) {
    agent.config.logger.debug(`Migrating did record with id ${didRecord.id} and did ${didRecord.did} to indy did for version 0.4`);
    const qualifiedIndyDid = didRecord.getTag('qualifiedIndyDid');
    didRecord.did = qualifiedIndyDid;
    // Unset qualifiedIndyDid tag
    didRecord.setTag('qualifiedIndyDid', undefined);
}
exports.migrateSovDidToIndyDid = migrateSovDidToIndyDid;
//# sourceMappingURL=did.js.map