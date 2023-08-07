"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.V2StatusHandler = void 0;
const models_1 = require("../../../../../agent/models");
const messages_1 = require("../messages");
class V2StatusHandler {
    constructor(messagePickupService) {
        this.supportedMessages = [messages_1.V2StatusMessage];
        this.messagePickupService = messagePickupService;
    }
    async handle(messageContext) {
        const connection = messageContext.assertReadyConnection();
        const deliveryRequestMessage = await this.messagePickupService.processStatus(messageContext);
        if (deliveryRequestMessage) {
            return new models_1.OutboundMessageContext(deliveryRequestMessage, {
                agentContext: messageContext.agentContext,
                connection,
            });
        }
    }
}
exports.V2StatusHandler = V2StatusHandler;
//# sourceMappingURL=V2StatusHandler.js.map