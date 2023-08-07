"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.didExchangeStateAndRoleFromRoleAndState = exports.oobStateFromDidExchangeRoleAndState = exports.migrateToOobRecord = exports.extractDidDocument = exports.updateConnectionRoleAndState = exports.migrateConnectionRecordToV0_2 = void 0;
const connections_1 = require("../../../../modules/connections");
const helpers_1 = require("../../../../modules/connections/services/helpers");
const dids_1 = require("../../../../modules/dids");
const DidDocumentRole_1 = require("../../../../modules/dids/domain/DidDocumentRole");
const repository_1 = require("../../../../modules/dids/repository");
const didRecordMetadataTypes_1 = require("../../../../modules/dids/repository/didRecordMetadataTypes");
const OutOfBandRole_1 = require("../../../../modules/oob/domain/OutOfBandRole");
const OutOfBandState_1 = require("../../../../modules/oob/domain/OutOfBandState");
const helpers_2 = require("../../../../modules/oob/helpers");
const repository_2 = require("../../../../modules/oob/repository");
const utils_1 = require("../../../../utils");
/**
 * Migrates the {@link ConnectionRecord} to 0.2 compatible format. It fetches all records from storage
 * and applies the needed updates to the records. After a record has been transformed, it is updated
 * in storage and the next record will be transformed.
 *
 * The following transformations are applied:
 *  - {@link updateConnectionRoleAndState}
 *  - {@link extractDidDocument}
 *  - {@link migrateToOobRecord}
 */
async function migrateConnectionRecordToV0_2(agent) {
    agent.config.logger.info('Migrating connection records to storage version 0.2');
    const connectionRepository = agent.dependencyManager.resolve(connections_1.ConnectionRepository);
    agent.config.logger.debug(`Fetching all connection records from storage`);
    const allConnections = await connectionRepository.getAll(agent.context);
    agent.config.logger.debug(`Found a total of ${allConnections.length} connection records to update.`);
    for (const connectionRecord of allConnections) {
        agent.config.logger.debug(`Migrating connection record with id ${connectionRecord.id} to storage version 0.2`);
        await updateConnectionRoleAndState(agent, connectionRecord);
        await extractDidDocument(agent, connectionRecord);
        // migration of oob record MUST run after extracting the did document as it relies on the updated did
        // it also MUST run after update the connection role and state as it assumes the values are
        // did exchange roles and states
        const _connectionRecord = await migrateToOobRecord(agent, connectionRecord);
        // migrateToOobRecord will return the connection record if it has not been deleted. When using multiUseInvitation the connection record
        // will be removed after processing, in which case the update method will throw an error.
        if (_connectionRecord) {
            await connectionRepository.update(agent.context, connectionRecord);
        }
        agent.config.logger.debug(`Successfully migrated connection record with id ${connectionRecord.id} to storage version 0.2`);
    }
}
exports.migrateConnectionRecordToV0_2 = migrateConnectionRecordToV0_2;
/**
 * With the addition of the did exchange protocol there are now two states and roles related to the connection record; for the did exchange protocol and for the connection protocol.
 * To keep it easy to work with the connection record, all state and role values are updated to those of the {@link DidExchangeRole} and {@link DidExchangeState}.
 *
 * This migration method transforms all connection record state and role values to their respective values of the {@link DidExchangeRole} and {@link DidExchangeState}. For convenience a getter
 * property `rfc0160ConnectionState` is added to the connection record which returns the {@link ConnectionState} value.
 *
 * The following 0.1.0 connection record structure (unrelated keys omitted):
 *
 * ```json
 * {
 *   "state": "invited",
 *   "role": "inviter"
 * }
 * ```
 *
 * Will be transformed into the following 0.2.0 structure (unrelated keys omitted):
 *
 * ```json
 * {
 *   "state": "invitation-sent",
 *   "role": "responder",
 * }
 * ```
 */
