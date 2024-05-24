"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.V1MessagePickupProtocol = void 0;
const EventEmitter_1 = require("../../../../agent/EventEmitter");
const Events_1 = require("../../../../agent/Events");
const models_1 = require("../../../../agent/models");
const constants_1 = require("../../../../constants");
const error_1 = require("../../../../error");
const plugins_1 = require("../../../../plugins");
const MessagePickupEvents_1 = require("../../MessagePickupEvents");
const MessagePickupModuleConfig_1 = require("../../MessagePickupModuleConfig");
const BaseMessagePickupProtocol_1 = require("../BaseMessagePickupProtocol");
const handlers_1 = require("./handlers");
const messages_1 = require("./messages");
let V1MessagePickupProtocol = class V1MessagePickupProtocol extends BaseMessagePickupProtocol_1.BaseMessagePickupProtocol {
    constructor() {
        super(...arguments);
        /**
         * The version of the message pickup protocol this class supports
         */
        this.version = 'v1';
    }
    /**
     * Registers the protocol implementation (handlers, feature registry) on the agent.
     */
    register(dependencyManager, featureRegistry) {
        dependencyManager.registerMessageHandlers([new handlers_1.V1BatchPickupHandler(this), new handlers_1.V1BatchHandler(this)]);
        featureRegistry.register(new models_1.Protocol({
            id: 'https://didcomm.org/messagepickup/1.0',
            roles: ['message_holder', 'recipient', 'batch_sender', 'batch_recipient'],
        }));
    }
    async createPickupMessage(agentContext, options) {
        const { connectionRecord, batchSize } = options;
        connectionRecord.assertReady();
        const config = agentContext.dependencyManager.resolve(MessagePickupModuleConfig_1.MessagePickupModuleConfig);
        const message = new messages_1.V1BatchPickupMessage({
            batchSize: batchSize !== null && batchSize !== void 0 ? batchSize : config.maximumBatchSize,
        });
        return { message };
    }
    async createDeliveryMessage(agentContext, options) {
        const { connectionRecord, batchSize, messages } = options;
        connectionRecord.assertReady();
        const pickupMessageQueue = agentContext.dependencyManager.resolve(constants_1.InjectionSymbols.MessagePickupRepository);
        const messagesToDeliver = messages !== null && messages !== void 0 ? messages : (await pickupMessageQueue.takeFromQueue({
            connectionId: connectionRecord.id,
            limit: batchSize,
            deleteMessages: true,
        }));
        const batchMessages = messagesToDeliver.map((msg) => new messages_1.BatchMessageMessage({
            id: msg.id,
            message: msg.encryptedMessage,
        }));
        if (messagesToDeliver.length > 0) {
            const message = new messages_1.V1BatchMessage({
                messages: batchMessages,
            });
            return { message };
        }
    }
    async setLiveDeliveryMode() {
        throw new error_1.CredoError('Live Delivery mode not supported in Message Pickup V1 protocol');
    }
    async processBatchPickup(messageContext) {
        // Assert ready connection
        const connection = messageContext.assertReadyConnection();
        const { message } = messageContext;
        const pickupMessageQueue = messageContext.agentContext.dependencyManager.resolve(constants_1.InjectionSymbols.MessagePickupRepository);
        const messages = await pickupMessageQueue.takeFromQueue({
            connectionId: connection.id,
            limit: message.batchSize,
            deleteMessages: true,
        });
        const batchMessages = messages.map((msg) => new messages_1.BatchMessageMessage({
            id: msg.id,
            message: msg.encryptedMessage,
        }));
        const batchMessage = new messages_1.V1BatchMessage({
            messages: batchMessages,
            threadId: message.threadId,
        });
        return new models_1.OutboundMessageContext(batchMessage, { agentContext: messageContext.agentContext, connection });
    }
    async processBatch(messageContext) {
        const { message: batchMessage, agentContext } = messageContext;
        const { messages } = batchMessage;
        const connection = messageContext.assertReadyConnection();
        const eventEmitter = messageContext.agentContext.dependencyManager.resolve(EventEmitter_1.EventEmitter);
        messages.forEach((message) => {
            eventEmitter.emit(messageContext.agentContext, {
                type: Events_1.AgentEventTypes.AgentMessageReceived,
                payload: {
                    message: message.message,
                    contextCorrelationId: messageContext.agentContext.contextCorrelationId,
                },
            });
        });
        // A Batch message without messages at all means that we are done with the
        // message pickup process (Note: this is not optimal since we'll always doing an extra
        // Batch Pickup. However, it is safer and should be faster than waiting an entire loop
        // interval to retrieve more messages)
        if (messages.length === 0) {
            eventEmitter.emit(messageContext.agentContext, {
                type: MessagePickupEvents_1.MessagePickupEventTypes.MessagePickupCompleted,
                payload: {
                    connection,
                    threadId: batchMessage.threadId,
                },
            });
            return null;
        }
        return (await this.createPickupMessage(agentContext, { connectionRecord: connection })).message;
    }
};
V1MessagePickupProtocol = __decorate([
    (0, plugins_1.injectable)()
], V1MessagePickupProtocol);
exports.V1MessagePickupProtocol = V1MessagePickupProtocol;
//# sourceMappingURL=V1MessagePickupProtocol.js.map