"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.V1RevocationNotificationHandler = void 0;
const V1RevocationNotificationMessage_1 = require("../messages/V1RevocationNotificationMessage");
class V1RevocationNotificationHandler {
    constructor(revocationService) {
        this.supportedMessages = [V1RevocationNotificationMessage_1.V1RevocationNotificationMessage];
        this.revocationService = revocationService;
    }
    async handle(messageContext) {
        await this.revocationService.v1ProcessRevocationNotification(messageContext);
    }
}
exports.V1RevocationNotificationHandler = V1RevocationNotificationHandler;
//# sourceMappingURL=V1RevocationNotificationHandler.js.map