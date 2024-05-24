"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.V1BatchHandler = void 0;
const models_1 = require("../../../../../agent/models");
const messages_1 = require("../messages");
class V1BatchHandler {
    constructor(messagePickupProtocol) {
        this.supportedMessages = [messages_1.V1BatchMessage];
        this.messagePickupProtocol = messagePickupProtocol;
    }
    async handle(messageContext) {
        const connection = messageContext.assertReadyConnection();
        const batchRequestMessage = await this.messagePickupProtocol.processBatch(messageContext);
        if (batchRequestMessage) {
            return new models_1.OutboundMessageContext(batchRequestMessage, {
                agentContext: messageContext.agentContext,
                connection,
            });
        }
    }
}
exports.V1BatchHandler = V1BatchHandler;
//# sourceMappingURL=V1BatchHandler.js.map