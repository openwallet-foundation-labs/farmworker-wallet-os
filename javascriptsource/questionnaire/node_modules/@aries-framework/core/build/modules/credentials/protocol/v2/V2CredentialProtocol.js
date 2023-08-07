"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.V2CredentialProtocol = void 0;
const Protocol_1 = require("../../../../agent/models/features/Protocol");
const error_1 = require("../../../../error");
const storage_1 = require("../../../../storage");
const uuid_1 = require("../../../../utils/uuid");
const common_1 = require("../../../common");
const connections_1 = require("../../../connections");
const CredentialsModuleConfig_1 = require("../../CredentialsModuleConfig");
const models_1 = require("../../models");
const repository_1 = require("../../repository");
const composeAutoAccept_1 = require("../../util/composeAutoAccept");
const previewAttributes_1 = require("../../util/previewAttributes");
const BaseCredentialProtocol_1 = require("../BaseCredentialProtocol");
const CredentialFormatCoordinator_1 = require("./CredentialFormatCoordinator");
const handlers_1 = require("./handlers");
const V2CredentialProblemReportHandler_1 = require("./handlers/V2CredentialProblemReportHandler");
const messages_1 = require("./messages");
class V2CredentialProtocol extends BaseCredentialProtocol_1.BaseCredentialProtocol {
    constructor({ credentialFormats }) {
        super();
        this.credentialFormatCoordinator = new CredentialFormatCoordinator_1.CredentialFormatCoordinator();
        /**
         * The version of the issue credential protocol this service supports
         */
        this.version = 'v2';
        this.credentialFormats = credentialFormats;
    }
    /**
     * Registers the protocol implementation (handlers, feature registry) on the agent.
     */
    register(dependencyManager, featureRegistry) {
        // Register message handlers for the Issue Credential V2 Protocol
        dependencyManager.registerMessageHandlers([
            new handlers_1.V2ProposeCredentialHandler(this),
            new handlers_1.V2OfferCredentialHandler(this),
            new handlers_1.V2RequestCredentialHandler(this),
            new handlers_1.V2IssueCredentialHandler(this),
            new handlers_1.V2CredentialAckHandler(this),
            new V2CredentialProblemReportHandler_1.V2CredentialProblemReportHandler(this),
        ]);
        // Register Issue Credential V2 in feature registry, with supported roles
        featureRegistry.register(new Protocol_1.Protocol({
            id: 'https://didcomm.org/issue-credential/2.0',
            roles: ['holder', 'issuer'],
        }));
    }
    /**
     * Create a {@link V2ProposeCredentialMessage} not bound to an existing credential exchange.
     *
     * @param proposal The ProposeCredentialOptions object containing the important fields for the credential message
     * @returns Object containing proposal message and associated credential record
     *
     */
    async createProposal(agentContext, { connectionRecord, credentialFormats, comment, autoAcceptCredential }) {
        agentContext.config.logger.debug('Get the Format Service and Create Proposal Message');
        const credentialRepository = agentContext.dependencyManager.resolve(repository_1.CredentialRepository);
        const formatServices = this.getFormatServices(credentialFormats);
        if (formatServices.length === 0) {
            throw new error_1.AriesFrameworkError(`Unable to create proposal. No supported formats`);
        }
        const credentialRecord = new repository_1.CredentialExchangeRecord({
            connectionId: connectionRecord.id,
            threadId: (0, uuid_1.uuid)(),
            state: models_1.CredentialState.ProposalSent,
            autoAcceptCredential,
            protocolVersion: 'v2',
        });
        const proposalMessage = await this.credentialFormatCoordinator.createProposal(agentContext, {
            credentialFormats,
            credentialRecord,
            formatServices,
            comment,
        });
        agentContext.config.logger.debug('Save record and emit state change event');
        await credentialRepository.save(agentContext, credentialRecord);
        this.emitStateChangedEvent(agentContext, credentialRecord, null);
        return { credentialRecord, message: proposalMessage };
    }
    /**
     * Method called by {@link V2ProposeCredentialHandler} on reception of a propose credential message
     * We do the necessary processing here to accept the proposal and do the state change, emit event etc.
     * @param messageContext the inbound propose credential message
     * @returns credential record appropriate for this incoming message (once accepted)
     */
    async processProposal(messageContext) {
        const { message: proposalMessage, connection, agentContext } = messageContext;
        agentContext.config.logger.debug(`Processing credential proposal with id ${proposalMessage.id}`);
        const credentialRepository = agentContext.dependencyManager.resolve(repository_1.CredentialRepository);
        const didCommMessageRepository = agentContext.dependencyManager.resolve(storage_1.DidCommMessageRepository);
        const connectionService = agentContext.dependencyManager.resolve(connections_1.ConnectionService);
        let credentialRecord = await this.findByThreadAndConnectionId(messageContext.agentContext, proposalMessage.threadId, connection === null || connection === void 0 ? void 0 : connection.id);
        const formatServices = this.getFormatServicesFromMessage(proposalMessage.formats);
        if (formatServices.length === 0) {
            throw new error_1.AriesFrameworkError(`Unable to process proposal. No supported formats`);
        }
        // credential record already exists
        if (credentialRecord) {
            const proposalCredentialMessage = await didCommMessageRepository.findAgentMessage(messageContext.agentContext, {
                associatedRecordId: credentialRecord.id,
                messageClass: messages_1.V2ProposeCredentialMessage,
            });
            const offerCredentialMessage = await didCommMessageRepository.findAgentMessage(messageContext.agentContext, {
                associatedRecordId: credentialRecord.id,
                messageClass: messages_1.V2OfferCredentialMessage,
            });
            // Assert
            credentialRecord.assertProtocolVersion('v2');
            credentialRecord.assertState(models_1.CredentialState.OfferSent);
            connectionService.assertConnectionOrServiceDecorator(messageContext, {
                previousReceivedMessage: proposalCredentialMessage !== null && proposalCredentialMessage !== void 0 ? proposalCredentialMessage : undefined,
                previousSentMessage: offerCredentialMessage !== null && offerCredentialMessage !== void 0 ? offerCredentialMessage : undefined,
            });
            await this.credentialFormatCoordinator.processProposal(messageContext.agentContext, {
                credentialRecord,
                formatServices,
                message: proposalMessage,
            });
            await this.updateState(messageContext.agentContext, credentialRecord, models_1.CredentialState.ProposalReceived);
            return credentialRecord;
        }
        else {
            // Assert
            connectionService.assertConnectionOrServiceDecorator(messageContext);
            // No credential record exists with thread id
            credentialRecord = new repository_1.CredentialExchangeRecord({
                connectionId: connection === null || connection === void 0 ? void 0 : connection.id,
                threadId: proposalMessage.threadId,
                state: models_1.CredentialState.ProposalReceived,
                protocolVersion: 'v2',
            });
            await this.credentialFormatCoordinator.processProposal(messageContext.agentContext, {
                credentialRecord,
                formatServices,
                message: proposalMessage,
            });
            // Save record and emit event
            await credentialRepository.save(messageContext.agentContext, credentialRecord);
            this.emitStateChangedEvent(messageContext.agentContext, credentialRecord, null);
            return credentialRecord;
        }
    }
    async acceptProposal(agentContext, { credentialRecord, credentialFormats, autoAcceptCredential, comment }) {
        // Assert
        credentialRecord.assertProtocolVersion('v2');
        credentialRecord.assertState(models_1.CredentialState.ProposalReceived);
        const didCommMessageRepository = agentContext.dependencyManager.resolve(storage_1.DidCommMessageRepository);
        // Use empty credentialFormats if not provided to denote all formats should be accepted
        let formatServices = this.getFormatServices(credentialFormats !== null && credentialFormats !== void 0 ? credentialFormats : {});
        // if no format services could be extracted from the credentialFormats
        // take all available format services from the proposal message
        if (formatServices.length === 0) {
            const proposalMessage = await didCommMessageRepository.getAgentMessage(agentContext, {
                associatedRecordId: credentialRecord.id,
                messageClass: messages_1.V2ProposeCredentialMessage,
            });
            formatServices = this.getFormatServicesFromMessage(proposalMessage.formats);
        }
        // If the format services list is still empty, throw an error as we don't support any
        // of the formats
        if (formatServices.length === 0) {
            throw new error_1.AriesFrameworkError(`Unable to accept proposal. No supported formats provided as input or in proposal message`);
        }
        const offerMessage = await this.credentialFormatCoordinator.acceptProposal(agentContext, {
            credentialRecord,
            formatServices,
            comment,
            credentialFormats,
        });
        credentialRecord.autoAcceptCredential = autoAcceptCredential !== null && autoAcceptCredential !== void 0 ? autoAcceptCredential : credentialRecord.autoAcceptCredential;
        await this.updateState(agentContext, credentialRecord, models_1.CredentialState.OfferSent);
        return { credentialRecord, message: offerMessage };
    }
    /**
     * Negotiate a credential proposal as issuer (by sending a credential offer message) to the connection
     * associated with the credential record.
     *
     * @param options configuration for the offer see {@link NegotiateCredentialProposalOptions}
     * @returns Credential exchange record associated with the credential offer
     *
     */
    async negotiateProposal(agentContext, { credentialRecord, credentialFormats, autoAcceptCredential, comment }) {
        // Assert
        credentialRecord.assertProtocolVersion('v2');
        credentialRecord.assertState(models_1.CredentialState.ProposalReceived);
        if (!credentialRecord.connectionId) {
            throw new error_1.AriesFrameworkError(`No connectionId found for credential record '${credentialRecord.id}'. Connection-less issuance does not support negotiation.`);
        }
        const formatServices = this.getFormatServices(credentialFormats);
        if (formatServices.length === 0) {
            throw new error_1.AriesFrameworkError(`Unable to create offer. No supported formats`);
        }
        const offerMessage = await this.credentialFormatCoordinator.createOffer(agentContext, {
            formatServices,
            credentialFormats,
            credentialRecord,
            comment,
        });
        credentialRecord.autoAcceptCredential = autoAcceptCredential !== null && autoAcceptCredential !== void 0 ? autoAcceptCredential : credentialRecord.autoAcceptCredential;
        await this.updateState(agentContext, credentialRecord, models_1.CredentialState.OfferSent);
        return { credentialRecord, message: offerMessage };
    }
    /**
     * Create a {@link V2OfferCredentialMessage} as beginning of protocol process. If no connectionId is provided, the
     * exchange will be created without a connection for usage in oob and connection-less issuance.
     *
     * @param formatService {@link CredentialFormatService} the format service object containing format-specific logic
     * @param options attributes of the original offer
     * @returns Object containing offer message and associated credential record
     *
     */
    async createOffer(agentContext, { credentialFormats, autoAcceptCredential, comment, connectionRecord }) {
        const credentialRepository = agentContext.dependencyManager.resolve(repository_1.CredentialRepository);
        const formatServices = this.getFormatServices(credentialFormats);
        if (formatServices.length === 0) {
            throw new error_1.AriesFrameworkError(`Unable to create offer. No supported formats`);
        }
        const credentialRecord = new repository_1.CredentialExchangeRecord({
            connectionId: connectionRecord === null || connectionRecord === void 0 ? void 0 : connectionRecord.id,
            threadId: (0, uuid_1.uuid)(),
            state: models_1.CredentialState.OfferSent,
            autoAcceptCredential,
            protocolVersion: 'v2',
        });
        const offerMessage = await this.credentialFormatCoordinator.createOffer(agentContext, {
            formatServices,
            credentialFormats,
            credentialRecord,
            comment,
        });
        agentContext.config.logger.debug(`Saving record and emitting state changed for credential exchange record ${credentialRecord.id}`);
        await credentialRepository.save(agentContext, credentialRecord);
        this.emitStateChangedEvent(agentContext, credentialRecord, null);
        return { credentialRecord, message: offerMessage };
    }
    /**
     * Method called by {@link V2OfferCredentialHandler} on reception of a offer credential message
     * We do the necessary processing here to accept the offer and do the state change, emit event etc.
     * @param messageContext the inbound offer credential message
     * @returns credential record appropriate for this incoming message (once accepted)
     */
    async processOffer(messageContext) {
        const { message: offerMessage, connection, agentContext } = messageContext;
        agentContext.config.logger.debug(`Processing credential offer with id ${offerMessage.id}`);
        const credentialRepository = agentContext.dependencyManager.resolve(repository_1.CredentialRepository);
        const didCommMessageRepository = agentContext.dependencyManager.resolve(storage_1.DidCommMessageRepository);
        const connectionService = agentContext.dependencyManager.resolve(connections_1.ConnectionService);
        let credentialRecord = await this.findByThreadAndConnectionId(messageContext.agentContext, offerMessage.threadId, connection === null || connection === void 0 ? void 0 : connection.id);
        const formatServices = this.getFormatServicesFromMessage(offerMessage.formats);
        if (formatServices.length === 0) {
            throw new error_1.AriesFrameworkError(`Unable to process offer. No supported formats`);
        }
        // credential record already exists
        if (credentialRecord) {
            const proposeCredentialMessage = await didCommMessageRepository.findAgentMessage(messageContext.agentContext, {
                associatedRecordId: credentialRecord.id,
                messageClass: messages_1.V2ProposeCredentialMessage,
            });
            const offerCredentialMessage = await didCommMessageRepository.findAgentMessage(messageContext.agentContext, {
                associatedRecordId: credentialRecord.id,
                messageClass: messages_1.V2OfferCredentialMessage,
            });
            credentialRecord.assertProtocolVersion('v2');
            credentialRecord.assertState(models_1.CredentialState.ProposalSent);
            connectionService.assertConnectionOrServiceDecorator(messageContext, {
                previousReceivedMessage: offerCredentialMessage !== null && offerCredentialMessage !== void 0 ? offerCredentialMessage : undefined,
                previousSentMessage: proposeCredentialMessage !== null && proposeCredentialMessage !== void 0 ? proposeCredentialMessage : undefined,
            });
            await this.credentialFormatCoordinator.processOffer(messageContext.agentContext, {
                credentialRecord,
                formatServices,
                message: offerMessage,
            });
            await this.updateState(messageContext.agentContext, credentialRecord, models_1.CredentialState.OfferReceived);
            return credentialRecord;
        }
        else {
            // Assert
            connectionService.assertConnectionOrServiceDecorator(messageContext);
            // No credential record exists with thread id
            agentContext.config.logger.debug('No credential record found for offer, creating a new one');
            credentialRecord = new repository_1.CredentialExchangeRecord({
                connectionId: connection === null || connection === void 0 ? void 0 : connection.id,
                threadId: offerMessage.threadId,
                state: models_1.CredentialState.OfferReceived,
                protocolVersion: 'v2',
            });
            await this.credentialFormatCoordinator.processOffer(messageContext.agentContext, {
                credentialRecord,
                formatServices,
                message: offerMessage,
            });
            // Save in repository
            agentContext.config.logger.debug('Saving credential record and emit offer-received event');
            await credentialRepository.save(messageContext.agentContext, credentialRecord);
            this.emitStateChangedEvent(messageContext.agentContext, credentialRecord, null);
            return credentialRecord;
        }
    }
    async acceptOffer(agentContext, { credentialRecord, autoAcceptCredential, comment, credentialFormats }) {
        const didCommMessageRepository = agentContext.dependencyManager.resolve(storage_1.DidCommMessageRepository);
        // Assert
        credentialRecord.assertProtocolVersion('v2');
        credentialRecord.assertState(models_1.CredentialState.OfferReceived);
        // Use empty credentialFormats if not provided to denote all formats should be accepted
        let formatServices = this.getFormatServices(credentialFormats !== null && credentialFormats !== void 0 ? credentialFormats : {});
        // if no format services could be extracted from the credentialFormats
        // take all available format services from the offer message
        if (formatServices.length === 0) {
            const offerMessage = await didCommMessageRepository.getAgentMessage(agentContext, {
                associatedRecordId: credentialRecord.id,
                messageClass: messages_1.V2OfferCredentialMessage,
            });
            formatServices = this.getFormatServicesFromMessage(offerMessage.formats);
        }
        // If the format services list is still empty, throw an error as we don't support any
        // of the formats
        if (formatServices.length === 0) {
            throw new error_1.AriesFrameworkError(`Unable to accept offer. No supported formats provided as input or in offer message`);
        }
        const message = await this.credentialFormatCoordinator.acceptOffer(agentContext, {
            credentialRecord,
            formatServices,
            comment,
            credentialFormats,
        });
        credentialRecord.autoAcceptCredential = autoAcceptCredential !== null && autoAcceptCredential !== void 0 ? autoAcceptCredential : credentialRecord.autoAcceptCredential;
        await this.updateState(agentContext, credentialRecord, models_1.CredentialState.RequestSent);
        return { credentialRecord, message };
    }
    /**
     * Create a {@link ProposePresentationMessage} as response to a received credential offer.
     * To create a proposal not bound to an existing credential exchange, use {@link createProposal}.
     *
     * @param options configuration to use for the proposal
     * @returns Object containing proposal message and associated credential record
     *
     */
    async negotiateOffer(agentContext, { credentialRecord, credentialFormats, autoAcceptCredential, comment }) {
        // Assert
        credentialRecord.assertProtocolVersion('v2');
        credentialRecord.assertState(models_1.CredentialState.OfferReceived);
        if (!credentialRecord.connectionId) {
            throw new error_1.AriesFrameworkError(`No connectionId found for credential record '${credentialRecord.id}'. Connection-less issuance does not support negotiation.`);
        }
        const formatServices = this.getFormatServices(credentialFormats);
        if (formatServices.length === 0) {
            throw new error_1.AriesFrameworkError(`Unable to create proposal. No supported formats`);
        }
        const proposalMessage = await this.credentialFormatCoordinator.createProposal(agentContext, {
            formatServices,
            credentialFormats,
            credentialRecord,
            comment,
        });
        credentialRecord.autoAcceptCredential = autoAcceptCredential !== null && autoAcceptCredential !== void 0 ? autoAcceptCredential : credentialRecord.autoAcceptCredential;
        await this.updateState(agentContext, credentialRecord, models_1.CredentialState.ProposalSent);
        return { credentialRecord, message: proposalMessage };
    }
    /**
     * Create a {@link V2RequestCredentialMessage} as beginning of protocol process.
     * @returns Object containing offer message and associated credential record
     *
     */
    async createRequest(agentContext, { credentialFormats, autoAcceptCredential, comment, connectionRecord }) {
        const credentialRepository = agentContext.dependencyManager.resolve(repository_1.CredentialRepository);
        const formatServices = this.getFormatServices(credentialFormats);
        if (formatServices.length === 0) {
            throw new error_1.AriesFrameworkError(`Unable to create request. No supported formats`);
        }
        const credentialRecord = new repository_1.CredentialExchangeRecord({
            connectionId: connectionRecord.id,
            threadId: (0, uuid_1.uuid)(),
            state: models_1.CredentialState.RequestSent,
            autoAcceptCredential,
            protocolVersion: 'v2',
        });
        const requestMessage = await this.credentialFormatCoordinator.createRequest(agentContext, {
            formatServices,
            credentialFormats,
            credentialRecord,
            comment,
        });
        agentContext.config.logger.debug(`Saving record and emitting state changed for credential exchange record ${credentialRecord.id}`);
        await credentialRepository.save(agentContext, credentialRecord);
        this.emitStateChangedEvent(agentContext, credentialRecord, null);
        return { credentialRecord, message: requestMessage };
    }
    /**
     * Process a received {@link RequestCredentialMessage}. This will not accept the credential request
     * or send a credential. It will only update the existing credential record with
     * the information from the credential request message. Use {@link createCredential}
     * after calling this method to create a credential.
     *z
     * @param messageContext The message context containing a v2 credential request message
     * @returns credential record associated with the credential request message
     *
     */
    async processRequest(messageContext) {
        const { message: requestMessage, connection, agentContext } = messageContext;
        const credentialRepository = agentContext.dependencyManager.resolve(repository_1.CredentialRepository);
        const didCommMessageRepository = agentContext.dependencyManager.resolve(storage_1.DidCommMessageRepository);
        const connectionService = agentContext.dependencyManager.resolve(connections_1.ConnectionService);
        agentContext.config.logger.debug(`Processing credential request with id ${requestMessage.id}`);
        let credentialRecord = await this.findByThreadAndConnectionId(messageContext.agentContext, requestMessage.threadId, connection === null || connection === void 0 ? void 0 : connection.id);
        const formatServices = this.getFormatServicesFromMessage(requestMessage.formats);
        if (formatServices.length === 0) {
            throw new error_1.AriesFrameworkError(`Unable to process request. No supported formats`);
        }
        // credential record already exists
        if (credentialRecord) {
            const proposalMessage = await didCommMessageRepository.findAgentMessage(messageContext.agentContext, {
                associatedRecordId: credentialRecord.id,
                messageClass: messages_1.V2ProposeCredentialMessage,
            });
            const offerMessage = await didCommMessageRepository.findAgentMessage(messageContext.agentContext, {
                associatedRecordId: credentialRecord.id,
                messageClass: messages_1.V2OfferCredentialMessage,
            });
            // Assert
            credentialRecord.assertProtocolVersion('v2');
            credentialRecord.assertState(models_1.CredentialState.OfferSent);
            connectionService.assertConnectionOrServiceDecorator(messageContext, {
                previousReceivedMessage: proposalMessage !== null && proposalMessage !== void 0 ? proposalMessage : undefined,
                previousSentMessage: offerMessage !== null && offerMessage !== void 0 ? offerMessage : undefined,
            });
            await this.credentialFormatCoordinator.processRequest(messageContext.agentContext, {
                credentialRecord,
                formatServices,
                message: requestMessage,
            });
            await this.updateState(messageContext.agentContext, credentialRecord, models_1.CredentialState.RequestReceived);
            return credentialRecord;
        }
        else {
            // Assert
            connectionService.assertConnectionOrServiceDecorator(messageContext);
            // No credential record exists with thread id
            agentContext.config.logger.debug('No credential record found for request, creating a new one');
            credentialRecord = new repository_1.CredentialExchangeRecord({
                connectionId: connection === null || connection === void 0 ? void 0 : connection.id,
                threadId: requestMessage.threadId,
                state: models_1.CredentialState.RequestReceived,
                protocolVersion: 'v2',
            });
            await this.credentialFormatCoordinator.processRequest(messageContext.agentContext, {
                credentialRecord,
                formatServices,
                message: requestMessage,
            });
            // Save in repository
            agentContext.config.logger.debug('Saving credential record and emit request-received event');
            await credentialRepository.save(messageContext.agentContext, credentialRecord);
            this.emitStateChangedEvent(messageContext.agentContext, credentialRecord, null);
            return credentialRecord;
        }
    }
    async acceptRequest(agentContext, { credentialRecord, autoAcceptCredential, comment, credentialFormats }) {
        const didCommMessageRepository = agentContext.dependencyManager.resolve(storage_1.DidCommMessageRepository);
        // Assert
        credentialRecord.assertProtocolVersion('v2');
        credentialRecord.assertState(models_1.CredentialState.RequestReceived);
        // Use empty credentialFormats if not provided to denote all formats should be accepted
        let formatServices = this.getFormatServices(credentialFormats !== null && credentialFormats !== void 0 ? credentialFormats : {});
        // if no format services could be extracted from the credentialFormats
        // take all available format services from the request message
        if (formatServices.length === 0) {
            const requestMessage = await didCommMessageRepository.getAgentMessage(agentContext, {
                associatedRecordId: credentialRecord.id,
                messageClass: messages_1.V2RequestCredentialMessage,
            });
            formatServices = this.getFormatServicesFromMessage(requestMessage.formats);
        }
        // If the format services list is still empty, throw an error as we don't support any
        // of the formats
        if (formatServices.length === 0) {
            throw new error_1.AriesFrameworkError(`Unable to accept request. No supported formats provided as input or in request message`);
        }
        const message = await this.credentialFormatCoordinator.acceptRequest(agentContext, {
            credentialRecord,
            formatServices,
            comment,
            credentialFormats,
        });
        credentialRecord.autoAcceptCredential = autoAcceptCredential !== null && autoAcceptCredential !== void 0 ? autoAcceptCredential : credentialRecord.autoAcceptCredential;
        await this.updateState(agentContext, credentialRecord, models_1.CredentialState.CredentialIssued);
        return { credentialRecord, message };
    }
    /**
     * Process a received {@link V2IssueCredentialMessage}. This will not accept the credential
     * or send a credential acknowledgement. It will only update the existing credential record with
     * the information from the issue credential message. Use {@link createAck}
     * after calling this method to create a credential acknowledgement.
     *
     * @param messageContext The message context containing an issue credential message
     *
     * @returns credential record associated with the issue credential message
     *
     */
    async processCredential(messageContext) {
        const { message: credentialMessage, connection, agentContext } = messageContext;
        const didCommMessageRepository = agentContext.dependencyManager.resolve(storage_1.DidCommMessageRepository);
        const connectionService = agentContext.dependencyManager.resolve(connections_1.ConnectionService);
        agentContext.config.logger.debug(`Processing credential with id ${credentialMessage.id}`);
        const credentialRecord = await this.getByThreadAndConnectionId(messageContext.agentContext, credentialMessage.threadId, connection === null || connection === void 0 ? void 0 : connection.id);
        const requestMessage = await didCommMessageRepository.getAgentMessage(messageContext.agentContext, {
            associatedRecordId: credentialRecord.id,
            messageClass: messages_1.V2RequestCredentialMessage,
        });
        const offerMessage = await didCommMessageRepository.findAgentMessage(messageContext.agentContext, {
            associatedRecordId: credentialRecord.id,
            messageClass: messages_1.V2OfferCredentialMessage,
        });
        // Assert
        credentialRecord.assertProtocolVersion('v2');
        credentialRecord.assertState(models_1.CredentialState.RequestSent);
        connectionService.assertConnectionOrServiceDecorator(messageContext, {
            previousReceivedMessage: offerMessage !== null && offerMessage !== void 0 ? offerMessage : undefined,
            previousSentMessage: requestMessage,
        });
        const formatServices = this.getFormatServicesFromMessage(credentialMessage.formats);
        if (formatServices.length === 0) {
            throw new error_1.AriesFrameworkError(`Unable to process credential. No supported formats`);
        }
        await this.credentialFormatCoordinator.processCredential(messageContext.agentContext, {
            credentialRecord,
            formatServices,
            requestMessage: requestMessage,
            message: credentialMessage,
        });
        await this.updateState(messageContext.agentContext, credentialRecord, models_1.CredentialState.CredentialReceived);
        return credentialRecord;
    }
    /**
     * Create a {@link V2CredentialAckMessage} as response to a received credential.
     *
     * @param credentialRecord The credential record for which to create the credential acknowledgement
     * @returns Object containing credential acknowledgement message and associated credential record
     *
     */
    async acceptCredential(agentContext, { credentialRecord }) {
        credentialRecord.assertProtocolVersion('v2');
        credentialRecord.assertState(models_1.CredentialState.CredentialReceived);
        // Create message
        const ackMessage = new messages_1.V2CredentialAckMessage({
            status: common_1.AckStatus.OK,
            threadId: credentialRecord.threadId,
        });
        await this.updateState(agentContext, credentialRecord, models_1.CredentialState.Done);
        return { message: ackMessage, credentialRecord };
    }
    /**
     * Process a received {@link CredentialAckMessage}.
     *
     * @param messageContext The message context containing a credential acknowledgement message
     * @returns credential record associated with the credential acknowledgement message
     *
     */
    async processAck(messageContext) {
        const { message: ackMessage, connection, agentContext } = messageContext;
        agentContext.config.logger.debug(`Processing credential ack with id ${ackMessage.id}`);
        const didCommMessageRepository = agentContext.dependencyManager.resolve(storage_1.DidCommMessageRepository);
        const connectionService = agentContext.dependencyManager.resolve(connections_1.ConnectionService);
        const credentialRecord = await this.getByThreadAndConnectionId(messageContext.agentContext, ackMessage.threadId, connection === null || connection === void 0 ? void 0 : connection.id);
        credentialRecord.connectionId = connection === null || connection === void 0 ? void 0 : connection.id;
        const requestMessage = await didCommMessageRepository.getAgentMessage(messageContext.agentContext, {
            associatedRecordId: credentialRecord.id,
            messageClass: messages_1.V2RequestCredentialMessage,
        });
        const credentialMessage = await didCommMessageRepository.getAgentMessage(messageContext.agentContext, {
            associatedRecordId: credentialRecord.id,
            messageClass: messages_1.V2IssueCredentialMessage,
        });
        // Assert
        credentialRecord.assertProtocolVersion('v2');
        credentialRecord.assertState(models_1.CredentialState.CredentialIssued);
        connectionService.assertConnectionOrServiceDecorator(messageContext, {
            previousReceivedMessage: requestMessage,
            previousSentMessage: credentialMessage,
        });
        // Update record
        await this.updateState(messageContext.agentContext, credentialRecord, models_1.CredentialState.Done);
        return credentialRecord;
    }
    /**
     * Create a {@link V2CredentialProblemReportMessage} to be sent.
     *
     * @param message message to send
     * @returns a {@link V2CredentialProblemReportMessage}
     *
     */
    async createProblemReport(agentContext, { credentialRecord, description }) {
        const message = new messages_1.V2CredentialProblemReportMessage({
            description: {
                en: description,
                code: models_1.CredentialProblemReportReason.IssuanceAbandoned,
            },
        });
        message.setThread({ threadId: credentialRecord.threadId });
        return { credentialRecord, message };
    }
    // AUTO ACCEPT METHODS
    async shouldAutoRespondToProposal(agentContext, options) {
        const { credentialRecord, proposalMessage } = options;
        const credentialsModuleConfig = agentContext.dependencyManager.resolve(CredentialsModuleConfig_1.CredentialsModuleConfig);
        const autoAccept = (0, composeAutoAccept_1.composeAutoAccept)(credentialRecord.autoAcceptCredential, credentialsModuleConfig.autoAcceptCredentials);
        // Handle always / never cases
        if (autoAccept === models_1.AutoAcceptCredential.Always)
            return true;
        if (autoAccept === models_1.AutoAcceptCredential.Never)
            return false;
        const offerMessage = await this.findOfferMessage(agentContext, credentialRecord.id);
        if (!offerMessage)
            return false;
        // NOTE: we take the formats from the offerMessage so we always check all services that we last sent
        // Otherwise we'll only check the formats from the proposal, which could be different from the formats
        // we use.
        const formatServices = this.getFormatServicesFromMessage(offerMessage.formats);
        for (const formatService of formatServices) {
            const offerAttachment = this.credentialFormatCoordinator.getAttachmentForService(formatService, offerMessage.formats, offerMessage.offerAttachments);
            const proposalAttachment = this.credentialFormatCoordinator.getAttachmentForService(formatService, proposalMessage.formats, proposalMessage.proposalAttachments);
            const shouldAutoRespondToFormat = await formatService.shouldAutoRespondToProposal(agentContext, {
                credentialRecord,
                offerAttachment,
                proposalAttachment,
            });
            // If any of the formats return false, we should not auto accept
            if (!shouldAutoRespondToFormat)
                return false;
        }
        // not all formats use the proposal and preview, we only check if they're present on
        // either or both of the messages
        if (proposalMessage.credentialPreview || offerMessage.credentialPreview) {
            // if one of the message doesn't have a preview, we should not auto accept
            if (!proposalMessage.credentialPreview || !offerMessage.credentialPreview)
                return false;
            // Check if preview values match
            return (0, previewAttributes_1.arePreviewAttributesEqual)(proposalMessage.credentialPreview.attributes, offerMessage.credentialPreview.attributes);
        }
        return true;
    }
    async shouldAutoRespondToOffer(agentContext, options) {
        var _a, _b, _c, _d;
        const { credentialRecord, offerMessage } = options;
        const credentialsModuleConfig = agentContext.dependencyManager.resolve(CredentialsModuleConfig_1.CredentialsModuleConfig);
        const autoAccept = (0, composeAutoAccept_1.composeAutoAccept)(credentialRecord.autoAcceptCredential, credentialsModuleConfig.autoAcceptCredentials);
        // Handle always / never cases
        if (autoAccept === models_1.AutoAcceptCredential.Always)
            return true;
        if (autoAccept === models_1.AutoAcceptCredential.Never)
            return false;
        const proposalMessage = await this.findProposalMessage(agentContext, credentialRecord.id);
        if (!proposalMessage)
            return false;
        // NOTE: we take the formats from the proposalMessage so we always check all services that we last sent
        // Otherwise we'll only check the formats from the offer, which could be different from the formats
        // we use.
        const formatServices = this.getFormatServicesFromMessage(proposalMessage.formats);
        for (const formatService of formatServices) {
            const offerAttachment = this.credentialFormatCoordinator.getAttachmentForService(formatService, offerMessage.formats, offerMessage.offerAttachments);
            const proposalAttachment = this.credentialFormatCoordinator.getAttachmentForService(formatService, proposalMessage.formats, proposalMessage.proposalAttachments);
            const shouldAutoRespondToFormat = await formatService.shouldAutoRespondToOffer(agentContext, {
                credentialRecord,
                offerAttachment,
                proposalAttachment,
            });
            // If any of the formats return false, we should not auto accept
            if (!shouldAutoRespondToFormat)
                return false;
        }
        // if one of the message doesn't have a preview, we should not auto accept
        if (proposalMessage.credentialPreview || offerMessage.credentialPreview) {
            // Check if preview values match
            return (0, previewAttributes_1.arePreviewAttributesEqual)((_b = (_a = proposalMessage.credentialPreview) === null || _a === void 0 ? void 0 : _a.attributes) !== null && _b !== void 0 ? _b : [], (_d = (_c = offerMessage.credentialPreview) === null || _c === void 0 ? void 0 : _c.attributes) !== null && _d !== void 0 ? _d : []);
        }
        return true;
    }
    async shouldAutoRespondToRequest(agentContext, options) {
        const { credentialRecord, requestMessage } = options;
        const credentialsModuleConfig = agentContext.dependencyManager.resolve(CredentialsModuleConfig_1.CredentialsModuleConfig);
        const autoAccept = (0, composeAutoAccept_1.composeAutoAccept)(credentialRecord.autoAcceptCredential, credentialsModuleConfig.autoAcceptCredentials);
        // Handle always / never cases
        if (autoAccept === models_1.AutoAcceptCredential.Always)
            return true;
        if (autoAccept === models_1.AutoAcceptCredential.Never)
            return false;
        const proposalMessage = await this.findProposalMessage(agentContext, credentialRecord.id);
        const offerMessage = await this.findOfferMessage(agentContext, credentialRecord.id);
        if (!offerMessage)
            return false;
        // NOTE: we take the formats from the offerMessage so we always check all services that we last sent
        // Otherwise we'll only check the formats from the request, which could be different from the formats
        // we use.
        const formatServices = this.getFormatServicesFromMessage(offerMessage.formats);
        for (const formatService of formatServices) {
            const offerAttachment = this.credentialFormatCoordinator.getAttachmentForService(formatService, offerMessage.formats, offerMessage.offerAttachments);
            const proposalAttachment = proposalMessage
                ? this.credentialFormatCoordinator.getAttachmentForService(formatService, proposalMessage.formats, proposalMessage.proposalAttachments)
                : undefined;
            const requestAttachment = this.credentialFormatCoordinator.getAttachmentForService(formatService, requestMessage.formats, requestMessage.requestAttachments);
            const shouldAutoRespondToFormat = await formatService.shouldAutoRespondToRequest(agentContext, {
                credentialRecord,
                offerAttachment,
                requestAttachment,
                proposalAttachment,
            });
            // If any of the formats return false, we should not auto accept
            if (!shouldAutoRespondToFormat)
                return false;
        }
        return true;
    }
    async shouldAutoRespondToCredential(agentContext, options) {
        const { credentialRecord, credentialMessage } = options;
        const credentialsModuleConfig = agentContext.dependencyManager.resolve(CredentialsModuleConfig_1.CredentialsModuleConfig);
        const autoAccept = (0, composeAutoAccept_1.composeAutoAccept)(credentialRecord.autoAcceptCredential, credentialsModuleConfig.autoAcceptCredentials);
        // Handle always / never cases
        if (autoAccept === models_1.AutoAcceptCredential.Always)
            return true;
        if (autoAccept === models_1.AutoAcceptCredential.Never)
            return false;
        const proposalMessage = await this.findProposalMessage(agentContext, credentialRecord.id);
        const offerMessage = await this.findOfferMessage(agentContext, credentialRecord.id);
        const requestMessage = await this.findRequestMessage(agentContext, credentialRecord.id);
        if (!requestMessage)
            return false;
        // NOTE: we take the formats from the requestMessage so we always check all services that we last sent
        // Otherwise we'll only check the formats from the credential, which could be different from the formats
        // we use.
        const formatServices = this.getFormatServicesFromMessage(requestMessage.formats);
        for (const formatService of formatServices) {
            const offerAttachment = offerMessage
                ? this.credentialFormatCoordinator.getAttachmentForService(formatService, offerMessage.formats, offerMessage.offerAttachments)
                : undefined;
            const proposalAttachment = proposalMessage
                ? this.credentialFormatCoordinator.getAttachmentForService(formatService, proposalMessage.formats, proposalMessage.proposalAttachments)
                : undefined;
            const requestAttachment = this.credentialFormatCoordinator.getAttachmentForService(formatService, requestMessage.formats, requestMessage.requestAttachments);
            const credentialAttachment = this.credentialFormatCoordinator.getAttachmentForService(formatService, credentialMessage.formats, credentialMessage.credentialAttachments);
            const shouldAutoRespondToFormat = await formatService.shouldAutoRespondToCredential(agentContext, {
                credentialRecord,
                offerAttachment,
                credentialAttachment,
                requestAttachment,
                proposalAttachment,
            });
            // If any of the formats return false, we should not auto accept
            if (!shouldAutoRespondToFormat)
                return false;
        }
        return true;
    }
    async findProposalMessage(agentContext, credentialExchangeId) {
        const didCommMessageRepository = agentContext.dependencyManager.resolve(storage_1.DidCommMessageRepository);
        return didCommMessageRepository.findAgentMessage(agentContext, {
            associatedRecordId: credentialExchangeId,
            messageClass: messages_1.V2ProposeCredentialMessage,
        });
    }
    async findOfferMessage(agentContext, credentialExchangeId) {
        const didCommMessageRepository = agentContext.dependencyManager.resolve(storage_1.DidCommMessageRepository);
        return await didCommMessageRepository.findAgentMessage(agentContext, {
            associatedRecordId: credentialExchangeId,
            messageClass: messages_1.V2OfferCredentialMessage,
        });
    }
    async findRequestMessage(agentContext, credentialExchangeId) {
        const didCommMessageRepository = agentContext.dependencyManager.resolve(storage_1.DidCommMessageRepository);
        return await didCommMessageRepository.findAgentMessage(agentContext, {
            associatedRecordId: credentialExchangeId,
            messageClass: messages_1.V2RequestCredentialMessage,
        });
    }
    async findCredentialMessage(agentContext, credentialExchangeId) {
        const didCommMessageRepository = agentContext.dependencyManager.resolve(storage_1.DidCommMessageRepository);
        return await didCommMessageRepository.findAgentMessage(agentContext, {
            associatedRecordId: credentialExchangeId,
            messageClass: messages_1.V2IssueCredentialMessage,
        });
    }
    async getFormatData(agentContext, credentialExchangeId) {
        var _a, _b;
        // TODO: we could looking at fetching all record using a single query and then filtering based on the type of the message.
        const [proposalMessage, offerMessage, requestMessage, credentialMessage] = await Promise.all([
            this.findProposalMessage(agentContext, credentialExchangeId),
            this.findOfferMessage(agentContext, credentialExchangeId),
            this.findRequestMessage(agentContext, credentialExchangeId),
            this.findCredentialMessage(agentContext, credentialExchangeId),
        ]);
        // Create object with the keys and the message formats/attachments. We can then loop over this in a generic
        // way so we don't have to add the same operation code four times
        const messages = {
            proposal: [proposalMessage === null || proposalMessage === void 0 ? void 0 : proposalMessage.formats, proposalMessage === null || proposalMessage === void 0 ? void 0 : proposalMessage.proposalAttachments],
            offer: [offerMessage === null || offerMessage === void 0 ? void 0 : offerMessage.formats, offerMessage === null || offerMessage === void 0 ? void 0 : offerMessage.offerAttachments],
            request: [requestMessage === null || requestMessage === void 0 ? void 0 : requestMessage.formats, requestMessage === null || requestMessage === void 0 ? void 0 : requestMessage.requestAttachments],
            credential: [credentialMessage === null || credentialMessage === void 0 ? void 0 : credentialMessage.formats, credentialMessage === null || credentialMessage === void 0 ? void 0 : credentialMessage.credentialAttachments],
        };
        const formatData = {
            proposalAttributes: (_a = proposalMessage === null || proposalMessage === void 0 ? void 0 : proposalMessage.credentialPreview) === null || _a === void 0 ? void 0 : _a.attributes,
            offerAttributes: (_b = offerMessage === null || offerMessage === void 0 ? void 0 : offerMessage.credentialPreview) === null || _b === void 0 ? void 0 : _b.attributes,
        };
        // We loop through all of the message keys as defined above
        for (const [messageKey, [formats, attachments]] of Object.entries(messages)) {
            // Message can be undefined, so we continue if it is not defined
            if (!formats || !attachments)
                continue;
            // Find all format services associated with the message
            const formatServices = this.getFormatServicesFromMessage(formats);
            const messageFormatData = {};
            // Loop through all of the format services, for each we will extract the attachment data and assign this to the object
            // using the unique format key (e.g. indy)
            for (const formatService of formatServices) {
                const attachment = this.credentialFormatCoordinator.getAttachmentForService(formatService, formats, attachments);
                messageFormatData[formatService.formatKey] = attachment.getDataAsJson();
            }
            formatData[messageKey] =
                messageFormatData;
        }
        return formatData;
    }
    /**
     * Get all the format service objects for a given credential format from an incoming message
     * @param messageFormats the format objects containing the format name (eg indy)
     * @return the credential format service objects in an array - derived from format object keys
     */
    getFormatServicesFromMessage(messageFormats) {
        const formatServices = new Set();
        for (const msg of messageFormats) {
            const service = this.getFormatServiceForFormat(msg.format);
            if (service)
                formatServices.add(service);
        }
        return Array.from(formatServices);
    }
    /**
     * Get all the format service objects for a given credential format
     * @param credentialFormats the format object containing various optional parameters
     * @return the credential format service objects in an array - derived from format object keys
     */
    getFormatServices(credentialFormats) {
        const formats = new Set();
        for (const formatKey of Object.keys(credentialFormats)) {
            const formatService = this.getFormatServiceForFormatKey(formatKey);
            if (formatService)
                formats.add(formatService);
        }
        return Array.from(formats);
    }
    getFormatServiceForFormatKey(formatKey) {
        const formatService = this.credentialFormats.find((credentialFormat) => credentialFormat.formatKey === formatKey);
        return formatService !== null && formatService !== void 0 ? formatService : null;
    }
    getFormatServiceForFormat(format) {
        const formatService = this.credentialFormats.find((credentialFormat) => credentialFormat.supportsFormat(format));
        return formatService !== null && formatService !== void 0 ? formatService : null;
    }
    getFormatServiceForRecordType(credentialRecordType) {
        const formatService = this.credentialFormats.find((credentialFormat) => credentialFormat.credentialRecordType === credentialRecordType);
        if (!formatService) {
            throw new error_1.AriesFrameworkError(`No format service found for credential record type ${credentialRecordType} in v2 credential protocol`);
        }
        return formatService;
    }
}
exports.V2CredentialProtocol = V2CredentialProtocol;
//# sourceMappingURL=V2CredentialProtocol.js.map