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
exports.ConnectionService = void 0;
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const EventEmitter_1 = require("../../../agent/EventEmitter");
const Events_1 = require("../../../agent/Events");
const constants_1 = require("../../../constants");
const crypto_1 = require("../../../crypto");
const SignatureDecoratorUtils_1 = require("../../../decorators/signature/SignatureDecoratorUtils");
const error_1 = require("../../../error");
const plugins_1 = require("../../../plugins");
const JsonTransformer_1 = require("../../../utils/JsonTransformer");
const did_1 = require("../../../utils/did");
const dids_1 = require("../../dids");
const DidDocumentRole_1 = require("../../dids/domain/DidDocumentRole");
const helpers_1 = require("../../dids/helpers");
const peerDidNumAlgo1_1 = require("../../dids/methods/peer/peerDidNumAlgo1");
const repository_1 = require("../../dids/repository");
const didRecordMetadataTypes_1 = require("../../dids/repository/didRecordMetadataTypes");
const OutOfBandRole_1 = require("../../oob/domain/OutOfBandRole");
const OutOfBandState_1 = require("../../oob/domain/OutOfBandState");
const ConnectionEvents_1 = require("../ConnectionEvents");
const errors_1 = require("../errors");
const messages_1 = require("../messages");
const models_1 = require("../models");
const ConnectionRecord_1 = require("../repository/ConnectionRecord");
const ConnectionRepository_1 = require("../repository/ConnectionRepository");
const helpers_2 = require("./helpers");
let ConnectionService = class ConnectionService {
    constructor(logger, connectionRepository, didRepository, didRegistrarService, eventEmitter) {
        this.connectionRepository = connectionRepository;
        this.didRepository = didRepository;
        this.didRegistrarService = didRegistrarService;
        this.eventEmitter = eventEmitter;
        this.logger = logger;
    }
    /**
     * Create a connection request message for a given out-of-band.
     *
     * @param outOfBandRecord out-of-band record for which to create a connection request
     * @param config config for creation of connection request
     * @returns outbound message containing connection request
     */
    async createRequest(agentContext, outOfBandRecord, config) {
        this.logger.debug(`Create message ${messages_1.ConnectionRequestMessage.type.messageTypeUri} start`, outOfBandRecord);
        outOfBandRecord.assertRole(OutOfBandRole_1.OutOfBandRole.Receiver);
        outOfBandRecord.assertState(OutOfBandState_1.OutOfBandState.PrepareResponse);
        // TODO check there is no connection record for particular oob record
        const { outOfBandInvitation } = outOfBandRecord;
        const { mediatorId } = config.routing;
        const didDoc = this.createDidDoc(config.routing);
        // TODO: We should store only one did that we'll use to send the request message with success.
        // We take just the first one for now.
        const [invitationDid] = outOfBandInvitation.invitationDids;
        const { did: peerDid } = await this.createDid(agentContext, {
            role: DidDocumentRole_1.DidDocumentRole.Created,
            didDoc,
        });
        const { label, imageUrl } = config;
        const connectionRequest = new messages_1.ConnectionRequestMessage({
            label: label !== null && label !== void 0 ? label : agentContext.config.label,
            did: didDoc.id,
            didDoc,
            imageUrl: imageUrl !== null && imageUrl !== void 0 ? imageUrl : agentContext.config.connectionImageUrl,
        });
        connectionRequest.setThread({
            threadId: connectionRequest.threadId,
            parentThreadId: outOfBandRecord.outOfBandInvitation.id,
        });
        const connectionRecord = await this.createConnection(agentContext, {
            protocol: models_1.HandshakeProtocol.Connections,
            role: models_1.DidExchangeRole.Requester,
            state: models_1.DidExchangeState.InvitationReceived,
            theirLabel: outOfBandInvitation.label,
            alias: config === null || config === void 0 ? void 0 : config.alias,
            did: peerDid,
            mediatorId,
            autoAcceptConnection: config === null || config === void 0 ? void 0 : config.autoAcceptConnection,
            outOfBandId: outOfBandRecord.id,
            invitationDid,
            imageUrl: outOfBandInvitation.imageUrl,
            threadId: connectionRequest.threadId,
        });
        await this.updateState(agentContext, connectionRecord, models_1.DidExchangeState.RequestSent);
        return {
            connectionRecord,
            message: connectionRequest,
        };
    }
    async processRequest(messageContext, outOfBandRecord) {
        this.logger.debug(`Process message ${messages_1.ConnectionRequestMessage.type.messageTypeUri} start`, {
            message: messageContext.message,
        });
        outOfBandRecord.assertRole(OutOfBandRole_1.OutOfBandRole.Sender);
        outOfBandRecord.assertState(OutOfBandState_1.OutOfBandState.AwaitResponse);
        // TODO check there is no connection record for particular oob record
        const { message } = messageContext;
        if (!message.connection.didDoc) {
            throw new errors_1.ConnectionProblemReportError('Public DIDs are not supported yet', {
                problemCode: errors_1.ConnectionProblemReportReason.RequestNotAccepted,
            });
        }
        const { did: peerDid } = await this.createDid(messageContext.agentContext, {
            role: DidDocumentRole_1.DidDocumentRole.Received,
            didDoc: message.connection.didDoc,
        });
        const connectionRecord = await this.createConnection(messageContext.agentContext, {
            protocol: models_1.HandshakeProtocol.Connections,
            role: models_1.DidExchangeRole.Responder,
            state: models_1.DidExchangeState.RequestReceived,
            alias: outOfBandRecord.alias,
            theirLabel: message.label,
            imageUrl: message.imageUrl,
            outOfBandId: outOfBandRecord.id,
            theirDid: peerDid,
            threadId: message.threadId,
            mediatorId: outOfBandRecord.mediatorId,
            autoAcceptConnection: outOfBandRecord.autoAcceptConnection,
        });
        await this.connectionRepository.update(messageContext.agentContext, connectionRecord);
        this.emitStateChangedEvent(messageContext.agentContext, connectionRecord, null);
        this.logger.debug(`Process message ${messages_1.ConnectionRequestMessage.type.messageTypeUri} end`, connectionRecord);
        return connectionRecord;
    }
    /**
     * Create a connection response message for the connection with the specified connection id.
     *
     * @param connectionRecord the connection for which to create a connection response
     * @returns outbound message containing connection response
     */
    async createResponse(agentContext, connectionRecord, outOfBandRecord, routing) {
        this.logger.debug(`Create message ${messages_1.ConnectionResponseMessage.type.messageTypeUri} start`, connectionRecord);
        connectionRecord.assertState(models_1.DidExchangeState.RequestReceived);
        connectionRecord.assertRole(models_1.DidExchangeRole.Responder);
        const didDoc = routing
            ? this.createDidDoc(routing)
            : this.createDidDocFromOutOfBandDidCommServices(outOfBandRecord.outOfBandInvitation.getInlineServices());
        const { did: peerDid } = await this.createDid(agentContext, {
            role: DidDocumentRole_1.DidDocumentRole.Created,
            didDoc,
        });
        const connection = new models_1.Connection({
            did: didDoc.id,
            didDoc,
        });
        const connectionJson = JsonTransformer_1.JsonTransformer.toJSON(connection);
        if (!connectionRecord.threadId) {
            throw new error_1.AriesFrameworkError(`Connection record with id ${connectionRecord.id} does not have a thread id`);
        }
        const signingKey = crypto_1.Key.fromFingerprint(outOfBandRecord.getTags().recipientKeyFingerprints[0]).publicKeyBase58;
        const connectionResponse = new messages_1.ConnectionResponseMessage({
            threadId: connectionRecord.threadId,
            connectionSig: await (0, SignatureDecoratorUtils_1.signData)(connectionJson, agentContext.wallet, signingKey),
        });
        connectionRecord.did = peerDid;
        await this.updateState(agentContext, connectionRecord, models_1.DidExchangeState.ResponseSent);
        this.logger.debug(`Create message ${messages_1.ConnectionResponseMessage.type.messageTypeUri} end`, {
            connectionRecord,
            message: connectionResponse,
        });
        return {
            connectionRecord,
            message: connectionResponse,
        };
    }
    /**
     * Process a received connection response message. This will not accept the connection request
     * or send a connection acknowledgement message. It will only update the existing connection record
     * with all the new information from the connection response message. Use {@link ConnectionService.createTrustPing}
     * after calling this function to create a trust ping message.
     *
     * @param messageContext the message context containing a connection response message
     * @returns updated connection record
     */
    async processResponse(messageContext, outOfBandRecord) {
        this.logger.debug(`Process message ${messages_1.ConnectionResponseMessage.type.messageTypeUri} start`, {
            message: messageContext.message,
        });
        const { connection: connectionRecord, message, recipientKey, senderKey } = messageContext;
        if (!recipientKey || !senderKey) {
            throw new error_1.AriesFrameworkError('Unable to process connection request without senderKey or recipientKey');
        }
        if (!connectionRecord) {
            throw new error_1.AriesFrameworkError('No connection record in message context.');
        }
        connectionRecord.assertState(models_1.DidExchangeState.RequestSent);
        connectionRecord.assertRole(models_1.DidExchangeRole.Requester);
        let connectionJson = null;
        try {
            connectionJson = await (0, SignatureDecoratorUtils_1.unpackAndVerifySignatureDecorator)(message.connectionSig, messageContext.agentContext.wallet);
        }
        catch (error) {
            if (error instanceof error_1.AriesFrameworkError) {
                throw new errors_1.ConnectionProblemReportError(error.message, {
                    problemCode: errors_1.ConnectionProblemReportReason.ResponseProcessingError,
                });
            }
            throw error;
        }
        const connection = JsonTransformer_1.JsonTransformer.fromJSON(connectionJson, models_1.Connection);
        // Per the Connection RFC we must check if the key used to sign the connection~sig is the same key
        // as the recipient key(s) in the connection invitation message
        const signerVerkey = message.connectionSig.signer;
        const invitationKey = crypto_1.Key.fromFingerprint(outOfBandRecord.getTags().recipientKeyFingerprints[0]).publicKeyBase58;
        if (signerVerkey !== invitationKey) {
            throw new errors_1.ConnectionProblemReportError(`Connection object in connection response message is not signed with same key as recipient key in invitation expected='${invitationKey}' received='${signerVerkey}'`, { problemCode: errors_1.ConnectionProblemReportReason.ResponseNotAccepted });
        }
        if (!connection.didDoc) {
            throw new error_1.AriesFrameworkError('DID Document is missing.');
        }
        const { did: peerDid } = await this.createDid(messageContext.agentContext, {
            role: DidDocumentRole_1.DidDocumentRole.Received,
            didDoc: connection.didDoc,
        });
        connectionRecord.theirDid = peerDid;
        connectionRecord.threadId = message.threadId;
        await this.updateState(messageContext.agentContext, connectionRecord, models_1.DidExchangeState.ResponseReceived);
        return connectionRecord;
    }
    /**
     * Create a trust ping message for the connection with the specified connection id.
     *
     * By default a trust ping message should elicit a response. If this is not desired the
     * `config.responseRequested` property can be set to `false`.
     *
     * @param connectionRecord the connection for which to create a trust ping message
     * @param config the config for the trust ping message
     * @returns outbound message containing trust ping message
     */
    async createTrustPing(agentContext, connectionRecord, config = {}) {
        connectionRecord.assertState([models_1.DidExchangeState.ResponseReceived, models_1.DidExchangeState.Completed]);
        // TODO:
        //  - create ack message
        //  - maybe this shouldn't be in the connection service?
        const trustPing = new messages_1.TrustPingMessage(config);
        // Only update connection record and emit an event if the state is not already 'Complete'
        if (connectionRecord.state !== models_1.DidExchangeState.Completed) {
            await this.updateState(agentContext, connectionRecord, models_1.DidExchangeState.Completed);
        }
        return {
            connectionRecord,
            message: trustPing,
        };
    }
    /**
     * Process a received ack message. This will update the state of the connection
     * to Completed if this is not already the case.
     *
     * @param messageContext the message context containing an ack message
     * @returns updated connection record
     */
    async processAck(messageContext) {
        const { connection, recipientKey } = messageContext;
        if (!connection) {
            throw new error_1.AriesFrameworkError(`Unable to process connection ack: connection for recipient key ${recipientKey === null || recipientKey === void 0 ? void 0 : recipientKey.fingerprint} not found`);
        }
        // TODO: This is better addressed in a middleware of some kind because
        // any message can transition the state to complete, not just an ack or trust ping
        if (connection.state === models_1.DidExchangeState.ResponseSent && connection.role === models_1.DidExchangeRole.Responder) {
            await this.updateState(messageContext.agentContext, connection, models_1.DidExchangeState.Completed);
        }
        return connection;
    }
    /**
     * Process a received {@link ProblemReportMessage}.
     *
     * @param messageContext The message context containing a connection problem report message
     * @returns connection record associated with the connection problem report message
     *
     */
    async processProblemReport(messageContext) {
        var _a;
        const { message: connectionProblemReportMessage, recipientKey, senderKey } = messageContext;
        this.logger.debug(`Processing connection problem report for verkey ${recipientKey === null || recipientKey === void 0 ? void 0 : recipientKey.fingerprint}`);
        if (!recipientKey) {
            throw new error_1.AriesFrameworkError('Unable to process connection problem report without recipientKey');
        }
        const ourDidRecord = await this.didRepository.findCreatedDidByRecipientKey(messageContext.agentContext, recipientKey);
        if (!ourDidRecord) {
            throw new error_1.AriesFrameworkError(`Unable to process connection problem report: created did record for recipient key ${recipientKey.fingerprint} not found`);
        }
        const connectionRecord = await this.findByOurDid(messageContext.agentContext, ourDidRecord.did);
        if (!connectionRecord) {
            throw new error_1.AriesFrameworkError(`Unable to process connection problem report: connection for recipient key ${recipientKey.fingerprint} not found`);
        }
        const theirDidRecord = connectionRecord.theirDid &&
            (await this.didRepository.findReceivedDid(messageContext.agentContext, connectionRecord.theirDid));
        if (!theirDidRecord) {
            throw new error_1.AriesFrameworkError(`Received did record for did ${connectionRecord.theirDid} not found.`);
        }
        if (senderKey) {
            if (!((_a = theirDidRecord === null || theirDidRecord === void 0 ? void 0 : theirDidRecord.getTags().recipientKeyFingerprints) === null || _a === void 0 ? void 0 : _a.includes(senderKey.fingerprint))) {
                throw new error_1.AriesFrameworkError("Sender key doesn't match key of connection record");
            }
        }
        connectionRecord.errorMessage = `${connectionProblemReportMessage.description.code} : ${connectionProblemReportMessage.description.en}`;
        await this.update(messageContext.agentContext, connectionRecord);
        // Marking connection as abandoned in case of problem report from issuer agent
        // TODO: Can be conditionally abandoned - Like if another user is scanning already used connection invite where issuer will send invite-already-used problem code.
        await this.updateState(messageContext.agentContext, connectionRecord, models_1.DidExchangeState.Abandoned);
        return connectionRecord;
    }
    /**
     * Assert that an inbound message either has a connection associated with it,
     * or has everything correctly set up for connection-less exchange.
     *
     * @param messageContext - the inbound message context
     * @param previousRespondence - previous sent and received message to determine if a valid service decorator is present
     */
    assertConnectionOrServiceDecorator(messageContext, { previousSentMessage, previousReceivedMessage, } = {}) {
        const { connection, message } = messageContext;
        // Check if we have a ready connection. Verification is already done somewhere else. Return
        if (connection) {
            connection.assertReady();
            this.logger.debug(`Processing message with id ${message.id} and connection id ${connection.id}`, {
                type: message.type,
            });
        }
        else {
            this.logger.debug(`Processing connection-less message with id ${message.id}`, {
                type: message.type,
            });
            const recipientKey = messageContext.recipientKey && messageContext.recipientKey.publicKeyBase58;
            const senderKey = messageContext.senderKey && messageContext.senderKey.publicKeyBase58;
            if (previousSentMessage) {
                // If we have previously sent a message, it is not allowed to receive an OOB/unpacked message
                if (!recipientKey) {
                    throw new error_1.AriesFrameworkError('Cannot verify service without recipientKey on incoming message (received unpacked message)');
                }
                // Check if the inbound message recipient key is present
                // in the recipientKeys of previously sent message ~service decorator
                if (!(previousSentMessage === null || previousSentMessage === void 0 ? void 0 : previousSentMessage.service) || !previousSentMessage.service.recipientKeys.includes(recipientKey)) {
                    throw new error_1.AriesFrameworkError('Previously sent message ~service recipientKeys does not include current received message recipient key');
                }
            }
            if (previousReceivedMessage) {
                // If we have previously received a message, it is not allowed to receive an OOB/unpacked/AnonCrypt message
                if (!senderKey) {
                    throw new error_1.AriesFrameworkError('Cannot verify service without senderKey on incoming message (received AnonCrypt or unpacked message)');
                }
                // Check if the inbound message sender key is present
                // in the recipientKeys of previously received message ~service decorator
                if (!previousReceivedMessage.service || !previousReceivedMessage.service.recipientKeys.includes(senderKey)) {
                    throw new error_1.AriesFrameworkError('Previously received message ~service recipientKeys does not include current received message sender key');
                }
            }
            // If message is received unpacked/, we need to make sure it included a ~service decorator
            if (!message.service && !recipientKey) {
                throw new error_1.AriesFrameworkError('Message recipientKey must have ~service decorator');
            }
        }
    }
    async updateState(agentContext, connectionRecord, newState) {
        const previousState = connectionRecord.state;
        connectionRecord.state = newState;
        await this.connectionRepository.update(agentContext, connectionRecord);
        this.emitStateChangedEvent(agentContext, connectionRecord, previousState);
    }
    emitStateChangedEvent(agentContext, connectionRecord, previousState) {
        this.eventEmitter.emit(agentContext, {
            type: ConnectionEvents_1.ConnectionEventTypes.ConnectionStateChanged,
            payload: {
                // Connection record in event should be static
                connectionRecord: connectionRecord.clone(),
                previousState,
            },
        });
    }
    update(agentContext, connectionRecord) {
        return this.connectionRepository.update(agentContext, connectionRecord);
    }
    /**
     * Retrieve all connections records
     *
     * @returns List containing all connection records
     */
    getAll(agentContext) {
        return this.connectionRepository.getAll(agentContext);
    }
    /**
     * Retrieve a connection record by id
     *
     * @param connectionId The connection record id
     * @throws {RecordNotFoundError} If no record is found
     * @return The connection record
     *
     */
    getById(agentContext, connectionId) {
        return this.connectionRepository.getById(agentContext, connectionId);
    }
    /**
     * Find a connection record by id
     *
     * @param connectionId the connection record id
     * @returns The connection record or null if not found
     */
    findById(agentContext, connectionId) {
        return this.connectionRepository.findById(agentContext, connectionId);
    }
    /**
     * Delete a connection record by id
     *
     * @param connectionId the connection record id
     */
    async deleteById(agentContext, connectionId) {
        const connectionRecord = await this.getById(agentContext, connectionId);
        return this.connectionRepository.delete(agentContext, connectionRecord);
    }
    async findByDids(agentContext, query) {
        return this.connectionRepository.findByDids(agentContext, query);
    }
    /**
     * Retrieve a connection record by thread id
     *
     * @param threadId The thread id
     * @throws {RecordNotFoundError} If no record is found
     * @throws {RecordDuplicateError} If multiple records are found
     * @returns The connection record
     */
    async getByThreadId(agentContext, threadId) {
        return this.connectionRepository.getByThreadId(agentContext, threadId);
    }
    async getByRoleAndThreadId(agentContext, role, threadId) {
        return this.connectionRepository.getByRoleAndThreadId(agentContext, role, threadId);
    }
    async findByTheirDid(agentContext, theirDid) {
        return this.connectionRepository.findSingleByQuery(agentContext, { theirDid });
    }
    async findByOurDid(agentContext, ourDid) {
        return this.connectionRepository.findSingleByQuery(agentContext, { did: ourDid });
    }
    async findAllByOutOfBandId(agentContext, outOfBandId) {
        return this.connectionRepository.findByQuery(agentContext, { outOfBandId });
    }
    async findAllByConnectionTypes(agentContext, connectionTypes) {
        return this.connectionRepository.findByQuery(agentContext, { connectionTypes });
    }
    async findByInvitationDid(agentContext, invitationDid) {
        return this.connectionRepository.findByQuery(agentContext, { invitationDid });
    }
    async findByKeys(agentContext, { senderKey, recipientKey }) {
        const theirDidRecord = await this.didRepository.findReceivedDidByRecipientKey(agentContext, senderKey);
        if (theirDidRecord) {
            const ourDidRecord = await this.didRepository.findCreatedDidByRecipientKey(agentContext, recipientKey);
            if (ourDidRecord) {
                const connectionRecord = await this.findByDids(agentContext, {
                    ourDid: ourDidRecord.did,
                    theirDid: theirDidRecord.did,
                });
                if (connectionRecord && connectionRecord.isReady)
                    return connectionRecord;
            }
        }
        this.logger.debug(`No connection record found for encrypted message with recipient key ${recipientKey.fingerprint} and sender key ${senderKey.fingerprint}`);
        return null;
    }
    async findAllByQuery(agentContext, query) {
        return this.connectionRepository.findByQuery(agentContext, query);
    }
    async createConnection(agentContext, options) {
        const connectionRecord = new ConnectionRecord_1.ConnectionRecord(options);
        await this.connectionRepository.save(agentContext, connectionRecord);
        return connectionRecord;
    }
    async addConnectionType(agentContext, connectionRecord, type) {
        const connectionTypes = connectionRecord.connectionTypes || [];
        connectionRecord.connectionTypes = [type, ...connectionTypes];
        await this.update(agentContext, connectionRecord);
    }
    async removeConnectionType(agentContext, connectionRecord, type) {
        connectionRecord.connectionTypes = connectionRecord.connectionTypes.filter((value) => value !== type);
        await this.update(agentContext, connectionRecord);
    }
    async getConnectionTypes(connectionRecord) {
        return connectionRecord.connectionTypes || [];
    }
    async createDid(agentContext, { role, didDoc }) {
        // Convert the legacy did doc to a new did document
        const didDocument = (0, helpers_2.convertToNewDidDocument)(didDoc);
        const peerDid = (0, peerDidNumAlgo1_1.didDocumentJsonToNumAlgo1Did)(didDocument.toJSON());
        didDocument.id = peerDid;
        const didRecord = new repository_1.DidRecord({
            did: peerDid,
            role,
            didDocument,
            tags: {
                // We need to save the recipientKeys, so we can find the associated did
                // of a key when we receive a message from another connection.
                recipientKeyFingerprints: didDocument.recipientKeys.map((key) => key.fingerprint),
            },
        });
        // Store the unqualified did with the legacy did document in the metadata
        // Can be removed at a later stage if we know for sure we don't need it anymore
        didRecord.metadata.set(didRecordMetadataTypes_1.DidRecordMetadataKeys.LegacyDid, {
            unqualifiedDid: didDoc.id,
            didDocumentString: JsonTransformer_1.JsonTransformer.serialize(didDoc),
        });
        this.logger.debug('Saving DID record', {
            id: didRecord.id,
            did: didRecord.did,
            role: didRecord.role,
            tags: didRecord.getTags(),
            didDocument: 'omitted...',
        });
        await this.didRepository.save(agentContext, didRecord);
        this.logger.debug('Did record created.', didRecord);
        return { did: peerDid, didDocument };
    }
    createDidDoc(routing) {
        const indyDid = (0, did_1.indyDidFromPublicKeyBase58)(routing.recipientKey.publicKeyBase58);
        const publicKey = new models_1.Ed25119Sig2018({
            id: `${indyDid}#1`,
            controller: indyDid,
            publicKeyBase58: routing.recipientKey.publicKeyBase58,
        });
        const auth = new models_1.ReferencedAuthentication(publicKey, models_1.authenticationTypes.Ed25519VerificationKey2018);
        // IndyAgentService is old service type
        const services = routing.endpoints.map((endpoint, index) => new dids_1.IndyAgentService({
            id: `${indyDid}#IndyAgentService`,
            serviceEndpoint: endpoint,
            recipientKeys: [routing.recipientKey.publicKeyBase58],
            routingKeys: routing.routingKeys.map((key) => key.publicKeyBase58),
            // Order of endpoint determines priority
            priority: index,
        }));
        return new models_1.DidDoc({
            id: indyDid,
            authentication: [auth],
            service: services,
            publicKey: [publicKey],
        });
    }
    createDidDocFromOutOfBandDidCommServices(services) {
        const [recipientDidKey] = services[0].recipientKeys;
        const recipientKey = dids_1.DidKey.fromDid(recipientDidKey).key;
        const did = (0, did_1.indyDidFromPublicKeyBase58)(recipientKey.publicKeyBase58);
        const publicKey = new models_1.Ed25119Sig2018({
            id: `${did}#1`,
            controller: did,
            publicKeyBase58: recipientKey.publicKeyBase58,
        });
        const auth = new models_1.ReferencedAuthentication(publicKey, models_1.authenticationTypes.Ed25519VerificationKey2018);
        // IndyAgentService is old service type
        const service = services.map((service, index) => {
            var _a;
            return new dids_1.IndyAgentService({
                id: `${did}#IndyAgentService`,
                serviceEndpoint: service.serviceEndpoint,
                recipientKeys: [recipientKey.publicKeyBase58],
                routingKeys: (_a = service.routingKeys) === null || _a === void 0 ? void 0 : _a.map(helpers_1.didKeyToVerkey),
                priority: index,
            });
        });
        return new models_1.DidDoc({
            id: did,
            authentication: [auth],
            service,
            publicKey: [publicKey],
        });
    }
    async returnWhenIsConnected(agentContext, connectionId, timeoutMs = 20000) {
        const isConnected = (connection) => {
            return connection.id === connectionId && connection.state === models_1.DidExchangeState.Completed;
        };
        const observable = this.eventEmitter.observable(ConnectionEvents_1.ConnectionEventTypes.ConnectionStateChanged);
        const subject = new rxjs_1.ReplaySubject(1);
        observable
            .pipe((0, Events_1.filterContextCorrelationId)(agentContext.contextCorrelationId), (0, operators_1.map)((e) => e.payload.connectionRecord), (0, operators_1.first)(isConnected), // Do not wait for longer than specified timeout
        (0, operators_1.timeout)(timeoutMs))
            .subscribe(subject);
        const connection = await this.getById(agentContext, connectionId);
        if (isConnected(connection)) {
            subject.next(connection);
        }
        return (0, rxjs_1.firstValueFrom)(subject);
    }
};
ConnectionService = __decorate([
    (0, plugins_1.injectable)(),
    __param(0, (0, plugins_1.inject)(constants_1.InjectionSymbols.Logger)),
    __metadata("design:paramtypes", [Object, ConnectionRepository_1.ConnectionRepository,
        repository_1.DidRepository,
        dids_1.DidRegistrarService,
        EventEmitter_1.EventEmitter])
], ConnectionService);
exports.ConnectionService = ConnectionService;
//# sourceMappingURL=ConnectionService.js.map