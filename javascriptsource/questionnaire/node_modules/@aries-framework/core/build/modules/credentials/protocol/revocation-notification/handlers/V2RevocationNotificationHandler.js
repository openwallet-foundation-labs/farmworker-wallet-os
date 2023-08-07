"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.V2RevocationNotificationHandler = void 0;
const V2RevocationNotificationMessage_1 = require("../messages/V2RevocationNotificationMessage");
class V2RevocationNotificationHandler {
    constructor(revocationService) {
        this.supportedMessages = [V2RevocationNotificationMessage_1.V2RevocationNotificationMessage];
        this.revocationService = revocationService;
    }
    async handle(messageContext) {
        await this.revocationService.v2ProcessRevocationNotification(messageContext);
    }
}
exports.V2RevocationNotificationHandler = V2RevocationNotificationHandler;
//# sourceMappingURL=V2RevocationNotificationHandler.js.map