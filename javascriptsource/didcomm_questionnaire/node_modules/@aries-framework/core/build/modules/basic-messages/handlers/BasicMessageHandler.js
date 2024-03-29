"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicMessageHandler = void 0;
const messages_1 = require("../messages");
class BasicMessageHandler {
    constructor(basicMessageService) {
        this.supportedMessages = [messages_1.BasicMessage];
        this.basicMessageService = basicMessageService;
    }
    async handle(messageContext) {
        const connection = messageContext.assertReadyConnection();
        await this.basicMessageService.save(messageContext, connection);
    }
}
exports.BasicMessageHandler = BasicMessageHandler;
//# sourceMappingURL=BasicMessageHandler.js.map