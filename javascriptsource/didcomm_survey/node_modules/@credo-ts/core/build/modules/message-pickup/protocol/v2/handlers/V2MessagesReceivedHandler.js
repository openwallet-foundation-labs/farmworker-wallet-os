"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.V2MessagesReceivedHandler = void 0;
const messages_1 = require("../messages");
class V2MessagesReceivedHandler {
    constructor(messagePickupService) {
        this.supportedMessages = [messages_1.V2MessagesReceivedMessage];
        this.messagePickupService = messagePickupService;
    }
    async handle(messageContext) {
        messageContext.assertReadyConnection();
        return this.messagePickupService.processMessagesReceived(messageContext);
    }
}
exports.V2MessagesReceivedHandler = V2MessagesReceivedHandler;
//# sourceMappingURL=V2MessagesReceivedHandler.js.map