async function updateConnectionRoleAndState(agent, connectionRecord) {
    agent.config.logger.debug(`Extracting 'didDoc' and 'theirDidDoc' from connection record into separate DidRecord and updating unqualified dids to did:peer dids`);
    const oldState = connectionRecord.state;
    const oldRole = connectionRecord.role;
    const [didExchangeRole, didExchangeState] = didExchangeStateAndRoleFromRoleAndState(connectionRecord.role, connectionRecord.state);
    connectionRecord.role = didExchangeRole;
    connectionRecord.state = didExchangeState;
    agent.config.logger.debug(`Updated connection record state from ${oldState} to ${connectionRecord.state} and role from ${oldRole} to ${connectionRecord.role}`);
}
exports.updateConnectionRoleAndState = updateConnectionRoleAndState;
/**
 * The connection record previously stored both did documents from a connection in the connection record itself. Version 0.2.0 added a generic did storage that can be used for numerous usages, one of which
 * is the storage of did documents for connection records.
 *
 * This migration method extracts the did documents from the `didDoc` and `theirDidDoc` properties from the connection record, updates them to did documents compliant with the DID Core spec, and stores them
 * in the did repository. By doing so it also updates the unqualified dids in the `did` and `theirDid` fields generated by the indy-sdk to fully qualified `did:peer` dids compliant with
 * the [Peer DID Method Specification](https://identity.foundation/peer-did-method-spec/).
 *
 * To account for the fact that the mechanism to migrate legacy did document to peer did documents is not defined yet, the legacy did and did document are stored in the did record metadata.
 * This will be deleted later if we can be certain the did doc conversion to a did:peer did document is correct.
 *
 * The following 0.1.0 connection record structure (unrelated keys omitted):
 *
 * ```json
 * {
 *   "did": "BBPoJqRKatdcfLEAFL7exC",
 *   "theirDid": "N8NQHLtCKfPmWMgCSdfa7h",
 *   "didDoc": <legacyDidDoc>,
 *   "theirDidDoc": <legacyTheirDidDoc>,
 *   "verkey": "GjZWsBLgZCR18aL468JAT7w9CZRiBnpxUPPgyQxh4voa"
 * }
 * ```
 *
 * Will be transformed into the following 0.2.0 structure (unrelated keys omitted):
 *
 * ```json
 * {
 *   "did": "did:peer:1zQmXUaPPhPCbUVZ3hGYmQmGxWTwyDfhqESXCpMFhKaF9Y2A",
 *   "theirDid": "did:peer:1zQmZMygzYqNwU6Uhmewx5Xepf2VLp5S4HLSwwgf2aiKZuwa"
 * }
 * ```
 */
