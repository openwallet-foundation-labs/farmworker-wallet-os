"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrateConnectionRecordTags = exports.migrateConnectionRecordToV0_3 = void 0;
const connections_1 = require("../../../../modules/connections");
const routing_1 = require("../../../../modules/routing");
/**
 * Migrate the {@link ConnectionRecord} to a 0.3 compatible format.
 *
 * @param agent
 */
async function migrateConnectionRecordToV0_3(agent) {
    agent.config.logger.info('Migrating connection records to storage version 0.3');
    const connectionRepository = agent.dependencyManager.resolve(connections_1.ConnectionRepository);
    const mediationRepository = agent.dependencyManager.resolve(routing_1.MediationRepository);
    agent.config.logger.debug('Fetching all connection records from storage');
    const allConnections = await connectionRepository.getAll(agent.context);
    agent.config.logger.debug(`Found a total of ${allConnections.length} connection records to update`);
    agent.config.logger.debug('Fetching all mediation records from storage');
    const allMediators = await mediationRepository.getAll(agent.context);
    agent.config.logger.debug(`Found a total of ${allMediators.length} mediation records`);
    const mediatorConnectionIds = new Set(allMediators.map((mediator) => mediator.connectionId));
    for (const connectionRecord of allConnections) {
        agent.config.logger.debug(`Migrating connection record with id ${connectionRecord.id} to storage version 0.3`);
        await migrateConnectionRecordTags(agent, connectionRecord, mediatorConnectionIds);
        await connectionRepository.update(agent.context, connectionRecord);
        agent.config.logger.debug(`Successfully migrated connection record with id ${connectionRecord.id} to storage version 0.3`);
    }
}
exports.migrateConnectionRecordToV0_3 = migrateConnectionRecordToV0_3;
/**
 *
 * @param agent
 * @param connectionRecord
 */
async function migrateConnectionRecordTags(agent, connectionRecord, mediatorConnectionIds = new Set()) {
    agent.config.logger.debug(`Migrating internal connection record type tags ${connectionRecord.id} to storage version 0.3`);
    // Old connection records will have tags set in the 'connectionType' property
    const connectionTypeTags = (connectionRecord.getTags().connectionType || []);
    const connectionTypes = [...connectionTypeTags];
    if (mediatorConnectionIds.has(connectionRecord.id) && !connectionTypes.includes(connections_1.ConnectionType.Mediator)) {
        connectionTypes.push(connections_1.ConnectionType.Mediator);
    }
    connectionRecord.connectionTypes = connectionTypes;
    connectionRecord.setTag('connectionType', undefined);
    agent.config.logger.debug(`Successfully migrated internal connection record type tags ${connectionRecord.id} to storage version 0.3`);
}
exports.migrateConnectionRecordTags = migrateConnectionRecordTags;
//# sourceMappingURL=connection.js.map