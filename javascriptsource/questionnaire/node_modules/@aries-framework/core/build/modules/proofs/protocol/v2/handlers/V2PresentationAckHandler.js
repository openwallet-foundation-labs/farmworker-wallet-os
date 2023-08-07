"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.V2PresentationAckHandler = void 0;
const messages_1 = require("../messages");
class V2PresentationAckHandler {
    constructor(proofProtocol) {
        this.supportedMessages = [messages_1.V2PresentationAckMessage];
        this.proofProtocol = proofProtocol;
    }
    async handle(messageContext) {
        await this.proofProtocol.processAck(messageContext);
    }
}
exports.V2PresentationAckHandler = V2PresentationAckHandler;
//# sourceMappingURL=V2PresentationAckHandler.js.map