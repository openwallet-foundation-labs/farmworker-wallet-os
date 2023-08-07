"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.V2MessageDeliveryHandler = void 0;
const models_1 = require("../../../../../agent/models");
const V2MessageDeliveryMessage_1 = require("../messages/V2MessageDeliveryMessage");
class V2MessageDeliveryHandler {
    constructor(messagePickupService) {
        this.supportedMessages = [V2MessageDeliveryMessage_1.V2MessageDeliveryMessage];
        this.messagePickupService = messagePickupService;
    }
    async handle(messageContext) {
        const connection = messageContext.assertReadyConnection();
        const deliveryReceivedMessage = await this.messagePickupService.processDelivery(messageContext);
        if (deliveryReceivedMessage) {
            return new models_1.OutboundMessageContext(deliveryReceivedMessage, {
                agentContext: messageContext.agentContext,
                connection,
            });
        }
    }
}
exports.V2MessageDeliveryHandler = V2MessageDeliveryHandler;
//# sourceMappingURL=V2MessageDeliveryHandler.js.map