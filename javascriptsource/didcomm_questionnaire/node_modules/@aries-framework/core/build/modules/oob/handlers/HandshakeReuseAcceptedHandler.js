"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandshakeReuseAcceptedHandler = void 0;
const HandshakeReuseAcceptedMessage_1 = require("../messages/HandshakeReuseAcceptedMessage");
class HandshakeReuseAcceptedHandler {
    constructor(outOfBandService) {
        this.supportedMessages = [HandshakeReuseAcceptedMessage_1.HandshakeReuseAcceptedMessage];
        this.outOfBandService = outOfBandService;
    }
    async handle(messageContext) {
        messageContext.assertReadyConnection();
        await this.outOfBandService.processHandshakeReuseAccepted(messageContext);
    }
}
exports.HandshakeReuseAcceptedHandler = HandshakeReuseAcceptedHandler;
//# sourceMappingURL=HandshakeReuseAcceptedHandler.js.map