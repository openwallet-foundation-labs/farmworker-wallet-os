"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrateW3cCredentialRecordToV0_4 = void 0;
const repository_1 = require("../../../../modules/vc/repository");
/**
 * Re-saves the w3c credential records to add the new claimFormat tag.
 */
async function migrateW3cCredentialRecordToV0_4(agent) {
    agent.config.logger.info('Migration w3c credential records records to storage version 0.4');
    const w3cCredentialRepository = agent.dependencyManager.resolve(repository_1.W3cCredentialRepository);
    agent.config.logger.debug(`Fetching all w3c credential records from storage`);
    const records = await w3cCredentialRepository.getAll(agent.context);
    agent.config.logger.debug(`Found a total of ${records.length} w3c credential records to update.`);
    for (const record of records) {
        agent.config.logger.debug(`Re-saving w3c credential record with id ${record.id} to add claimFormat tag for storage version 0.4`);
        // Save updated record
        await w3cCredentialRepository.update(agent.context, record);
        agent.config.logger.debug(`Successfully migrated w3c credential record with id ${record.id} to storage version 0.4`);
    }
}
exports.migrateW3cCredentialRecordToV0_4 = migrateW3cCredentialRecordToV0_4;
//# sourceMappingURL=w3cCredentialRecord.js.map