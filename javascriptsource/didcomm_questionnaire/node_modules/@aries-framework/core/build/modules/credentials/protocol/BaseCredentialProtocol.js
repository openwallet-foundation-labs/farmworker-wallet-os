"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseCredentialProtocol = void 0;
const EventEmitter_1 = require("../../../agent/EventEmitter");
const storage_1 = require("../../../storage");
const CredentialEvents_1 = require("../CredentialEvents");
const CredentialState_1 = require("../models/CredentialState");
const repository_1 = require("../repository");
/**
 * Base implementation of the CredentialProtocol that can be used as a foundation for implementing
 * the CredentialProtocol interface.
 */
class BaseCredentialProtocol {
    /**
     * Process a received credential {@link ProblemReportMessage}.
     *
     * @param messageContext The message context containing a credential problem report message
     * @returns credential record associated with the credential problem report message
     */
    async processProblemReport(messageContext) {
        const { message: credentialProblemReportMessage, agentContext } = messageContext;
        const connection = messageContext.assertReadyConnection();
        agentContext.config.logger.debug(`Processing problem report with message id ${credentialProblemReportMessage.id}`);
        const credentialRecord = await this.getByThreadAndConnectionId(agentContext, credentialProblemReportMessage.threadId, connection.id);
        // Update record
        credentialRecord.errorMessage = `${credentialProblemReportMessage.description.code}: ${credentialProblemReportMessage.description.en}`;
        await this.updateState(agentContext, credentialRecord, CredentialState_1.CredentialState.Abandoned);
        return credentialRecord;
    }
    /**
     * Update the record to a new state and emit an state changed event. Also updates the record
     * in storage.
     *
     * @param credentialRecord The credential record to update the state for
     * @param newState The state to update to
     *
     */
    async updateState(agentContext, credentialRecord, newState) {
        const credentialRepository = agentContext.dependencyManager.resolve(repository_1.CredentialRepository);
        agentContext.config.logger.debug(`Updating credential record ${credentialRecord.id} to state ${newState} (previous=${credentialRecord.state})`);
        const previousState = credentialRecord.state;
        credentialRecord.state = newState;
        await credentialRepository.update(agentContext, credentialRecord);
        this.emitStateChangedEvent(agentContext, credentialRecord, previousState);
    }
    emitStateChangedEvent(agentContext, credentialRecord, previousState) {
        const eventEmitter = agentContext.dependencyManager.resolve(EventEmitter_1.EventEmitter);
        eventEmitter.emit(agentContext, {
            type: CredentialEvents_1.CredentialEventTypes.CredentialStateChanged,
            payload: {
                credentialRecord: credentialRecord.clone(),
                previousState: previousState,
            },
        });
    }
    /**
     * Retrieve a credential record by id
     *
     * @param credentialRecordId The credential record id
     * @throws {RecordNotFoundError} If no record is found
     * @return The credential record
     *
     */
    getById(agentContext, credentialRecordId) {
        const credentialRepository = agentContext.dependencyManager.resolve(repository_1.CredentialRepository);
        return credentialRepository.getById(agentContext, credentialRecordId);
    }
    /**
     * Retrieve all credential records
     *
     * @returns List containing all credential records
     */
    getAll(agentContext) {
        const credentialRepository = agentContext.dependencyManager.resolve(repository_1.CredentialRepository);
        return credentialRepository.getAll(agentContext);
    }
    async findAllByQuery(agentContext, query) {
        const credentialRepository = agentContext.dependencyManager.resolve(repository_1.CredentialRepository);
        return credentialRepository.findByQuery(agentContext, query);
    }
    /**
     * Find a credential record by id
     *
     * @param credentialRecordId the credential record id
     * @returns The credential record or null if not found
     */
    findById(agentContext, proofRecordId) {
        const credentialRepository = agentContext.dependencyManager.resolve(repository_1.CredentialRepository);
        return credentialRepository.findById(agentContext, proofRecordId);
    }
    async delete(agentContext, credentialRecord, options) {
        var _a, _b;
        const credentialRepository = agentContext.dependencyManager.resolve(repository_1.CredentialRepository);
        const didCommMessageRepository = agentContext.dependencyManager.resolve(storage_1.DidCommMessageRepository);
        await credentialRepository.delete(agentContext, credentialRecord);
        const deleteAssociatedCredentials = (_a = options === null || options === void 0 ? void 0 : options.deleteAssociatedCredentials) !== null && _a !== void 0 ? _a : true;
        const deleteAssociatedDidCommMessages = (_b = options === null || options === void 0 ? void 0 : options.deleteAssociatedDidCommMessages) !== null && _b !== void 0 ? _b : true;
        if (deleteAssociatedCredentials) {
            for (const credential of credentialRecord.credentials) {
                const formatService = this.getFormatServiceForRecordType(credential.credentialRecordType);
                await formatService.deleteCredentialById(agentContext, credential.credentialRecordId);
            }
        }
        if (deleteAssociatedDidCommMessages) {
            const didCommMessages = await didCommMessageRepository.findByQuery(agentContext, {
                associatedRecordId: credentialRecord.id,
            });
            for (const didCommMessage of didCommMessages) {
                await didCommMessageRepository.delete(agentContext, didCommMessage);
            }
        }
    }
    /**
     * Retrieve a credential record by connection id and thread id
     *
     * @param connectionId The connection id
     * @param threadId The thread id
     * @throws {RecordNotFoundError} If no record is found
     * @throws {RecordDuplicateError} If multiple records are found
     * @returns The credential record
     */
    getByThreadAndConnectionId(agentContext, threadId, connectionId) {
        const credentialRepository = agentContext.dependencyManager.resolve(repository_1.CredentialRepository);
        return credentialRepository.getSingleByQuery(agentContext, {
            connectionId,
            threadId,
        });
    }
    /**
     * Find a credential record by connection id and thread id, returns null if not found
     *
     * @param connectionId The connection id
     * @param threadId The thread id
     * @returns The credential record
     */
    findByThreadAndConnectionId(agentContext, threadId, connectionId) {
        const credentialRepository = agentContext.dependencyManager.resolve(repository_1.CredentialRepository);
        return credentialRepository.findSingleByQuery(agentContext, {
            connectionId,
            threadId,
        });
    }
    async update(agentContext, credentialRecord) {
        const credentialRepository = agentContext.dependencyManager.resolve(repository_1.CredentialRepository);
        return await credentialRepository.update(agentContext, credentialRecord);
    }
}
exports.BaseCredentialProtocol = BaseCredentialProtocol;
//# sourceMappingURL=BaseCredentialProtocol.js.map