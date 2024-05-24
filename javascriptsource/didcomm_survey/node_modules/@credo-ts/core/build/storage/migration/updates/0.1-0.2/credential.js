"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.moveDidCommMessages = exports.migrateInternalCredentialRecordProperties = exports.updateIndyMetadata = exports.getCredentialRole = exports.V01_02MigrationCredentialRole = exports.migrateCredentialRecordToV0_2 = void 0;
const CredentialState_1 = require("../../../../modules/credentials/models/CredentialState");
const CredentialRepository_1 = require("../../../../modules/credentials/repository/CredentialRepository");
const Metadata_1 = require("../../../Metadata");
const didcomm_1 = require("../../../didcomm");
/**
 * Migrates the {@link CredentialRecord} to 0.2 compatible format. It fetches all records from storage
 * and applies the needed updates to the records. After a record has been transformed, it is updated
 * in storage and the next record will be transformed.
 *
 * The following transformations are applied:
 *  - {@link updateIndyMetadata}
 */
async function migrateCredentialRecordToV0_2(agent) {
    agent.config.logger.info('Migrating credential records to storage version 0.2');
    const credentialRepository = agent.dependencyManager.resolve(CredentialRepository_1.CredentialRepository);
    agent.config.logger.debug(`Fetching all credential records from storage`);
    const allCredentials = await credentialRepository.getAll(agent.context);
    agent.config.logger.debug(`Found a total of ${allCredentials.length} credential records to update.`);
    for (const credentialRecord of allCredentials) {
        agent.config.logger.debug(`Migrating credential record with id ${credentialRecord.id} to storage version 0.2`);
        await updateIndyMetadata(agent, credentialRecord);
        await migrateInternalCredentialRecordProperties(agent, credentialRecord);
        await moveDidCommMessages(agent, credentialRecord);
        await credentialRepository.update(agent.context, credentialRecord);
        agent.config.logger.debug(`Successfully migrated credential record with id ${credentialRecord.id} to storage version 0.2`);
    }
}
exports.migrateCredentialRecordToV0_2 = migrateCredentialRecordToV0_2;
var V01_02MigrationCredentialRole;
(function (V01_02MigrationCredentialRole) {
    V01_02MigrationCredentialRole[V01_02MigrationCredentialRole["Issuer"] = 0] = "Issuer";
    V01_02MigrationCredentialRole[V01_02MigrationCredentialRole["Holder"] = 1] = "Holder";
})(V01_02MigrationCredentialRole = exports.V01_02MigrationCredentialRole || (exports.V01_02MigrationCredentialRole = {}));
const holderCredentialStates = [
    CredentialState_1.CredentialState.Declined,
    CredentialState_1.CredentialState.ProposalSent,
    CredentialState_1.CredentialState.OfferReceived,
    CredentialState_1.CredentialState.RequestSent,
    CredentialState_1.CredentialState.CredentialReceived,
];
const didCommMessageRoleMapping = {
    [V01_02MigrationCredentialRole.Issuer]: {
        proposalMessage: didcomm_1.DidCommMessageRole.Receiver,
        offerMessage: didcomm_1.DidCommMessageRole.Sender,
        requestMessage: didcomm_1.DidCommMessageRole.Receiver,
        credentialMessage: didcomm_1.DidCommMessageRole.Sender,
    },
    [V01_02MigrationCredentialRole.Holder]: {
        proposalMessage: didcomm_1.DidCommMessageRole.Sender,
        offerMessage: didcomm_1.DidCommMessageRole.Receiver,
        requestMessage: didcomm_1.DidCommMessageRole.Sender,
        credentialMessage: didcomm_1.DidCommMessageRole.Receiver,
    },
};
const credentialRecordMessageKeys = ['proposalMessage', 'offerMessage', 'requestMessage', 'credentialMessage'];
function getCredentialRole(credentialRecord) {
    // Credentials will only have a value when a credential is received, meaning we're the holder
    if (credentialRecord.credentials.length > 0) {
        return V01_02MigrationCredentialRole.Holder;
    }
    // If credentialRecord.credentials doesn't have any values, and we're also not in state done it means we're the issuer.
    else if (credentialRecord.state === CredentialState_1.CredentialState.Done) {
        return V01_02MigrationCredentialRole.Issuer;
    }
    // For these states we know for certain that we're the holder
    else if (holderCredentialStates.includes(credentialRecord.state)) {
        return V01_02MigrationCredentialRole.Holder;
    }
    // For all other states we can be certain we're the issuer
    return V01_02MigrationCredentialRole.Issuer;
}
exports.getCredentialRole = getCredentialRole;
/**
 * The credential record had a custom `metadata` property in pre-0.1.0 storage that contained the `requestMetadata`, `schemaId` and `credentialDefinition`
 * properties. Later a generic metadata API was added that only allows objects to be stored. Therefore the properties were moved into a different structure.
 *
 * This migration method updates the top level properties to the new nested metadata structure.
 *
 * The following pre-0.1.0 structure:
 *
 * ```json
 * {
 *   "requestMetadata": "<value of requestMetadata>",
 *   "schemaId": "<value of schemaId>",
 *   "credentialDefinitionId": "<value of credential definition id>"
 * }
 * ```
 *
 * Will be transformed into the following 0.2.0 structure:
 *
 * ```json
 * {
 *   "_internal/indyRequest": <value of requestMetadata>,
 *   "_internal/indyCredential": {
 *     "schemaId": "<value of schemaId>",
 *     "credentialDefinitionId": "<value of credential definition id>"
 *   }
 * }
 * ```
 */
