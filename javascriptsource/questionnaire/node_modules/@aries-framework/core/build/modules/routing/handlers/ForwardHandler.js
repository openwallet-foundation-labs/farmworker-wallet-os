"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForwardHandler = void 0;
const messages_1 = require("../messages");
class ForwardHandler {
    constructor(mediatorService, connectionService, messageSender) {
        this.supportedMessages = [messages_1.ForwardMessage];
        this.mediatorService = mediatorService;
        this.connectionService = connectionService;
        this.messageSender = messageSender;
    }
    async handle(messageContext) {
        const { encryptedMessage, mediationRecord } = await this.mediatorService.processForwardMessage(messageContext);
        const connectionRecord = await this.connectionService.getById(messageContext.agentContext, mediationRecord.connectionId);
        // The message inside the forward message is packed so we just send the packed
        // message to the connection associated with it
        await this.messageSender.sendPackage(messageContext.agentContext, {
            connection: connectionRecord,
            encryptedMessage,
        });
    }
}
exports.ForwardHandler = ForwardHandler;
//# sourceMappingURL=ForwardHandler.js.map