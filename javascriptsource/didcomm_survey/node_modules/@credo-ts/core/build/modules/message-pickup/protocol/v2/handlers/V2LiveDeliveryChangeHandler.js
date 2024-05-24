"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.V2LiveDeliveryChangeHandler = void 0;
const messages_1 = require("../messages");
class V2LiveDeliveryChangeHandler {
    constructor(messagePickupService) {
        this.supportedMessages = [messages_1.V2LiveDeliveryChangeMessage];
        this.messagePickupService = messagePickupService;
    }
    async handle(messageContext) {
        messageContext.assertReadyConnection();
        return this.messagePickupService.processLiveDeliveryChange(messageContext);
    }
}
exports.V2LiveDeliveryChangeHandler = V2LiveDeliveryChangeHandler;
//# sourceMappingURL=V2LiveDeliveryChangeHandler.js.map