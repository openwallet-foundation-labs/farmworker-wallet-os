"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrateRole = exports.getCredentialRole = exports.migrateCredentialExchangeRecordToV0_5 = void 0;
const error_1 = require("../../../../error");
const credentials_1 = require("../../../../modules/credentials");
const messageType_1 = require("../../../../utils/messageType");
const didcomm_1 = require("../../../didcomm");
/**
 * Migrates the {@link CredentialExchangeRecord} to 0.5 compatible format. It fetches all credential exchange records from
 *  storage and applies the needed updates to the records. After a record has been transformed, it is updated
 * in storage and the next record will be transformed.
 *
 * The following transformations are applied:
 *  - {@link migrateRole}
 */
async function migrateCredentialExchangeRecordToV0_5(agent) {
    agent.config.logger.info('Migrating credential exchange records to storage version 0.5');
    const credentialRepository = agent.dependencyManager.resolve(credentials_1.CredentialRepository);
    agent.config.logger.debug(`Fetching all credential records from storage`);
    const credentialRecords = await credentialRepository.getAll(agent.context);
    agent.config.logger.debug(`Found a total of ${credentialRecords.length} credential exchange records to update.`);
    for (const credentialRecord of credentialRecords) {
        agent.config.logger.debug(`Migrating credential exchange record with id ${credentialRecord.id} to storage version 0.5`);
        await migrateRole(agent, credentialRecord);
        // Save updated record
        await credentialRepository.update(agent.context, credentialRecord);
        agent.config.logger.debug(`Successfully migrated credential exchange record with id ${credentialRecord.id} to storage version 0.5`);
    }
}
exports.migrateCredentialExchangeRecordToV0_5 = migrateCredentialExchangeRecordToV0_5;
const holderCredentialStates = [
    credentials_1.CredentialState.Declined,
    credentials_1.CredentialState.ProposalSent,
    credentials_1.CredentialState.OfferReceived,
    credentials_1.CredentialState.RequestSent,
    credentials_1.CredentialState.CredentialReceived,
];
const issuerCredentialStates = [
    credentials_1.CredentialState.ProposalReceived,
    credentials_1.CredentialState.OfferSent,
    credentials_1.CredentialState.RequestReceived,
    credentials_1.CredentialState.CredentialIssued,
];
async function getCredentialRole(agent, credentialRecord) {
    // Credentials will only have a value when a credential is received, meaning we're the holder
    if (credentialRecord.credentials.length > 0) {
        return credentials_1.CredentialRole.Holder;
    }
    // If credentialRecord.credentials doesn't have any values, and we're also not in state done it means we're the issuer.
    else if (credentialRecord.state === credentials_1.CredentialState.Done) {
        return credentials_1.CredentialRole.Issuer;
    }
    // For these states we know for certain that we're the holder
    else if (holderCredentialStates.includes(credentialRecord.state)) {
        return credentials_1.CredentialRole.Holder;
    }
    // For these states we know for certain that we're the issuer
    else if (issuerCredentialStates.includes(credentialRecord.state)) {
        return credentials_1.CredentialRole.Issuer;
    }
    // We now need to determine the role based on the didcomm message. Only the Abandoned state remains
    // and we can't be certain of the role based on the state alone.
    // Fetch any of the associated credential messages that we can use to determine the role
    // Either one of these MUST be present or we can't determine the role.
    const didCommMessageRepository = agent.dependencyManager.resolve(didcomm_1.DidCommMessageRepository);
    const [didCommMessageRecord] = await didCommMessageRepository.findByQuery(agent.context, {
        associatedRecordId: credentialRecord.id,
        $or: [
            // We can't be certain which messages will be present.
            { messageName: credentials_1.V2OfferCredentialMessage.type.messageName },
            { messageName: credentials_1.V2ProposeCredentialMessage.type.messageName },
            { messageName: credentials_1.V2RequestCredentialMessage.type.messageName },
        ],
    });
    if (!didCommMessageRecord) {
        throw new error_1.CredoError(`Unable to determine the role of the credential exchange record with id ${credentialRecord.id} without any didcomm messages and state abandoned`);
    }
    // Maps the message name and the didcomm message role to the respective credential role
    const roleStateMapping = {
        [credentials_1.V2OfferCredentialMessage.type.messageName]: {
            [didcomm_1.DidCommMessageRole.Sender]: credentials_1.CredentialRole.Issuer,
            [didcomm_1.DidCommMessageRole.Receiver]: credentials_1.CredentialRole.Holder,
        },
        [credentials_1.V2ProposeCredentialMessage.type.messageName]: {
            [didcomm_1.DidCommMessageRole.Sender]: credentials_1.CredentialRole.Holder,
            [didcomm_1.DidCommMessageRole.Receiver]: credentials_1.CredentialRole.Issuer,
        },
        [credentials_1.V2RequestCredentialMessage.type.messageName]: {
            [didcomm_1.DidCommMessageRole.Sender]: credentials_1.CredentialRole.Holder,
            [didcomm_1.DidCommMessageRole.Receiver]: credentials_1.CredentialRole.Issuer,
        },
    };
    const messageName = (0, messageType_1.parseMessageType)(didCommMessageRecord.message['@type']).messageName;
    const credentialRole = roleStateMapping[messageName][didCommMessageRecord.role];
    return credentialRole;
}
exports.getCredentialRole = getCredentialRole;
/**
 * Add a role to the credential record.
 */
async function migrateRole(agent, credentialRecord) {
    agent.config.logger.debug(`Adding role to record with id ${credentialRecord.id} to for version 0.4`);
    credentialRecord.role = await getCredentialRole(agent, credentialRecord);
    agent.config.logger.debug(`Successfully updated role to '${credentialRecord.role}' on credential record with id ${credentialRecord.id} to for version 0.4`);
}
exports.migrateRole = migrateRole;
//# sourceMappingURL=credentialExchangeRecord.js.map