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
exports.Dispatcher = void 0;
const constants_1 = require("../constants");
const CredoError_1 = require("../error/CredoError");
const plugins_1 = require("../plugins");
const messageType_1 = require("../utils/messageType");
const ProblemReportMessage_1 = require("./../modules/problem-reports/messages/ProblemReportMessage");
const EventEmitter_1 = require("./EventEmitter");
const Events_1 = require("./Events");
const MessageHandlerRegistry_1 = require("./MessageHandlerRegistry");
const MessageSender_1 = require("./MessageSender");
const models_1 = require("./models");
let Dispatcher = class Dispatcher {
    constructor(messageSender, eventEmitter, messageHandlerRegistry, logger) {
        this.messageSender = messageSender;
        this.eventEmitter = eventEmitter;
        this.messageHandlerRegistry = messageHandlerRegistry;
        this.logger = logger;
    }
    async dispatch(messageContext) {
        const { agentContext, connection, senderKey, recipientKey, message } = messageContext;
        const messageHandler = this.messageHandlerRegistry.getHandlerForMessageType(message.type);
        if (!messageHandler) {
            throw new CredoError_1.CredoError(`No handler for message type "${message.type}" found`);
        }
        let outboundMessage;
        try {
            outboundMessage = await messageHandler.handle(messageContext);
        }
        catch (error) {
            const problemReportMessage = error.problemReport;
            if (problemReportMessage instanceof ProblemReportMessage_1.ProblemReportMessage && messageContext.connection) {
                const { protocolUri: problemReportProtocolUri } = (0, messageType_1.parseMessageType)(problemReportMessage.type);
                const { protocolUri: inboundProtocolUri } = (0, messageType_1.parseMessageType)(messageContext.message.type);
                // If the inbound protocol uri is the same as the problem report protocol uri, we can see the interaction as the same thread
                // However if it is no the same we should see it as a new thread, where the inbound message `@id` is the parentThreadId
                if (inboundProtocolUri === problemReportProtocolUri) {
                    problemReportMessage.setThread({
                        threadId: message.threadId,
                    });
                }
                else {
                    problemReportMessage.setThread({
                        parentThreadId: message.id,
                    });
                }
                outboundMessage = new models_1.OutboundMessageContext(problemReportMessage, {
                    agentContext,
                    connection: messageContext.connection,
                    inboundMessageContext: messageContext,
                });
            }
            else {
                this.logger.error(`Error handling message with type ${message.type}`, {
                    message: message.toJSON(),
                    error,
                    senderKey: senderKey === null || senderKey === void 0 ? void 0 : senderKey.fingerprint,
                    recipientKey: recipientKey === null || recipientKey === void 0 ? void 0 : recipientKey.fingerprint,
                    connectionId: connection === null || connection === void 0 ? void 0 : connection.id,
                });
                throw error;
            }
        }
        if (outboundMessage) {
            // set the inbound message context, if not already defined
            if (!outboundMessage.inboundMessageContext) {
                outboundMessage.inboundMessageContext = messageContext;
            }
            await this.messageSender.sendMessage(outboundMessage);
        }
        // Emit event that allows to hook into received messages
        this.eventEmitter.emit(agentContext, {
            type: Events_1.AgentEventTypes.AgentMessageProcessed,
            payload: {
                message,
                connection,
                receivedAt: messageContext.receivedAt,
            },
        });
    }
};
Dispatcher = __decorate([
    (0, plugins_1.injectable)(),
    __param(3, (0, plugins_1.inject)(constants_1.InjectionSymbols.Logger)),
    __metadata("design:paramtypes", [MessageSender_1.MessageSender,
        EventEmitter_1.EventEmitter,
        MessageHandlerRegistry_1.MessageHandlerRegistry, Object])
], Dispatcher);
exports.Dispatcher = Dispatcher;
//# sourceMappingURL=Dispatcher.js.map