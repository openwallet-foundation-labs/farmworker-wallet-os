"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediationDenyHandler = void 0;
const messages_1 = require("../messages");
class MediationDenyHandler {
    constructor(mediationRecipientService) {
        this.supportedMessages = [messages_1.MediationDenyMessage];
        this.mediationRecipientService = mediationRecipientService;
    }
    async handle(messageContext) {
        messageContext.assertReadyConnection();
        await this.mediationRecipientService.processMediationDeny(messageContext);
    }
}
exports.MediationDenyHandler = MediationDenyHandler;
//# sourceMappingURL=MediationDenyHandler.js.map