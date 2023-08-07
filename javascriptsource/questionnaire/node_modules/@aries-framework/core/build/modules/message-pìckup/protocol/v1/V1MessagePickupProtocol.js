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
exports.V1MessagePickupProtocol = void 0;
const models_1 = require("../../../../agent/models");
const constants_1 = require("../../../../constants");
const plugins_1 = require("../../../../plugins");
const MessagePickupModuleConfig_1 = require("../../MessagePickupModuleConfig");
const BaseMessagePickupProtocol_1 = require("../BaseMessagePickupProtocol");
const handlers_1 = require("./handlers");
const messages_1 = require("./messages");
let V1MessagePickupProtocol = class V1MessagePickupProtocol extends BaseMessagePickupProtocol_1.BaseMessagePickupProtocol {
    constructor() {
        super();
        /**
         * The version of the message pickup protocol this class supports
         */
        this.version = 'v1';
    }
    /**
     * Registers the protocol implementation (handlers, feature registry) on the agent.
     */
    register(dependencyManager, featureRegistry) {
        dependencyManager.registerMessageHandlers([new handlers_1.V1BatchPickupHandler(this), new handlers_1.V1BatchHandler()]);
        featureRegistry.register(new models_1.Protocol({
            id: 'https://didcomm.org/messagepickup/1.0',
            roles: ['message_holder', 'recipient', 'batch_sender', 'batch_recipient'],
        }));
    }
    async pickupMessages(agentContext, options) {
        const { connectionRecord, batchSize } = options;
        connectionRecord.assertReady();
        const config = agentContext.dependencyManager.resolve(MessagePickupModuleConfig_1.MessagePickupModuleConfig);
        const message = new messages_1.V1BatchPickupMessage({
            batchSize: batchSize !== null && batchSize !== void 0 ? batchSize : config.maximumBatchSize,
        });
        return { message };
    }
    async processBatchPickup(messageContext) {
        // Assert ready connection
        const connection = messageContext.assertReadyConnection();
        const { message } = messageContext;
        const messageRepository = messageContext.agentContext.dependencyManager.resolve(constants_1.InjectionSymbols.MessageRepository);
        const messages = await messageRepository.takeFromQueue(connection.id, message.batchSize);
        // TODO: each message should be stored with an id. to be able to conform to the id property
        // of batch message
        const batchMessages = messages.map((msg) => new messages_1.BatchMessageMessage({
            message: msg,
        }));
        const batchMessage = new messages_1.V1BatchMessage({
            messages: batchMessages,
        });
        return new models_1.OutboundMessageContext(batchMessage, { agentContext: messageContext.agentContext, connection });
    }
};
V1MessagePickupProtocol = __decorate([
    (0, plugins_1.injectable)(),
    __metadata("design:paramtypes", [])
], V1MessagePickupProtocol);
exports.V1MessagePickupProtocol = V1MessagePickupProtocol;
//# sourceMappingURL=V1MessagePickupProtocol.js.map