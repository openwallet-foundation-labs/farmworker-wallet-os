"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrateRole = exports.getProofRole = exports.migrateProofExchangeRecordToV0_5 = void 0;
const error_1 = require("../../../../error");
const proofs_1 = require("../../../../modules/proofs");
const messageType_1 = require("../../../../utils/messageType");
const didcomm_1 = require("../../../didcomm");
/**
 * Migrates the {@link ProofExchangeExchangeRecord} to 0.5 compatible format. It fetches all proof exchange records from
 *  storage and applies the needed updates to the records. After a record has been transformed, it is updated
 * in storage and the next record will be transformed.
 *
 * The following transformations are applied:
 *  - {@link migrateRole}
 */
async function migrateProofExchangeRecordToV0_5(agent) {
    agent.config.logger.info('Migrating proof exchange records to storage version 0.5');
    const proofRepository = agent.dependencyManager.resolve(proofs_1.ProofRepository);
    agent.config.logger.debug(`Fetching all proof records from storage`);
    const proofRecords = await proofRepository.getAll(agent.context);
    agent.config.logger.debug(`Found a total of ${proofRecords.length} proof exchange records to update.`);
    for (const proofRecord of proofRecords) {
        agent.config.logger.debug(`Migrating proof exchange record with id ${proofRecord.id} to storage version 0.5`);
        await migrateRole(agent, proofRecord);
        // Save updated record
        await proofRepository.update(agent.context, proofRecord);
        agent.config.logger.debug(`Successfully migrated proof exchange record with id ${proofRecord.id} to storage version 0.5`);
    }
}
exports.migrateProofExchangeRecordToV0_5 = migrateProofExchangeRecordToV0_5;
const proverProofStates = [
    proofs_1.ProofState.RequestReceived,
    proofs_1.ProofState.ProposalSent,
    proofs_1.ProofState.PresentationSent,
    proofs_1.ProofState.Declined,
];
const verifierProofStates = [proofs_1.ProofState.RequestSent, proofs_1.ProofState.ProposalReceived, proofs_1.ProofState.PresentationReceived];
async function getProofRole(agent, proofRecord) {
    // For these states we know for certain that we're the prover
    if (proverProofStates.includes(proofRecord.state)) {
        return proofs_1.ProofRole.Prover;
    }
    // For these states we know for certain that we're the verifier
    else if (verifierProofStates.includes(proofRecord.state)) {
        return proofs_1.ProofRole.Verifier;
    }
    // We now need to determine the role based on the didcomm message. Only the Done and Abandoned states
    // remain and we can't be certain of the role based on the state alone.
    // Fetch any of the associated proof messages that we can use to determine the role
    // Either one of these MUST be present or we can't determine the role.
    const didCommMessageRepository = agent.dependencyManager.resolve(didcomm_1.DidCommMessageRepository);
    const [didCommMessageRecord] = await didCommMessageRepository.findByQuery(agent.context, {
        associatedRecordId: proofRecord.id,
        $or: [
            // We can't be certain which messages will be present.
            { messageName: proofs_1.V2ProposePresentationMessage.type.messageName },
            { messageName: proofs_1.V2RequestPresentationMessage.type.messageName },
        ],
    });
    if (!didCommMessageRecord) {
        throw new error_1.CredoError(`Unable to determine the role of the proof exchange record with id ${proofRecord.id} without any didcomm messages and state abandoned/done`);
    }
    // Maps the message name and the didcomm message role to the respective proof role
    const roleStateMapping = {
        [proofs_1.V2ProposePresentationMessage.type.messageName]: {
            [didcomm_1.DidCommMessageRole.Sender]: proofs_1.ProofRole.Prover,
            [didcomm_1.DidCommMessageRole.Receiver]: proofs_1.ProofRole.Verifier,
        },
        [proofs_1.V2RequestPresentationMessage.type.messageName]: {
            [didcomm_1.DidCommMessageRole.Sender]: proofs_1.ProofRole.Verifier,
            [didcomm_1.DidCommMessageRole.Receiver]: proofs_1.ProofRole.Prover,
        },
    };
    const messageName = (0, messageType_1.parseMessageType)(didCommMessageRecord.message['@type']).messageName;
    const proofRole = roleStateMapping[messageName][didCommMessageRecord.role];
    return proofRole;
}
exports.getProofRole = getProofRole;
/**
 * Add a role to the proof record.
 */
async function migrateRole(agent, proofRecord) {
    agent.config.logger.debug(`Adding role to record with id ${proofRecord.id} to for version 0.5`);
    proofRecord.role = await getProofRole(agent, proofRecord);
    agent.config.logger.debug(`Successfully updated role to '${proofRecord.role}' on proof record with id ${proofRecord.id} to for version 0.5`);
}
exports.migrateRole = migrateRole;
//# sourceMappingURL=proofExchangeRecord.js.map