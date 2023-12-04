"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrustPingResponseMessageHandler = void 0;
const messages_1 = require("../messages");
class TrustPingResponseMessageHandler {
    constructor(trustPingService) {
        this.supportedMessages = [messages_1.TrustPingResponseMessage];
        this.trustPingService = trustPingService;
    }
    async handle(inboundMessage) {
        return this.trustPingService.processPingResponse(inboundMessage);
    }
}
exports.TrustPingResponseMessageHandler = TrustPingResponseMessageHandler;
//# sourceMappingURL=TrustPingResponseMessageHandler.js.map