async function updateIndyMetadata(agent, credentialRecord) {
    agent.config.logger.debug(`Updating indy metadata to use the generic metadata api available to records.`);
    const _a = credentialRecord.metadata.data, { requestMetadata, schemaId, credentialDefinitionId } = _a, rest = __rest(_a, ["requestMetadata", "schemaId", "credentialDefinitionId"]);
    const metadata = new Metadata_1.Metadata(rest);
    const indyRequestMetadataKey = '_internal/indyRequest';
    const indyCredentialMetadataKey = '_internal/indyCredential';
    if (requestMetadata) {
        agent.config.logger.trace(`Found top-level 'requestMetadata' key, moving to '${indyRequestMetadataKey}'`);
        metadata.add(indyRequestMetadataKey, Object.assign({}, requestMetadata));
    }
    if (schemaId && typeof schemaId === 'string') {
        agent.config.logger.trace(`Found top-level 'schemaId' key, moving to '${indyCredentialMetadataKey}.schemaId'`);
        metadata.add(indyCredentialMetadataKey, { schemaId });
    }
    if (credentialDefinitionId && typeof credentialDefinitionId === 'string') {
        agent.config.logger.trace(`Found top-level 'credentialDefinitionId' key, moving to '${indyCredentialMetadataKey}.credentialDefinitionId'`);
        metadata.add(indyCredentialMetadataKey, { credentialDefinitionId });
    }
    credentialRecord.metadata = metadata;
}
exports.updateIndyMetadata = updateIndyMetadata;
/**
 * With the addition of support for different protocol versions the credential record now stores the protocol version.
 * With the addition of issue credential v2 support, other credential formats than indy can be used, and multiple credentials can be issued at once. To
 * account for this the `credentialId` has been replaced by the `credentials` array. This is an array of objects containing the `credentialRecordId` and
 * the `credentialRecordType`. For all current credentials the `credentialRecordType` will always be `indy`.
 *
 * The following 0.1.0 credential record structure (unrelated keys omitted):
 *
 * ```json
 * {
 *   "credentialId": "09e46da9-a575-4909-b016-040e96c3c539"
 * }
 * ```
 *
 * Will be transformed into the following 0.2.0 structure (unrelated keys omitted):
 *
 * ```json
 * {
 *  "protocolVersion: "v1",
 *  "credentials": [
 *    {
 *      "credentialRecordId": "09e46da9-a575-4909-b016-040e96c3c539",
 *      "credentialRecordType": "anoncreds"
 *    }
 *  ]
 * }
 * ```
 */
async function migrateInternalCredentialRecordProperties(agent, credentialRecord) {
    agent.config.logger.debug(`Migrating internal credential record ${credentialRecord.id} properties to storage version 0.2`);
    if (!credentialRecord.protocolVersion) {
        agent.config.logger.debug(`Setting protocolVersion to v1`);
        credentialRecord.protocolVersion = 'v1';
    }
    const untypedCredentialRecord = credentialRecord;
    if (untypedCredentialRecord.credentialId) {
        agent.config.logger.debug(`Migrating indy credentialId ${untypedCredentialRecord.id} to credentials array`);
        credentialRecord.credentials = [
            {
                credentialRecordId: untypedCredentialRecord.credentialId,
                credentialRecordType: 'indy',
            },
        ];
        delete untypedCredentialRecord.credentialId;
    }
    agent.config.logger.debug(`Successfully migrated internal credential record ${credentialRecord.id} properties to storage version 0.2`);
}
exports.migrateInternalCredentialRecordProperties = migrateInternalCredentialRecordProperties;
/**
 * In 0.2.0 the v1 didcomm messages have been moved out of the credential record into separate record using the DidCommMessageRepository.
 * This migration scripts extracts all message (proposalMessage, offerMessage, requestMessage, credentialMessage) and moves
 * them into the DidCommMessageRepository.
 */
async function moveDidCommMessages(agent, credentialRecord) {
    agent.config.logger.debug(`Moving didcomm messages from credential record with id ${credentialRecord.id} to DidCommMessageRecord`);
    const didCommMessageRepository = agent.dependencyManager.resolve(didcomm_1.DidCommMessageRepository);
    for (const messageKey of credentialRecordMessageKeys) {
        agent.config.logger.debug(`Starting move of ${messageKey} from credential record with id ${credentialRecord.id} to DIDCommMessageRecord`);
        const credentialRecordJson = credentialRecord;
        const message = credentialRecordJson[messageKey];
        if (message) {
            const credentialRole = getCredentialRole(credentialRecord);
            const didCommMessageRole = didCommMessageRoleMapping[credentialRole][messageKey];
            const didCommMessageRecord = new didcomm_1.DidCommMessageRecord({
                role: didCommMessageRole,
                associatedRecordId: credentialRecord.id,
                message,
            });
            await didCommMessageRepository.save(agent.context, didCommMessageRecord);
            agent.config.logger.debug(`Successfully moved ${messageKey} from credential record with id ${credentialRecord.id} to DIDCommMessageRecord`);
            delete credentialRecordJson[messageKey];
        }
        else {
            agent.config.logger.debug(`Credential record with id ${credentialRecord.id} does not have a ${messageKey}. Not creating a DIDCommMessageRecord`);
        }
    }
    agent.config.logger.debug(`Successfully moved didcomm messages from credential record with id ${credentialRecord.id} to DIDCommMessageRecord`);
}
exports.moveDidCommMessages = moveDidCommMessages;
//# sourceMappingURL=credential.js.map