async function extractDidDocument(agent, connectionRecord) {
    agent.config.logger.debug(`Extracting 'didDoc' and 'theirDidDoc' from connection record into separate DidRecord and updating unqualified dids to did:peer dids`);
    const didRepository = agent.dependencyManager.resolve(repository_1.DidRepository);
    const untypedConnectionRecord = connectionRecord;
    const oldOurDidDocJson = untypedConnectionRecord.didDoc;
    const oldTheirDidDocJson = untypedConnectionRecord.theirDidDoc;
    if (oldOurDidDocJson) {
        const oldOurDidDoc = utils_1.JsonTransformer.fromJSON(oldOurDidDocJson, connections_1.DidDoc);
        agent.config.logger.debug(`Found a legacy did document for did ${oldOurDidDoc.id} in connection record didDoc. Converting it to a peer did document.`);
        const newOurDidDocument = (0, helpers_1.convertToNewDidDocument)(oldOurDidDoc);
        // Maybe we already have a record for this did because the migration failed previously
        // NOTE: in 0.3.0 the id property was updated to be a uuid, and a new did property was added. As this is the update from 0.1 to 0.2,
        // the `id` property of the record is still the did here.
        let ourDidRecord = await didRepository.findById(agent.context, newOurDidDocument.id);
        if (!ourDidRecord) {
            agent.config.logger.debug(`Creating did record for our did ${newOurDidDocument.id}`);
            ourDidRecord = new repository_1.DidRecord({
                // NOTE: in 0.3.0 the id property was updated to be a uuid, and a new did property was added. Here we make the id and did property both the did.
                // In the 0.3.0 update the `id` property will be updated to an uuid.
                id: newOurDidDocument.id,
                did: newOurDidDocument.id,
                role: DidDocumentRole_1.DidDocumentRole.Created,
                didDocument: newOurDidDocument,
                createdAt: connectionRecord.createdAt,
                tags: {
                    recipientKeyFingerprints: newOurDidDocument.recipientKeys.map((key) => key.fingerprint),
                },
            });
            ourDidRecord.metadata.set(didRecordMetadataTypes_1.DidRecordMetadataKeys.LegacyDid, {
                unqualifiedDid: oldOurDidDoc.id,
                didDocumentString: utils_1.JsonEncoder.toString(oldOurDidDocJson),
            });
            await didRepository.save(agent.context, ourDidRecord);
            agent.config.logger.debug(`Successfully saved did record for did ${newOurDidDocument.id}`);
        }
        else {
            agent.config.logger.debug(`Found existing did record for did ${newOurDidDocument.id}, not creating did record.`);
        }
        agent.config.logger.debug(`Deleting old did document from connection record and storing new did:peer did`);
        // Remove didDoc and assign the new did:peer did to did
        delete untypedConnectionRecord.didDoc;
        connectionRecord.did = newOurDidDocument.id;
    }
    else {
        agent.config.logger.debug(`Did not find a did document in connection record didDoc. Not converting it to a peer did document.`);
    }
    if (oldTheirDidDocJson) {
        const oldTheirDidDoc = utils_1.JsonTransformer.fromJSON(oldTheirDidDocJson, connections_1.DidDoc);
        agent.config.logger.debug(`Found a legacy did document for theirDid ${oldTheirDidDoc.id} in connection record theirDidDoc. Converting it to a peer did document.`);
        const newTheirDidDocument = (0, helpers_1.convertToNewDidDocument)(oldTheirDidDoc);
        // Maybe we already have a record for this did because the migration failed previously
        // NOTE: in 0.3.0 the id property was updated to be a uuid, and a new did property was added. As this is the update from 0.1 to 0.2,
        // the `id` property of the record is still the did here.
        let theirDidRecord = await didRepository.findById(agent.context, newTheirDidDocument.id);
        if (!theirDidRecord) {
            agent.config.logger.debug(`Creating did record for theirDid ${newTheirDidDocument.id}`);
            theirDidRecord = new repository_1.DidRecord({
                // NOTE: in 0.3.0 the id property was updated to be a uuid, and a new did property was added. Here we make the id and did property both the did.
                // In the 0.3.0 update the `id` property will be updated to an uuid.
                id: newTheirDidDocument.id,
                did: newTheirDidDocument.id,
                role: DidDocumentRole_1.DidDocumentRole.Received,
                didDocument: newTheirDidDocument,
                createdAt: connectionRecord.createdAt,
                tags: {
                    recipientKeyFingerprints: newTheirDidDocument.recipientKeys.map((key) => key.fingerprint),
                },
            });
            theirDidRecord.metadata.set(didRecordMetadataTypes_1.DidRecordMetadataKeys.LegacyDid, {
                unqualifiedDid: oldTheirDidDoc.id,
                didDocumentString: utils_1.JsonEncoder.toString(oldTheirDidDocJson),
            });
            await didRepository.save(agent.context, theirDidRecord);
            agent.config.logger.debug(`Successfully saved did record for theirDid ${newTheirDidDocument.id}`);
        }
        else {
            agent.config.logger.debug(`Found existing did record for theirDid ${newTheirDidDocument.id}, not creating did record.`);
        }
        agent.config.logger.debug(`Deleting old theirDidDoc from connection record and storing new did:peer theirDid`);
        // Remove theirDidDoc and assign the new did:peer did to theirDid
        delete untypedConnectionRecord.theirDidDoc;
        connectionRecord.theirDid = newTheirDidDocument.id;
    }
    else {
        agent.config.logger.debug(`Did not find a did document in connection record theirDidDoc. Not converting it to a peer did document.`);
    }
    // Delete legacy verkey property
    delete untypedConnectionRecord.verkey;
}
exports.extractDidDocument = extractDidDocument;
/**
 * With the addition of the out of band protocol, invitations are now stored in the {@link OutOfBandRecord}. In addition a new field `invitationDid` is added to the connection record that
 * is generated based on the invitation service or did. This allows to reuse existing connections.
 *
 * This migration method extracts the invitation and other relevant data into a separate {@link OutOfBandRecord}. By doing so it converts the old connection protocol invitation into the new
 * Out of band invitation message. Based on the service or did of the invitation, the `invitationDid` is populated.
 *
 * Previously when creating a multi use invitation, a connection record would be created with the `multiUseInvitation` set to true. The connection record would always be in state `invited`.
 * If a request for the multi use invitation came in, a new connection record would be created. With the addition of the out of band module, no connection records are created until a request
 * is received. So for multi use invitation this means that the connection record with multiUseInvitation=true will be deleted, and instead all connections created using that out of band invitation
 * will contain the `outOfBandId` of the multi use invitation.
 *
 * The following 0.1.0 connection record structure (unrelated keys omitted):
 *
 * ```json
 * {
 *   "invitation": {
 *     "@type": "https://didcomm.org/connections/1.0/invitation",
 *     "@id": "04a2c382-999e-4de9-a1d2-9dec0b2fa5e4",
 *     "recipientKeys": ["E6D1m3eERqCueX4ZgMCY14B4NceAr6XP2HyVqt55gDhu"],
 *     "serviceEndpoint": "https://example.com",
 *     "label": "test",
 *   },
 *   "multiUseInvitation": false
 * }
 * ```
 *
 * Will be transformed into the following 0.2.0 structure (unrelated keys omitted):
 *
 * ```json
 * {
 *   "invitationDid": "did:peer:2.Ez6MksYU4MHtfmNhNm1uGMvANr9j4CBv2FymjiJtRgA36bSVH.SeyJzIjoiaHR0cHM6Ly9leGFtcGxlLmNvbSJ9",
 *   "outOfBandId": "04a2c382-999e-4de9-a1d2-9dec0b2fa5e4"
 * }
 * ```
 */
