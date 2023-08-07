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
exports.MediatorApi = void 0;
const agent_1 = require("../../agent");
const MessageHandlerRegistry_1 = require("../../agent/MessageHandlerRegistry");
const MessageSender_1 = require("../../agent/MessageSender");
const models_1 = require("../../agent/models");
const plugins_1 = require("../../plugins");
const services_1 = require("../connections/services");
const message_p_ckup_1 = require("../message-p\u00ECckup");
const MediatorModuleConfig_1 = require("./MediatorModuleConfig");
const handlers_1 = require("./handlers");
const MediationRequestHandler_1 = require("./handlers/MediationRequestHandler");
const MediatorService_1 = require("./services/MediatorService");
let MediatorApi = class MediatorApi {
    constructor(messageHandlerRegistry, mediationService, messageSender, agentContext, connectionService, config) {
        this.mediatorService = mediationService;
        this.messageSender = messageSender;
        this.connectionService = connectionService;
        this.agentContext = agentContext;
        this.config = config;
        this.registerMessageHandlers(messageHandlerRegistry);
    }
    async initialize() {
        this.agentContext.config.logger.debug('Mediator routing record not loaded yet, retrieving from storage');
        const routingRecord = await this.mediatorService.findMediatorRoutingRecord(this.agentContext);
        // If we don't have a routing record yet for this tenant, create it
        if (!routingRecord) {
            this.agentContext.config.logger.debug('Mediator routing record does not exist yet, creating routing keys and record');
            await this.mediatorService.createMediatorRoutingRecord(this.agentContext);
        }
    }
    async grantRequestedMediation(mediatorId) {
        const record = await this.mediatorService.getById(this.agentContext, mediatorId);
        const connectionRecord = await this.connectionService.getById(this.agentContext, record.connectionId);
        const { message, mediationRecord } = await this.mediatorService.createGrantMediationMessage(this.agentContext, record);
        const outboundMessageContext = new models_1.OutboundMessageContext(message, {
            agentContext: this.agentContext,
            connection: connectionRecord,
            associatedRecord: mediationRecord,
        });
        await this.messageSender.sendMessage(outboundMessageContext);
        return mediationRecord;
    }
    /**
     * @deprecated Use `MessagePickupApi.queueMessage` instead.
     * */
    queueMessage(connectionId, message) {
        const messagePickupApi = this.agentContext.dependencyManager.resolve(message_p_ckup_1.MessagePickupApi);
        return messagePickupApi.queueMessage({ connectionId, message });
    }
    registerMessageHandlers(messageHandlerRegistry) {
        messageHandlerRegistry.registerMessageHandler(new handlers_1.KeylistUpdateHandler(this.mediatorService));
        messageHandlerRegistry.registerMessageHandler(new handlers_1.ForwardHandler(this.mediatorService, this.connectionService, this.messageSender));
        messageHandlerRegistry.registerMessageHandler(new MediationRequestHandler_1.MediationRequestHandler(this.mediatorService, this.config));
    }
};
MediatorApi = __decorate([
    (0, plugins_1.injectable)(),
    __metadata("design:paramtypes", [MessageHandlerRegistry_1.MessageHandlerRegistry,
        MediatorService_1.MediatorService,
        MessageSender_1.MessageSender,
        agent_1.AgentContext,
        services_1.ConnectionService,
        MediatorModuleConfig_1.MediatorModuleConfig])
], MediatorApi);
exports.MediatorApi = MediatorApi;
//# sourceMappingURL=MediatorApi.js.map