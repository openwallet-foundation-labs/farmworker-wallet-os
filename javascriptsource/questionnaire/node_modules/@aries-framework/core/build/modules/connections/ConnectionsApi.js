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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionsApi = void 0;
const agent_1 = require("../../agent");
const MessageHandlerRegistry_1 = require("../../agent/MessageHandlerRegistry");
const MessageSender_1 = require("../../agent/MessageSender");
const models_1 = require("../../agent/models");
const TransportDecorator_1 = require("../../decorators/transport/TransportDecorator");
const error_1 = require("../../error");
const plugins_1 = require("../../plugins");
const dids_1 = require("../dids");
const repository_1 = require("../dids/repository");
const OutOfBandService_1 = require("../oob/OutOfBandService");
const RoutingService_1 = require("../routing/services/RoutingService");
const ConnectionsModuleConfig_1 = require("./ConnectionsModuleConfig");
const DidExchangeProtocol_1 = require("./DidExchangeProtocol");
const handlers_1 = require("./handlers");
const models_2 = require("./models");
const ConnectionService_1 = require("./services/ConnectionService");
const TrustPingService_1 = require("./services/TrustPingService");
let ConnectionsApi = class ConnectionsApi {
    constructor(messageHandlerRegistry, didExchangeProtocol, connectionService, outOfBandService, trustPingService, routingService, didRepository, didResolverService, messageSender, agentContext, connectionsModuleConfig) {
        this.didExchangeProtocol = didExchangeProtocol;
        this.connectionService = connectionService;
        this.outOfBandService = outOfBandService;
        this.trustPingService = trustPingService;
        this.routingService = routingService;
        this.didRepository = didRepository;
        this.messageSender = messageSender;
        this.didResolverService = didResolverService;
        this.agentContext = agentContext;
        this.config = connectionsModuleConfig;
        this.registerMessageHandlers(messageHandlerRegistry);
    }
    async acceptOutOfBandInvitation(outOfBandRecord, config) {
        const { protocol, label, alias, imageUrl, autoAcceptConnection } = config;
        const routing = config.routing ||
            (await this.routingService.getRouting(this.agentContext, { mediatorId: outOfBandRecord.mediatorId }));
        let result;
        if (protocol === models_2.HandshakeProtocol.DidExchange) {
            result = await this.didExchangeProtocol.createRequest(this.agentContext, outOfBandRecord, {
                label,
                alias,
                routing,
                autoAcceptConnection,
            });
        }
        else if (protocol === models_2.HandshakeProtocol.Connections) {
            result = await this.connectionService.createRequest(this.agentContext, outOfBandRecord, {
                label,
                alias,
                imageUrl,
                routing,
                autoAcceptConnection,
            });
        }
        else {
            throw new error_1.AriesFrameworkError(`Unsupported handshake protocol ${protocol}.`);
        }
        const { message, connectionRecord } = result;
        const outboundMessageContext = new models_1.OutboundMessageContext(message, {
            agentContext: this.agentContext,
            connection: connectionRecord,
            outOfBand: outOfBandRecord,
        });
        await this.messageSender.sendMessage(outboundMessageContext);
        return connectionRecord;
    }
    /**
     * Accept a connection request as inviter (by sending a connection response message) for the connection with the specified connection id.
     * This is not needed when auto accepting of connection is enabled.
     *
     * @param connectionId the id of the connection for which to accept the request
     * @returns connection record
     */
    async acceptRequest(connectionId) {
        const connectionRecord = await this.connectionService.findById(this.agentContext, connectionId);
        if (!connectionRecord) {
            throw new error_1.AriesFrameworkError(`Connection record ${connectionId} not found.`);
        }
        if (!connectionRecord.outOfBandId) {
            throw new error_1.AriesFrameworkError(`Connection record ${connectionId} does not have out-of-band record.`);
        }
        const outOfBandRecord = await this.outOfBandService.findById(this.agentContext, connectionRecord.outOfBandId);
        if (!outOfBandRecord) {
            throw new error_1.AriesFrameworkError(`Out-of-band record ${connectionRecord.outOfBandId} not found.`);
        }
        // If the outOfBandRecord is reusable we need to use new routing keys for the connection, otherwise
        // all connections will use the same routing keys
        const routing = outOfBandRecord.reusable ? await this.routingService.getRouting(this.agentContext) : undefined;
        let outboundMessageContext;
        if (connectionRecord.protocol === models_2.HandshakeProtocol.DidExchange) {
            const message = await this.didExchangeProtocol.createResponse(this.agentContext, connectionRecord, outOfBandRecord, routing);
            outboundMessageContext = new models_1.OutboundMessageContext(message, {
                agentContext: this.agentContext,
                connection: connectionRecord,
            });
        }
        else {
            const { message } = await this.connectionService.createResponse(this.agentContext, connectionRecord, outOfBandRecord, routing);
            outboundMessageContext = new models_1.OutboundMessageContext(message, {
                agentContext: this.agentContext,
                connection: connectionRecord,
            });
        }
        await this.messageSender.sendMessage(outboundMessageContext);
        return connectionRecord;
    }
    /**
     * Accept a connection response as invitee (by sending a trust ping message) for the connection with the specified connection id.
     * This is not needed when auto accepting of connection is enabled.
     *
     * @param connectionId the id of the connection for which to accept the response
     * @returns connection record
     */
    async acceptResponse(connectionId) {
        const connectionRecord = await this.connectionService.getById(this.agentContext, connectionId);
        let outboundMessageContext;
        if (connectionRecord.protocol === models_2.HandshakeProtocol.DidExchange) {
            if (!connectionRecord.outOfBandId) {
                throw new error_1.AriesFrameworkError(`Connection ${connectionRecord.id} does not have outOfBandId!`);
            }
            const outOfBandRecord = await this.outOfBandService.findById(this.agentContext, connectionRecord.outOfBandId);
            if (!outOfBandRecord) {
                throw new error_1.AriesFrameworkError(`OutOfBand record for connection ${connectionRecord.id} with outOfBandId ${connectionRecord.outOfBandId} not found!`);
            }
            const message = await this.didExchangeProtocol.createComplete(this.agentContext, connectionRecord, outOfBandRecord);
            // Disable return routing as we don't want to receive a response for this message over the same channel
            // This has led to long timeouts as not all clients actually close an http socket if there is no response message
            message.setReturnRouting(TransportDecorator_1.ReturnRouteTypes.none);
            outboundMessageContext = new models_1.OutboundMessageContext(message, {
                agentContext: this.agentContext,
                connection: connectionRecord,
            });
        }
        else {
            const { message } = await this.connectionService.createTrustPing(this.agentContext, connectionRecord, {
                responseRequested: false,
            });
            // Disable return routing as we don't want to receive a response for this message over the same channel
            // This has led to long timeouts as not all clients actually close an http socket if there is no response message
            message.setReturnRouting(TransportDecorator_1.ReturnRouteTypes.none);
            outboundMessageContext = new models_1.OutboundMessageContext(message, {
                agentContext: this.agentContext,
                connection: connectionRecord,
            });
        }
        await this.messageSender.sendMessage(outboundMessageContext);
        return connectionRecord;
    }
    /**
     * Send a trust ping to an established connection
     *
     * @param connectionId the id of the connection for which to accept the response
     * @param responseRequested do we want a response to our ping
     * @param withReturnRouting do we want a response at the time of posting
     * @returns TurstPingMessage
     */
    async sendPing(connectionId, { responseRequested = true, withReturnRouting = undefined }) {
        const connection = await this.getById(connectionId);
        const { message } = await this.connectionService.createTrustPing(this.agentContext, connection, {
            responseRequested: responseRequested,
        });
        if (withReturnRouting === true) {
            message.setReturnRouting(TransportDecorator_1.ReturnRouteTypes.all);
        }
        // Disable return routing as we don't want to receive a response for this message over the same channel
        // This has led to long timeouts as not all clients actually close an http socket if there is no response message
        if (withReturnRouting === false) {
            message.setReturnRouting(TransportDecorator_1.ReturnRouteTypes.none);
        }
        await this.messageSender.sendMessage(new models_1.OutboundMessageContext(message, { agentContext: this.agentContext, connection }));
        return message;
    }
    async returnWhenIsConnected(connectionId, options) {
        return this.connectionService.returnWhenIsConnected(this.agentContext, connectionId, options === null || options === void 0 ? void 0 : options.timeoutMs);
    }
    /**
     * Retrieve all connections records
     *
     * @returns List containing all connection records
     */
    getAll() {
        return this.connectionService.getAll(this.agentContext);
    }
    /**
     * Retrieve all connections records by specified query params
     *
     * @returns List containing all connection records matching specified query paramaters
     */
    findAllByQuery(query) {
        return this.connectionService.findAllByQuery(this.agentContext, query);
    }
    /**
     * Allows for the addition of connectionType to the record.
     *  Either updates or creates an array of string connection types
     * @param connectionId
     * @param type
     * @throws {RecordNotFoundError} If no record is found
     */
    async addConnectionType(connectionId, type) {
        const record = await this.getById(connectionId);
        await this.connectionService.addConnectionType(this.agentContext, record, type);
        return record;
    }
    /**
     * Removes the given tag from the given record found by connectionId, if the tag exists otherwise does nothing
     * @param connectionId
     * @param type
     * @throws {RecordNotFoundError} If no record is found
     */
    async removeConnectionType(connectionId, type) {
        const record = await this.getById(connectionId);
        await this.connectionService.removeConnectionType(this.agentContext, record, type);
        return record;
    }
    /**
     * Gets the known connection types for the record matching the given connectionId
     * @param connectionId
     * @returns An array of known connection types or null if none exist
     * @throws {RecordNotFoundError} If no record is found
     */
    async getConnectionTypes(connectionId) {
        const record = await this.getById(connectionId);
        return this.connectionService.getConnectionTypes(record);
    }
    /**
     *
     * @param connectionTypes An array of connection types to query for a match for
     * @returns a promise of ab array of connection records
     */
    async findAllByConnectionTypes(connectionTypes) {
        return this.connectionService.findAllByConnectionTypes(this.agentContext, connectionTypes);
    }
    /**
     * Retrieve a connection record by id
     *
     * @param connectionId The connection record id
     * @throws {RecordNotFoundError} If no record is found
     * @return The connection record
     *
     */
    getById(connectionId) {
        return this.connectionService.getById(this.agentContext, connectionId);
    }
    /**
     * Find a connection record by id
     *
     * @param connectionId the connection record id
     * @returns The connection record or null if not found
     */
    findById(connectionId) {
        return this.connectionService.findById(this.agentContext, connectionId);
    }
    /**
     * Delete a connection record by id
     *
     * @param connectionId the connection record id
     */
    async deleteById(connectionId) {
        const connection = await this.connectionService.getById(this.agentContext, connectionId);
        if (connection.mediatorId && connection.did) {
            const did = await this.didResolverService.resolve(this.agentContext, connection.did);
            if (did.didDocument) {
                await this.routingService.removeRouting(this.agentContext, {
                    recipientKeys: did.didDocument.recipientKeys,
                    mediatorId: connection.mediatorId,
                });
            }
        }
        return this.connectionService.deleteById(this.agentContext, connectionId);
    }
    async findAllByOutOfBandId(outOfBandId) {
        return this.connectionService.findAllByOutOfBandId(this.agentContext, outOfBandId);
    }
    /**
     * Retrieve a connection record by thread id
     *
     * @param threadId The thread id
     * @throws {RecordNotFoundError} If no record is found
     * @throws {RecordDuplicateError} If multiple records are found
     * @returns The connection record
     */
    getByThreadId(threadId) {
        return this.connectionService.getByThreadId(this.agentContext, threadId);
    }
    async findByDid(did) {
        return this.connectionService.findByTheirDid(this.agentContext, did);
    }
    async findByInvitationDid(invitationDid) {
        return this.connectionService.findByInvitationDid(this.agentContext, invitationDid);
    }
    registerMessageHandlers(messageHandlerRegistry) {
        messageHandlerRegistry.registerMessageHandler(new handlers_1.ConnectionRequestHandler(this.connectionService, this.outOfBandService, this.routingService, this.didRepository, this.config));
        messageHandlerRegistry.registerMessageHandler(new handlers_1.ConnectionResponseHandler(this.connectionService, this.outOfBandService, this.didResolverService, this.config));
        messageHandlerRegistry.registerMessageHandler(new handlers_1.AckMessageHandler(this.connectionService));
        messageHandlerRegistry.registerMessageHandler(new handlers_1.ConnectionProblemReportHandler(this.connectionService));
        messageHandlerRegistry.registerMessageHandler(new handlers_1.TrustPingMessageHandler(this.trustPingService, this.connectionService));
        messageHandlerRegistry.registerMessageHandler(new handlers_1.TrustPingResponseMessageHandler(this.trustPingService));
        messageHandlerRegistry.registerMessageHandler(new handlers_1.DidExchangeRequestHandler(this.didExchangeProtocol, this.outOfBandService, this.routingService, this.didRepository, this.config));
        messageHandlerRegistry.registerMessageHandler(new handlers_1.DidExchangeResponseHandler(this.didExchangeProtocol, this.outOfBandService, this.connectionService, this.didResolverService, this.config));
        messageHandlerRegistry.registerMessageHandler(new handlers_1.DidExchangeCompleteHandler(this.didExchangeProtocol, this.outOfBandService));
    }
};
ConnectionsApi = __decorate([
    (0, plugins_1.injectable)(),
    __metadata("design:paramtypes", [MessageHandlerRegistry_1.MessageHandlerRegistry,
        DidExchangeProtocol_1.DidExchangeProtocol,
        ConnectionService_1.ConnectionService,
        OutOfBandService_1.OutOfBandService,
        TrustPingService_1.TrustPingService,
        RoutingService_1.RoutingService,
        repository_1.DidRepository,
        dids_1.DidResolverService,
        MessageSender_1.MessageSender,
        agent_1.AgentContext,
        ConnectionsModuleConfig_1.ConnectionsModuleConfig])
], ConnectionsApi);
exports.ConnectionsApi = ConnectionsApi;
//# sourceMappingURL=ConnectionsApi.js.map