async function migrateToOobRecord(agent, connectionRecord) {
    agent.config.logger.debug(`Migrating properties from connection record with id ${connectionRecord.id} to out of band record`);
    const oobRepository = agent.dependencyManager.resolve(repository_2.OutOfBandRepository);
    const connectionRepository = agent.dependencyManager.resolve(connections_1.ConnectionRepository);
    const untypedConnectionRecord = connectionRecord;
    const oldInvitationJson = untypedConnectionRecord.invitation;
    const oldMultiUseInvitation = untypedConnectionRecord.multiUseInvitation;
    // Only migrate if there is an invitation stored
    if (oldInvitationJson) {
        const oldInvitation = utils_1.JsonTransformer.fromJSON(oldInvitationJson, connections_1.ConnectionInvitationMessage);
        agent.config.logger.debug(`Found a legacy invitation in connection record. Migrating it to an out of band record.`);
        const outOfBandInvitation = (0, helpers_2.convertToNewInvitation)(oldInvitation);
        // If both the recipientKeys, the @id and the role match we assume the connection was created using the same invitation.
        const recipientKeyFingerprints = outOfBandInvitation
            .getInlineServices()
            .map((s) => s.recipientKeys)
            .reduce((acc, curr) => [...acc, ...curr], [])
            .map((didKey) => dids_1.DidKey.fromDid(didKey).key.fingerprint);
        const oobRole = connectionRecord.role === connections_1.DidExchangeRole.Responder ? OutOfBandRole_1.OutOfBandRole.Sender : OutOfBandRole_1.OutOfBandRole.Receiver;
        const oobRecords = await oobRepository.findByQuery(agent.context, {
            invitationId: oldInvitation.id,
            recipientKeyFingerprints,
            role: oobRole,
        });
        let oobRecord = oobRecords[0];
        if (!oobRecord) {
            agent.config.logger.debug(`Create out of band record.`);
            const connectionRole = connectionRecord.role;
            const connectionState = connectionRecord.state;
            const oobState = oobStateFromDidExchangeRoleAndState(connectionRole, connectionState);
            oobRecord = new repository_2.OutOfBandRecord({
                role: oobRole,
                state: oobState,
                alias: connectionRecord.alias,
                autoAcceptConnection: connectionRecord.autoAcceptConnection,
                outOfBandInvitation,
                reusable: oldMultiUseInvitation,
                mediatorId: connectionRecord.mediatorId,
                createdAt: connectionRecord.createdAt,
                tags: { recipientKeyFingerprints },
            });
            await oobRepository.save(agent.context, oobRecord);
            agent.config.logger.debug(`Successfully saved out of band record for invitation @id ${oldInvitation.id}`);
        }
        else {
            agent.config.logger.debug(`Found existing out of band record for invitation @id ${oldInvitation.id} and did ${connectionRecord.did}, not creating a new out of band record.`);
        }
        // We need to update the oob record with the reusable data. We don't know initially if an oob record is reusable or not, as there can be 1..n connections for each invitation
        // only when we find the multiUseInvitation we can update it.
        if (oldMultiUseInvitation) {
            oobRecord.reusable = true;
            oobRecord.state = OutOfBandState_1.OutOfBandState.AwaitResponse;
            oobRecord.mediatorId = connectionRecord.mediatorId;
            oobRecord.autoAcceptConnection = connectionRecord.autoAcceptConnection;
            await oobRepository.update(agent.context, oobRecord);
            await connectionRepository.delete(agent.context, connectionRecord);
            agent.config.logger.debug(`Set reusable=true for out of band record with invitation @id ${oobRecord.outOfBandInvitation.id} and role ${oobRole}.`);
            return;
        }
        agent.config.logger.debug(`Setting invitationDid and outOfBand Id, and removing invitation from connection record`);
        // All connections have been made using the connection protocol, which means we can be certain
        // that there was only one service, thus we can use the first oob message service
        const [invitationDid] = oobRecord.outOfBandInvitation.invitationDids;
        connectionRecord.invitationDid = invitationDid;
        // Remove invitation and assign the oob id to the connection record
        delete untypedConnectionRecord.invitation;
        connectionRecord.outOfBandId = oobRecord.id;
    }
    agent.config.logger.debug('Removing multiUseInvitation property from connection record');
    // multiUseInvitation is now stored as reusable in the out of band record
    delete untypedConnectionRecord.multiUseInvitation;
    return connectionRecord;
}
exports.migrateToOobRecord = migrateToOobRecord;
/**
 * Determine the out of band state based on the did exchange role and state.
 */
