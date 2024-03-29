"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandshakeReuseHandler = void 0;
const models_1 = require("../../../agent/models");
const HandshakeReuseMessage_1 = require("../messages/HandshakeReuseMessage");
class HandshakeReuseHandler {
    constructor(outOfBandService) {
        this.supportedMessages = [HandshakeReuseMessage_1.HandshakeReuseMessage];
        this.outOfBandService = outOfBandService;
    }
    async handle(messageContext) {
        const connectionRecord = messageContext.assertReadyConnection();
        const handshakeReuseAcceptedMessage = await this.outOfBandService.processHandshakeReuse(messageContext);
        return new models_1.OutboundMessageContext(handshakeReuseAcceptedMessage, {
            agentContext: messageContext.agentContext,
            connection: connectionRecord,
        });
    }
}
exports.HandshakeReuseHandler = HandshakeReuseHandler;
//# sourceMappingURL=HandshakeReuseHandler.js.map