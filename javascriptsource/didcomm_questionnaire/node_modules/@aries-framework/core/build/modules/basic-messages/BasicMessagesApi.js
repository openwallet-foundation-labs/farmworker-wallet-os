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
exports.BasicMessagesApi = void 0;
const agent_1 = require("../../agent");
const MessageHandlerRegistry_1 = require("../../agent/MessageHandlerRegistry");
const MessageSender_1 = require("../../agent/MessageSender");
const models_1 = require("../../agent/models");
const plugins_1 = require("../../plugins");
const connections_1 = require("../connections");
const handlers_1 = require("./handlers");
const services_1 = require("./services");
let BasicMessagesApi = class BasicMessagesApi {
    constructor(messageHandlerRegistry, basicMessageService, messageSender, connectionService, agentContext) {
        this.basicMessageService = basicMessageService;
        this.messageSender = messageSender;
        this.connectionService = connectionService;
        this.agentContext = agentContext;
        this.registerMessageHandlers(messageHandlerRegistry);
    }
    /**
     * Send a message to an active connection
     *
     * @param connectionId Connection Id
     * @param message Message contents
     * @throws {RecordNotFoundError} If connection is not found
     * @throws {MessageSendingError} If message is undeliverable
     * @returns the created record
     */
    async sendMessage(connectionId, message, parentThreadId) {
        const connection = await this.connectionService.getById(this.agentContext, connectionId);
        const { message: basicMessage, record: basicMessageRecord } = await this.basicMessageService.createMessage(this.agentContext, message, connection, parentThreadId);
        const outboundMessageContext = new models_1.OutboundMessageContext(basicMessage, {
            agentContext: this.agentContext,
            connection,
            associatedRecord: basicMessageRecord,
        });
        await this.messageSender.sendMessage(outboundMessageContext);
        return basicMessageRecord;
    }
    /**
     * Retrieve all basic messages matching a given query
     *
     * @param query The query
     * @returns array containing all matching records
     */
    async findAllByQuery(query) {
        return this.basicMessageService.findAllByQuery(this.agentContext, query);
    }
    /**
     * Retrieve a basic message record by id
     *
     * @param basicMessageRecordId The basic message record id
     * @throws {RecordNotFoundError} If no record is found
     * @return The basic message record
     *
     */
    async getById(basicMessageRecordId) {
        return this.basicMessageService.getById(this.agentContext, basicMessageRecordId);
    }
    /**
     * Retrieve a basic message record by thread id
     *
     * @param threadId The thread id
     * @throws {RecordNotFoundError} If no record is found
     * @throws {RecordDuplicateError} If multiple records are found
     * @returns The connection record
     */
    async getByThreadId(basicMessageRecordId) {
        return this.basicMessageService.getByThreadId(this.agentContext, basicMessageRecordId);
    }
    /**
     * Delete a basic message record by id
     *
     * @param connectionId the basic message record id
     * @throws {RecordNotFoundError} If no record is found
     */
    async deleteById(basicMessageRecordId) {
        await this.basicMessageService.deleteById(this.agentContext, basicMessageRecordId);
    }
    registerMessageHandlers(messageHandlerRegistry) {
        messageHandlerRegistry.registerMessageHandler(new handlers_1.BasicMessageHandler(this.basicMessageService));
    }
};
BasicMessagesApi = __decorate([
    (0, plugins_1.injectable)(),
    __metadata("design:paramtypes", [MessageHandlerRegistry_1.MessageHandlerRegistry,
        services_1.BasicMessageService,
        MessageSender_1.MessageSender,
        connections_1.ConnectionService,
        agent_1.AgentContext])
], BasicMessagesApi);
exports.BasicMessagesApi = BasicMessagesApi;
//# sourceMappingURL=BasicMessagesApi.js.map