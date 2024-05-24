"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.V2CredentialAckHandler = void 0;
const V2CredentialAckMessage_1 = require("../messages/V2CredentialAckMessage");
class V2CredentialAckHandler {
    constructor(credentialProtocol) {
        this.supportedMessages = [V2CredentialAckMessage_1.V2CredentialAckMessage];
        this.credentialProtocol = credentialProtocol;
    }
    async handle(messageContext) {
        await this.credentialProtocol.processAck(messageContext);
    }
}
exports.V2CredentialAckHandler = V2CredentialAckHandler;
//# sourceMappingURL=V2CredentialAckHandler.js.map