function oobStateFromDidExchangeRoleAndState(role, state) {
    const stateMapping = {
        [connections_1.DidExchangeState.InvitationReceived]: OutOfBandState_1.OutOfBandState.PrepareResponse,
        [connections_1.DidExchangeState.InvitationSent]: OutOfBandState_1.OutOfBandState.AwaitResponse,
        [connections_1.DidExchangeState.RequestReceived]: OutOfBandState_1.OutOfBandState.Done,
        [connections_1.DidExchangeState.RequestSent]: OutOfBandState_1.OutOfBandState.Done,
        [connections_1.DidExchangeState.ResponseReceived]: OutOfBandState_1.OutOfBandState.Done,
        [connections_1.DidExchangeState.ResponseSent]: OutOfBandState_1.OutOfBandState.Done,
        [connections_1.DidExchangeState.Completed]: OutOfBandState_1.OutOfBandState.Done,
        [connections_1.DidExchangeState.Abandoned]: OutOfBandState_1.OutOfBandState.Done,
    };
    if (state === connections_1.DidExchangeState.Start) {
        return role === connections_1.DidExchangeRole.Requester ? OutOfBandState_1.OutOfBandState.PrepareResponse : OutOfBandState_1.OutOfBandState.AwaitResponse;
    }
    return stateMapping[state];
}
exports.oobStateFromDidExchangeRoleAndState = oobStateFromDidExchangeRoleAndState;
/**
 * Determine the did exchange state based on the connection/did-exchange role and state.
 */
function didExchangeStateAndRoleFromRoleAndState(role, state) {
    const roleMapping = {
        // Responder / Inviter
        [connections_1.DidExchangeRole.Responder]: connections_1.DidExchangeRole.Responder,
        [connections_1.ConnectionRole.Inviter]: connections_1.DidExchangeRole.Responder,
        // Request / Invitee
        [connections_1.DidExchangeRole.Requester]: connections_1.DidExchangeRole.Requester,
        [connections_1.ConnectionRole.Invitee]: connections_1.DidExchangeRole.Requester,
    };
    const roleStateMapping = {
        [connections_1.DidExchangeRole.Requester]: {
            // DidExchangeRole.Requester
            [connections_1.ConnectionState.Invited]: connections_1.DidExchangeState.InvitationReceived,
            [connections_1.ConnectionState.Requested]: connections_1.DidExchangeState.RequestSent,
            [connections_1.ConnectionState.Responded]: connections_1.DidExchangeState.ResponseReceived,
            [connections_1.ConnectionState.Complete]: connections_1.DidExchangeState.Completed,
            [connections_1.ConnectionState.Null]: connections_1.DidExchangeState.Start,
        },
        [connections_1.DidExchangeRole.Responder]: {
            // DidExchangeRole.Responder
            [connections_1.ConnectionState.Invited]: connections_1.DidExchangeState.InvitationSent,
            [connections_1.ConnectionState.Requested]: connections_1.DidExchangeState.RequestReceived,
            [connections_1.ConnectionState.Responded]: connections_1.DidExchangeState.ResponseSent,
            [connections_1.ConnectionState.Complete]: connections_1.DidExchangeState.Completed,
            [connections_1.ConnectionState.Null]: connections_1.DidExchangeState.Start,
        },
    };
    // Map the role to did exchange role. Can handle did exchange roles to make the function re-runnable
    const didExchangeRole = roleMapping[role];
    // Take into account possibility that the record state was already updated to
    // didExchange state and roles. This makes the script re-runnable and
    // adds some resiliency to the script.
    const stateMapping = roleStateMapping[didExchangeRole];
    // Check if state is a valid connection state
    if (isConnectionState(state)) {
        return [didExchangeRole, stateMapping[state]];
    }
    // If state is not a valid state we assume the state is already a did exchange state
    return [didExchangeRole, state];
}
exports.didExchangeStateAndRoleFromRoleAndState = didExchangeStateAndRoleFromRoleAndState;
function isConnectionState(state) {
    return Object.values(connections_1.ConnectionState).includes(state);
}
//# sourceMappingURL=connection.js.map