"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CredentialsApi = void 0;
const agent_1 = require("../../agent");
const MessageSender_1 = require("../../agent/MessageSender");
const models_1 = require("../../agent/models");
const constants_1 = require("../../constants");
const ServiceDecorator_1 = require("../../decorators/service/ServiceDecorator");
const error_1 = require("../../error");
const plugins_1 = require("../../plugins");
const storage_1 = require("../../storage");
const DidCommMessageRepository_1 = require("../../storage/didcomm/DidCommMessageRepository");
const services_1 = require("../connections/services");
const RoutingService_1 = require("../routing/services/RoutingService");
const CredentialsModuleConfig_1 = require("./CredentialsModuleConfig");
const CredentialState_1 = require("./models/CredentialState");
const services_2 = require("./protocol/revocation-notification/services");
const CredentialRepository_1 = require("./repository/CredentialRepository");
let CredentialsApi = class CredentialsApi {
    constructor(messageSender, connectionService, agentContext, logger, credentialRepository, mediationRecipientService, didCommMessageRepository, 
    // only injected so the handlers will be registered
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _revocationNotificationService, config) {
        this.messageSender = messageSender;
        this.connectionService = connectionService;
        this.credentialRepository = credentialRepository;
        this.routingService = mediationRecipientService;
        this.agentContext = agentContext;
        this.didCommMessageRepository = didCommMessageRepository;
        this.logger = logger;
        this.config = config;
    }
    getProtocol(protocolVersion) {
        const credentialProtocol = this.config.credentialProtocols.find((protocol) => protocol.version === protocolVersion);
        if (!credentialProtocol) {
            throw new error_1.AriesFrameworkError(`No credential protocol registered for protocol version ${protocolVersion}`);
        }
        return credentialProtocol;
    }
    /**
     * Initiate a new credential exchange as holder by sending a credential proposal message
     * to the connection with the specified connection id.
     *
     * @param options configuration to use for the proposal
     * @returns Credential exchange record associated with the sent proposal message
     */
    async proposeCredential(options) {
        const protocol = this.getProtocol(options.protocolVersion);
        const connectionRecord = await this.connectionService.getById(this.agentContext, options.connectionId);
        // Assert
        connectionRecord.assertReady();
        // will get back a credential record -> map to Credential Exchange Record
        const { credentialRecord, message } = await protocol.createProposal(this.agentContext, {
            connectionRecord,
            credentialFormats: options.credentialFormats,
            comment: options.comment,
            autoAcceptCredential: options.autoAcceptCredential,
        });
        // send the message here
        const outboundMessageContext = new models_1.OutboundMessageContext(message, {
            agentContext: this.agentContext,
            connection: connectionRecord,
            associatedRecord: credentialRecord,
        });
        await this.messageSender.sendMessage(outboundMessageContext);
        return credentialRecord;
    }
    /**
     * Accept a credential proposal as issuer (by sending a credential offer message) to the connection
     * associated with the credential record.
     *
     * @param options config object for accepting the proposal
     * @returns Credential exchange record associated with the credential offer
     *
     */
    async acceptProposal(options) {
        const credentialRecord = await this.getById(options.credentialRecordId);
        if (!credentialRecord.connectionId) {
            throw new error_1.AriesFrameworkError(`No connectionId found for credential record '${credentialRecord.id}'. Connection-less issuance does not support credential proposal or negotiation.`);
        }
        // with version we can get the protocol
        const protocol = this.getProtocol(credentialRecord.protocolVersion);
        const connectionRecord = await this.connectionService.getById(this.agentContext, credentialRecord.connectionId);
        // Assert
        connectionRecord.assertReady();
        // will get back a credential record -> map to Credential Exchange Record
        const { message } = await protocol.acceptProposal(this.agentContext, {
            credentialRecord,
            credentialFormats: options.credentialFormats,
            comment: options.comment,
            autoAcceptCredential: options.autoAcceptCredential,
        });
        // send the message
        const outboundMessageContext = new models_1.OutboundMessageContext(message, {
            agentContext: this.agentContext,
            connection: connectionRecord,
            associatedRecord: credentialRecord,
        });
        await this.messageSender.sendMessage(outboundMessageContext);
        return credentialRecord;
    }
    /**
     * Negotiate a credential proposal as issuer (by sending a credential offer message) to the connection
     * associated with the credential record.
     *
     * @param options configuration for the offer see {@link NegotiateCredentialProposalOptions}
     * @returns Credential exchange record associated with the credential offer
     *
     */
    async negotiateProposal(options) {
        const credentialRecord = await this.getById(options.credentialRecordId);
        if (!credentialRecord.connectionId) {
            throw new error_1.AriesFrameworkError(`No connection id for credential record ${credentialRecord.id} not found. Connection-less issuance does not support negotiation`);
        }
        // with version we can get the Service
        const protocol = this.getProtocol(credentialRecord.protocolVersion);
        const { message } = await protocol.negotiateProposal(this.agentContext, {
            credentialRecord,
            credentialFormats: options.credentialFormats,
            comment: options.comment,
            autoAcceptCredential: options.autoAcceptCredential,
        });
        const connection = await this.connectionService.getById(this.agentContext, credentialRecord.connectionId);
        const outboundMessageContext = new models_1.OutboundMessageContext(message, {
            agentContext: this.agentContext,
            connection,
            associatedRecord: credentialRecord,
        });
        await this.messageSender.sendMessage(outboundMessageContext);
        return credentialRecord;
    }
    /**
     * Initiate a new credential exchange as issuer by sending a credential offer message
     * to the connection with the specified connection id.
     *
     * @param options config options for the credential offer
     * @returns Credential exchange record associated with the sent credential offer message
     */
    async offerCredential(options) {
        const connectionRecord = await this.connectionService.getById(this.agentContext, options.connectionId);
        const protocol = this.getProtocol(options.protocolVersion);
        this.logger.debug(`Got a credentialProtocol object for version ${options.protocolVersion}`);
        const { message, credentialRecord } = await protocol.createOffer(this.agentContext, {
            credentialFormats: options.credentialFormats,
            autoAcceptCredential: options.autoAcceptCredential,
            comment: options.comment,
            connectionRecord,
        });
        this.logger.debug('Offer Message successfully created; message= ', message);
        const outboundMessageContext = new models_1.OutboundMessageContext(message, {
            agentContext: this.agentContext,
            connection: connectionRecord,
            associatedRecord: credentialRecord,
        });
        await this.messageSender.sendMessage(outboundMessageContext);
        return credentialRecord;
    }
    /**
     * Accept a credential offer as holder (by sending a credential request message) to the connection
     * associated with the credential record.
     *
     * @param options The object containing config options of the offer to be accepted
     * @returns Object containing offer associated credential record
     */
    async acceptOffer(options) {
        const credentialRecord = await this.getById(options.credentialRecordId);
        const protocol = this.getProtocol(credentialRecord.protocolVersion);
        this.logger.debug(`Got a credentialProtocol object for this version; version = ${protocol.version}`);
        const offerMessage = await protocol.findOfferMessage(this.agentContext, credentialRecord.id);
        // Use connection if present
        if (credentialRecord.connectionId) {
            const connectionRecord = await this.connectionService.getById(this.agentContext, credentialRecord.connectionId);
            // Assert
            connectionRecord.assertReady();
            const { message } = await protocol.acceptOffer(this.agentContext, {
                credentialRecord,
                credentialFormats: options.credentialFormats,
                comment: options.comment,
                autoAcceptCredential: options.autoAcceptCredential,
            });
            const outboundMessageContext = new models_1.OutboundMessageContext(message, {
                agentContext: this.agentContext,
                connection: connectionRecord,
                associatedRecord: credentialRecord,
            });
            await this.messageSender.sendMessage(outboundMessageContext);
            return credentialRecord;
        }
        // Use ~service decorator otherwise
        else if (offerMessage === null || offerMessage === void 0 ? void 0 : offerMessage.service) {
            // Create ~service decorator
            const routing = await this.routingService.getRouting(this.agentContext);
            const ourService = new ServiceDecorator_1.ServiceDecorator({
                serviceEndpoint: routing.endpoints[0],
                recipientKeys: [routing.recipientKey.publicKeyBase58],
                routingKeys: routing.routingKeys.map((key) => key.publicKeyBase58),
            });
            const recipientService = offerMessage.service;
            const { message } = await protocol.acceptOffer(this.agentContext, {
                credentialRecord,
                credentialFormats: options.credentialFormats,
                comment: options.comment,
                autoAcceptCredential: options.autoAcceptCredential,
            });
            // Set and save ~service decorator to record (to remember our verkey)
            message.service = ourService;
            await this.didCommMessageRepository.saveOrUpdateAgentMessage(this.agentContext, {
                agentMessage: message,
                role: storage_1.DidCommMessageRole.Sender,
                associatedRecordId: credentialRecord.id,
            });
            await this.messageSender.sendMessageToService(new models_1.OutboundMessageContext(message, {
                agentContext: this.agentContext,
                serviceParams: {
                    service: recipientService.resolvedDidCommService,
                    senderKey: ourService.resolvedDidCommService.recipientKeys[0],
                    returnRoute: true,
                },
            }));
            return credentialRecord;
        }
        // Cannot send message without connectionId or ~service decorator
        else {
            throw new error_1.AriesFrameworkError(`Cannot accept offer for credential record without connectionId or ~service decorator on credential offer.`);
        }
    }
    async declineOffer(credentialRecordId) {
        const credentialRecord = await this.getById(credentialRecordId);
        credentialRecord.assertState(CredentialState_1.CredentialState.OfferReceived);
        // with version we can get the Service
        const protocol = this.getProtocol(credentialRecord.protocolVersion);
        await protocol.updateState(this.agentContext, credentialRecord, CredentialState_1.CredentialState.Declined);
        return credentialRecord;
    }
    async negotiateOffer(options) {
        const credentialRecord = await this.getById(options.credentialRecordId);
        if (!credentialRecord.connectionId) {
            throw new error_1.AriesFrameworkError(`No connection id for credential record ${credentialRecord.id} not found. Connection-less issuance does not support negotiation`);
        }
        const connectionRecord = await this.connectionService.getById(this.agentContext, credentialRecord.connectionId);
        // Assert
        connectionRecord.assertReady();
        const protocol = this.getProtocol(credentialRecord.protocolVersion);
        const { message } = await protocol.negotiateOffer(this.agentContext, {
            credentialFormats: options.credentialFormats,
            credentialRecord,
            comment: options.comment,
            autoAcceptCredential: options.autoAcceptCredential,
        });
        const outboundMessageContext = new models_1.OutboundMessageContext(message, {
            agentContext: this.agentContext,
            connection: connectionRecord,
            associatedRecord: credentialRecord,
        });
        await this.messageSender.sendMessage(outboundMessageContext);
        return credentialRecord;
    }
    /**
     * Initiate a new credential exchange as issuer by creating a credential offer
     * not bound to any connection. The offer must be delivered out-of-band to the holder
     * @param options The credential options to use for the offer
     * @returns The credential record and credential offer message
     */
    async createOffer(options) {
        const protocol = this.getProtocol(options.protocolVersion);
        this.logger.debug(`Got a credentialProtocol object for version ${options.protocolVersion}`);
        const { message, credentialRecord } = await protocol.createOffer(this.agentContext, {
            credentialFormats: options.credentialFormats,
            comment: options.comment,
            autoAcceptCredential: options.autoAcceptCredential,
        });
        this.logger.debug('Offer Message successfully created; message= ', message);
        return { message, credentialRecord };
    }
    /**
     * Accept a credential request as holder (by sending a credential request message) to the connection
     * associated with the credential record.
     *
     * @param options The object containing config options of the request
     * @returns CredentialExchangeRecord updated with information pertaining to this request
     */
    async acceptRequest(options) {
        const credentialRecord = await this.getById(options.credentialRecordId);
        // with version we can get the Service
        const protocol = this.getProtocol(credentialRecord.protocolVersion);
        this.logger.debug(`Got a credentialProtocol object for version ${credentialRecord.protocolVersion}`);
        const { message } = await protocol.acceptRequest(this.agentContext, {
            credentialRecord,
            credentialFormats: options.credentialFormats,
            comment: options.comment,
            autoAcceptCredential: options.autoAcceptCredential,
        });
        this.logger.debug('We have a credential message (sending outbound): ', message);
        const requestMessage = await protocol.findRequestMessage(this.agentContext, credentialRecord.id);
        const offerMessage = await protocol.findOfferMessage(this.agentContext, credentialRecord.id);
        // Use connection if present
        if (credentialRecord.connectionId) {
            const connection = await this.connectionService.getById(this.agentContext, credentialRecord.connectionId);
            const outboundMessageContext = new models_1.OutboundMessageContext(message, {
                agentContext: this.agentContext,
                connection,
                associatedRecord: credentialRecord,
            });
            await this.messageSender.sendMessage(outboundMessageContext);
            return credentialRecord;
        }
        // Use ~service decorator otherwise
        else if ((requestMessage === null || requestMessage === void 0 ? void 0 : requestMessage.service) && (offerMessage === null || offerMessage === void 0 ? void 0 : offerMessage.service)) {
            const recipientService = requestMessage.service;
            const ourService = offerMessage.service;
            message.service = ourService;
            await this.didCommMessageRepository.saveOrUpdateAgentMessage(this.agentContext, {
                agentMessage: message,
                role: storage_1.DidCommMessageRole.Sender,
                associatedRecordId: credentialRecord.id,
            });
            await this.messageSender.sendMessageToService(new models_1.OutboundMessageContext(message, {
                agentContext: this.agentContext,
                serviceParams: {
                    service: recipientService.resolvedDidCommService,
                    senderKey: ourService.resolvedDidCommService.recipientKeys[0],
                    returnRoute: true,
                },
            }));
            return credentialRecord;
        }
        // Cannot send message without connectionId or ~service decorator
        else {
            throw new error_1.AriesFrameworkError(`Cannot accept request for credential record without connectionId or ~service decorator on credential offer / request.`);
        }
    }
    /**
     * Accept a credential as holder (by sending a credential acknowledgement message) to the connection
     * associated with the credential record.
     *
     * @param credentialRecordId The id of the credential record for which to accept the credential
     * @returns credential exchange record associated with the sent credential acknowledgement message
     *
     */
    async acceptCredential(options) {
        const credentialRecord = await this.getById(options.credentialRecordId);
        // with version we can get the Service
        const protocol = this.getProtocol(credentialRecord.protocolVersion);
        this.logger.debug(`Got a credentialProtocol object for version ${credentialRecord.protocolVersion}`);
        const { message } = await protocol.acceptCredential(this.agentContext, {
            credentialRecord,
        });
        const requestMessage = await protocol.findRequestMessage(this.agentContext, credentialRecord.id);
        const credentialMessage = await protocol.findCredentialMessage(this.agentContext, credentialRecord.id);
        if (credentialRecord.connectionId) {
            const connection = await this.connectionService.getById(this.agentContext, credentialRecord.connectionId);
            const outboundMessageContext = new models_1.OutboundMessageContext(message, {
                agentContext: this.agentContext,
                connection,
                associatedRecord: credentialRecord,
            });
            await this.messageSender.sendMessage(outboundMessageContext);
            return credentialRecord;
        }
        // Use ~service decorator otherwise
        else if ((credentialMessage === null || credentialMessage === void 0 ? void 0 : credentialMessage.service) && (requestMessage === null || requestMessage === void 0 ? void 0 : requestMessage.service)) {
            const recipientService = credentialMessage.service;
            const ourService = requestMessage.service;
            await this.messageSender.sendMessageToService(new models_1.OutboundMessageContext(message, {
                agentContext: this.agentContext,
                serviceParams: {
                    service: recipientService.resolvedDidCommService,
                    senderKey: ourService.resolvedDidCommService.recipientKeys[0],
                    returnRoute: false, // hard wire to be false since it's the end of the protocol so not needed here
                },
            }));
            return credentialRecord;
        }
        // Cannot send message without connectionId or ~service decorator
        else {
            throw new error_1.AriesFrameworkError(`Cannot accept credential without connectionId or ~service decorator on credential message.`);
        }
    }
    /**
     * Send problem report message for a credential record
     * @param credentialRecordId The id of the credential record for which to send problem report
     * @param message message to send
     * @returns credential record associated with the credential problem report message
     */
    async sendProblemReport(options) {
        const credentialRecord = await this.getById(options.credentialRecordId);
        if (!credentialRecord.connectionId) {
            throw new error_1.AriesFrameworkError(`No connectionId found for credential record '${credentialRecord.id}'.`);
        }
        const connection = await this.connectionService.getById(this.agentContext, credentialRecord.connectionId);
        const protocol = this.getProtocol(credentialRecord.protocolVersion);
        const { message } = await protocol.createProblemReport(this.agentContext, {
            description: options.description,
            credentialRecord,
        });
        message.setThread({
            threadId: credentialRecord.threadId,
        });
        const outboundMessageContext = new models_1.OutboundMessageContext(message, {
            agentContext: this.agentContext,
            connection,
            associatedRecord: credentialRecord,
        });
        await this.messageSender.sendMessage(outboundMessageContext);
        return credentialRecord;
    }
    async getFormatData(credentialRecordId) {
        const credentialRecord = await this.getById(credentialRecordId);
        const protocol = this.getProtocol(credentialRecord.protocolVersion);
        return protocol.getFormatData(this.agentContext, credentialRecordId);
    }
    /**
     * Retrieve a credential record by id
     *
     * @param credentialRecordId The credential record id
     * @throws {RecordNotFoundError} If no record is found
     * @return The credential record
     *
     */
    getById(credentialRecordId) {
        return this.credentialRepository.getById(this.agentContext, credentialRecordId);
    }
    /**
     * Retrieve all credential records
     *
     * @returns List containing all credential records
     */
    getAll() {
        return this.credentialRepository.getAll(this.agentContext);
    }
    /**
     * Retrieve all credential records by specified query params
     *
     * @returns List containing all credential records matching specified query paramaters
     */
    findAllByQuery(query) {
        return this.credentialRepository.findByQuery(this.agentContext, query);
    }
    /**
     * Find a credential record by id
     *
     * @param credentialRecordId the credential record id
     * @returns The credential record or null if not found
     */
    findById(credentialRecordId) {
        return this.credentialRepository.findById(this.agentContext, credentialRecordId);
    }
    /**
     * Delete a credential record by id, also calls service to delete from wallet
     *
     * @param credentialId the credential record id
     * @param options the delete credential options for the delete operation
     */
    async deleteById(credentialId, options) {
        const credentialRecord = await this.getById(credentialId);
        const protocol = this.getProtocol(credentialRecord.protocolVersion);
        return protocol.delete(this.agentContext, credentialRecord, options);
    }
    /**
     * Update a credential exchange record
     *
     * @param credentialRecord the credential exchange record
     */
    async update(credentialRecord) {
        await this.credentialRepository.update(this.agentContext, credentialRecord);
    }
    async findProposalMessage(credentialExchangeId) {
        const protocol = await this.getServiceForCredentialExchangeId(credentialExchangeId);
        return protocol.findProposalMessage(this.agentContext, credentialExchangeId);
    }
    async findOfferMessage(credentialExchangeId) {
        const protocol = await this.getServiceForCredentialExchangeId(credentialExchangeId);
        return protocol.findOfferMessage(this.agentContext, credentialExchangeId);
    }
    async findRequestMessage(credentialExchangeId) {
        const protocol = await this.getServiceForCredentialExchangeId(credentialExchangeId);
        return protocol.findRequestMessage(this.agentContext, credentialExchangeId);
    }
    async findCredentialMessage(credentialExchangeId) {
        const protocol = await this.getServiceForCredentialExchangeId(credentialExchangeId);
        return protocol.findCredentialMessage(this.agentContext, credentialExchangeId);
    }
    async getServiceForCredentialExchangeId(credentialExchangeId) {
        const credentialExchangeRecord = await this.getById(credentialExchangeId);
        return this.getProtocol(credentialExchangeRecord.protocolVersion);
    }
};
CredentialsApi = __decorate([
    (0, plugins_1.injectable)(),
    __param(3, (0, plugins_1.inject)(constants_1.InjectionSymbols.Logger)),
    __metadata("design:paramtypes", [MessageSender_1.MessageSender,
        services_1.ConnectionService,
        agent_1.AgentContext, Object, CredentialRepository_1.CredentialRepository,
        RoutingService_1.RoutingService,
        DidCommMessageRepository_1.DidCommMessageRepository,
        services_2.RevocationNotificationService,
        CredentialsModuleConfig_1.CredentialsModuleConfig])
], CredentialsApi);
exports.CredentialsApi = CredentialsApi;
//# sourceMappingURL=CredentialsApi.js.map