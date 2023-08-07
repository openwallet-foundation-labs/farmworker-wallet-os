"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediationGrantHandler = void 0;
const messages_1 = require("../messages");
class MediationGrantHandler {
    constructor(mediationRecipientService) {
        this.supportedMessages = [messages_1.MediationGrantMessage];
        this.mediationRecipientService = mediationRecipientService;
    }
    async handle(messageContext) {
        messageContext.assertReadyConnection();
        await this.mediationRecipientService.processMediationGrant(messageContext);
    }
}
exports.MediationGrantHandler = MediationGrantHandler;
//# sourceMappingURL=MediationGrantHandler.js.map