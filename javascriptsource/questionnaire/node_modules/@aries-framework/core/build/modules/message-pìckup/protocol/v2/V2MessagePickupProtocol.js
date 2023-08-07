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
exports.V2MessagePickupProtocol = void 0;
const EventEmitter_1 = require("../../../../agent/EventEmitter");
const Events_1 = require("../../../../agent/Events");
const MessageSender_1 = require("../../../../agent/MessageSender");
const models_1 = require("../../../../agent/models");
const constants_1 = require("../../../../constants");
const Attachment_1 = require("../../../../decorators/attachment/Attachment");
const error_1 = require("../../../../error");
const plugins_1 = require("../../../../plugins");
const connections_1 = require("../../../connections");
const problem_reports_1 = require("../../../problem-reports");
const error_2 = require("../../../routing/error");
const MessagePickupModuleConfig_1 = require("../../MessagePickupModuleConfig");
const BaseMessagePickupProtocol_1 = require("../BaseMessagePickupProtocol");
const handlers_1 = require("./handlers");
const messages_1 = require("./messages");
let V2MessagePickupProtocol = class V2MessagePickupProtocol extends BaseMessagePickupProtocol_1.BaseMessagePickupProtocol {
    constructor() {
        super();
        /**
         * The version of the message pickup protocol this class supports
         */
        this.version = 'v2';
    }
    /**
     * Registers the protocol implementation (handlers, feature registry) on the agent.
     */
    register(dependencyManager, featureRegistry) {
        dependencyManager.registerMessageHandlers([
            new handlers_1.V2StatusRequestHandler(this),
            new handlers_1.V2DeliveryRequestHandler(this),
            new handlers_1.V2MessagesReceivedHandler(this),
            new handlers_1.V2StatusHandler(this),
            new handlers_1.V2MessageDeliveryHandler(this),
        ]);
        featureRegistry.register(new models_1.Protocol({
            id: 'https://didcomm.org/messagepickup/2.0',
            roles: ['mediator', 'recipient'],
        }));
    }
    async pickupMessages(agentContext, options) {
        const { connectionRecord, recipientKey } = options;
        connectionRecord.assertReady();
        const message = new messages_1.V2StatusRequestMessage({
            recipientKey,
        });
        return { message };
    }
    async processStatusRequest(messageContext) {
        // Assert ready connection
        const connection = messageContext.assertReadyConnection();
        const messageRepository = messageContext.agentContext.dependencyManager.resolve(constants_1.InjectionSymbols.MessageRepository);
        if (messageContext.message.recipientKey) {
            throw new error_1.AriesFrameworkError('recipient_key parameter not supported');
        }
        const statusMessage = new messages_1.V2StatusMessage({
            threadId: messageContext.message.threadId,
            messageCount: await messageRepository.getAvailableMessageCount(connection.id),
        });
        return new models_1.OutboundMessageContext(statusMessage, { agentContext: messageContext.agentContext, connection });
    }
    async processDeliveryRequest(messageContext) {
        // Assert ready connection
        const connection = messageContext.assertReadyConnection();
        if (messageContext.message.recipientKey) {
            throw new error_1.AriesFrameworkError('recipient_key parameter not supported');
        }
        const { message } = messageContext;
        const messageRepository = messageContext.agentContext.dependencyManager.resolve(constants_1.InjectionSymbols.MessageRepository);
        // Get available messages from queue, but don't delete them
        const messages = await messageRepository.takeFromQueue(connection.id, message.limit, true);
        // TODO: each message should be stored with an id. to be able to conform to the id property
        // of delivery message
        const attachments = messages.map((msg) => new Attachment_1.Attachment({
            data: {
                json: msg,
            },
        }));
        const outboundMessageContext = messages.length > 0
            ? new messages_1.V2MessageDeliveryMessage({
                threadId: messageContext.message.threadId,
                attachments,
            })
            : new messages_1.V2StatusMessage({
                threadId: messageContext.message.threadId,
                messageCount: 0,
            });
        return new models_1.OutboundMessageContext(outboundMessageContext, { agentContext: messageContext.agentContext, connection });
    }
    async processMessagesReceived(messageContext) {
        // Assert ready connection
        const connection = messageContext.assertReadyConnection();
        const { message } = messageContext;
        const messageRepository = messageContext.agentContext.dependencyManager.resolve(constants_1.InjectionSymbols.MessageRepository);
        // TODO: Add Queued Message ID
        await messageRepository.takeFromQueue(connection.id, message.messageIdList ? message.messageIdList.length : undefined);
        const statusMessage = new messages_1.V2StatusMessage({
            threadId: messageContext.message.threadId,
            messageCount: await messageRepository.getAvailableMessageCount(connection.id),
        });
        return new models_1.OutboundMessageContext(statusMessage, { agentContext: messageContext.agentContext, connection });
    }
    async processStatus(messageContext) {
        const connection = messageContext.assertReadyConnection();
        const { message: statusMessage } = messageContext;
        const { messageCount, recipientKey } = statusMessage;
        const connectionService = messageContext.agentContext.dependencyManager.resolve(connections_1.ConnectionService);
        const messageSender = messageContext.agentContext.dependencyManager.resolve(MessageSender_1.MessageSender);
        const messagePickupModuleConfig = messageContext.agentContext.dependencyManager.resolve(MessagePickupModuleConfig_1.MessagePickupModuleConfig);
        //No messages to be sent
        if (messageCount === 0) {
            const { message, connectionRecord } = await connectionService.createTrustPing(messageContext.agentContext, connection, {
                responseRequested: false,
            });
            // FIXME: check where this flow fits, as it seems very particular for the AFJ-ACA-Py combination
            const websocketSchemes = ['ws', 'wss'];
            await messageSender.sendMessage(new models_1.OutboundMessageContext(message, {
                agentContext: messageContext.agentContext,
                connection: connectionRecord,
            }), {
                transportPriority: {
                    schemes: websocketSchemes,
                    restrictive: true,
                    // TODO: add keepAlive: true to enforce through the public api
                    // we need to keep the socket alive. It already works this way, but would
                    // be good to make more explicit from the public facing API.
                    // This would also make it easier to change the internal API later on.
                    // keepAlive: true,
                },
            });
            return null;
        }
        const { maximumBatchSize: maximumMessagePickup } = messagePickupModuleConfig;
        const limit = messageCount < maximumMessagePickup ? messageCount : maximumMessagePickup;
        const deliveryRequestMessage = new messages_1.V2DeliveryRequestMessage({
            limit,
            recipientKey,
        });
        return deliveryRequestMessage;
    }
    async processDelivery(messageContext) {
        messageContext.assertReadyConnection();
        const { appendedAttachments } = messageContext.message;
        const eventEmitter = messageContext.agentContext.dependencyManager.resolve(EventEmitter_1.EventEmitter);
        if (!appendedAttachments)
            throw new problem_reports_1.ProblemReportError('Error processing attachments', {
                problemCode: error_2.RoutingProblemReportReason.ErrorProcessingAttachments,
            });
        const ids = [];
        for (const attachment of appendedAttachments) {
            ids.push(attachment.id);
            eventEmitter.emit(messageContext.agentContext, {
                type: Events_1.AgentEventTypes.AgentMessageReceived,
                payload: {
                    message: attachment.getDataAsJson(),
                    contextCorrelationId: messageContext.agentContext.contextCorrelationId,
                },
            });
        }
        return new messages_1.V2MessagesReceivedMessage({
            messageIdList: ids,
        });
    }
};
V2MessagePickupProtocol = __decorate([
    (0, plugins_1.injectable)(),
    __metadata("design:paramtypes", [])
], V2MessagePickupProtocol);
exports.V2MessagePickupProtocol = V2MessagePickupProtocol;
//# sourceMappingURL=V2MessagePickupProtocol.js.map