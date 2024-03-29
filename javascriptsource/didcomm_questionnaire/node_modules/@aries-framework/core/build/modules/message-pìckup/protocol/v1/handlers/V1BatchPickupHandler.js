"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.V1BatchPickupHandler = void 0;
const messages_1 = require("../messages");
class V1BatchPickupHandler {
    constructor(messagePickupService) {
        this.supportedMessages = [messages_1.V1BatchPickupMessage];
        this.messagePickupService = messagePickupService;
    }
    async handle(messageContext) {
        messageContext.assertReadyConnection();
        return this.messagePickupService.processBatchPickup(messageContext);
    }
}
exports.V1BatchPickupHandler = V1BatchPickupHandler;
//# sourceMappingURL=V1BatchPickupHandler.js.map