"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForwardHandler = void 0;
const messages_1 = require("../messages");
class ForwardHandler {
    constructor(mediatorService) {
        this.supportedMessages = [messages_1.ForwardMessage];
        this.mediatorService = mediatorService;
    }
    async handle(messageContext) {
        await this.mediatorService.processForwardMessage(messageContext);
    }
}
exports.ForwardHandler = ForwardHandler;
//# sourceMappingURL=ForwardHandler.js.map