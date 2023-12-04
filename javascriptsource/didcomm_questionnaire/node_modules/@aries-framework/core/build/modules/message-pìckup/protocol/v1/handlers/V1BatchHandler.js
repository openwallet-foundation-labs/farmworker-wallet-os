"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.V1BatchHandler = void 0;
const EventEmitter_1 = require("../../../../../agent/EventEmitter");
const Events_1 = require("../../../../../agent/Events");
const messages_1 = require("../messages");
class V1BatchHandler {
    constructor() {
        this.supportedMessages = [messages_1.V1BatchMessage];
    }
    async handle(messageContext) {
        const { message } = messageContext;
        const eventEmitter = messageContext.agentContext.dependencyManager.resolve(EventEmitter_1.EventEmitter);
        messageContext.assertReadyConnection();
        const forwardedMessages = message.messages;
        forwardedMessages.forEach((message) => {
            eventEmitter.emit(messageContext.agentContext, {
                type: Events_1.AgentEventTypes.AgentMessageReceived,
                payload: {
                    message: message.message,
                    contextCorrelationId: messageContext.agentContext.contextCorrelationId,
                },
            });
        });
    }
}
exports.V1BatchHandler = V1BatchHandler;
//# sourceMappingURL=V1BatchHandler.js.map