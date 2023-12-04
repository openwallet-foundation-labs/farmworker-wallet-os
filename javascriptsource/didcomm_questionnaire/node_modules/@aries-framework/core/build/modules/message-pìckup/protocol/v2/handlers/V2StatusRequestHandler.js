"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.V2StatusRequestHandler = void 0;
const messages_1 = require("../messages");
class V2StatusRequestHandler {
    constructor(messagePickupService) {
        this.supportedMessages = [messages_1.V2StatusRequestMessage];
        this.messagePickupService = messagePickupService;
    }
    async handle(messageContext) {
        messageContext.assertReadyConnection();
        return this.messagePickupService.processStatusRequest(messageContext);
    }
}
exports.V2StatusRequestHandler = V2StatusRequestHandler;
//# sourceMappingURL=V2StatusRequestHandler.js.map