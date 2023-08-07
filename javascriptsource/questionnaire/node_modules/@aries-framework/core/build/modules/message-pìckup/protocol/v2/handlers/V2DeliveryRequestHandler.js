"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.V2DeliveryRequestHandler = void 0;
const messages_1 = require("../messages");
class V2DeliveryRequestHandler {
    constructor(messagePickupService) {
        this.supportedMessages = [messages_1.V2DeliveryRequestMessage];
        this.messagePickupService = messagePickupService;
    }
    async handle(messageContext) {
        messageContext.assertReadyConnection();
        return this.messagePickupService.processDeliveryRequest(messageContext);
    }
}
exports.V2DeliveryRequestHandler = V2DeliveryRequestHandler;
//# sourceMappingURL=V2DeliveryRequestHandler.js.map