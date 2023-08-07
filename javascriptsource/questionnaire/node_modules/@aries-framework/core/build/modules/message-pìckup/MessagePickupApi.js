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
exports.MessagePickupApi = void 0;
const agent_1 = require("../../agent");
const MessageSender_1 = require("../../agent/MessageSender");
const models_1 = require("../../agent/models");
const constants_1 = require("../../constants");
const error_1 = require("../../error");
const plugins_1 = require("../../plugins");
const services_1 = require("../connections/services");
const MessagePickupModuleConfig_1 = require("./MessagePickupModuleConfig");
let MessagePickupApi = class MessagePickupApi {
    constructor(messageSender, agentContext, connectionService, config) {
        this.messageSender = messageSender;
        this.connectionService = connectionService;
        this.agentContext = agentContext;
        this.config = config;
    }
    getProtocol(protocolVersion) {
        const protocol = this.config.protocols.find((protocol) => protocol.version === protocolVersion);
        if (!protocol) {
            throw new error_1.AriesFrameworkError(`No message pickup protocol registered for protocol version ${protocolVersion}`);
        }
        return protocol;
    }
    /**
     * Add an encrypted message to the message pickup queue
     *
     * @param options: connectionId associated to the message and the encrypted message itself
     */
    async queueMessage(options) {
        const connectionRecord = await this.connectionService.getById(this.agentContext, options.connectionId);
        const messageRepository = this.agentContext.dependencyManager.resolve(constants_1.InjectionSymbols.MessageRepository);
        await messageRepository.add(connectionRecord.id, options.message);
    }
    /**
     * Pickup queued messages from a message holder. It attempts to retrieve all current messages from the
     * queue, receiving up to `batchSize` messages per batch retrieval.
     *
     * @param options connectionId, protocol version to use and batch size
     */
    async pickupMessages(options) {
        const connectionRecord = await this.connectionService.getById(this.agentContext, options.connectionId);
        const protocol = this.getProtocol(options.protocolVersion);
        const { message } = await protocol.pickupMessages(this.agentContext, {
            connectionRecord,
            batchSize: options.batchSize,
            recipientKey: options.recipientKey,
        });
        await this.messageSender.sendMessage(new models_1.OutboundMessageContext(message, {
            agentContext: this.agentContext,
            connection: connectionRecord,
        }));
    }
};
MessagePickupApi = __decorate([
    (0, plugins_1.injectable)(),
    __metadata("design:paramtypes", [MessageSender_1.MessageSender,
        agent_1.AgentContext,
        services_1.ConnectionService,
        MessagePickupModuleConfig_1.MessagePickupModuleConfig])
], MessagePickupApi);
exports.MessagePickupApi = MessagePickupApi;
//# sourceMappingURL=MessagePickupApi.js.map