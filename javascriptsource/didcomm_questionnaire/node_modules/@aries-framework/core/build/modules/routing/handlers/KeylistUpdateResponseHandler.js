"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeylistUpdateResponseHandler = void 0;
const messages_1 = require("../messages");
class KeylistUpdateResponseHandler {
    constructor(mediationRecipientService) {
        this.supportedMessages = [messages_1.KeylistUpdateResponseMessage];
        this.mediationRecipientService = mediationRecipientService;
    }
    async handle(messageContext) {
        messageContext.assertReadyConnection();
        return await this.mediationRecipientService.processKeylistUpdateResults(messageContext);
    }
}
exports.KeylistUpdateResponseHandler = KeylistUpdateResponseHandler;
//# sourceMappingURL=KeylistUpdateResponseHandler.js.map