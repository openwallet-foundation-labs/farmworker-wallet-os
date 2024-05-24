"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.V2IssueCredentialHandler = void 0;
const getOutboundMessageContext_1 = require("../../../../../agent/getOutboundMessageContext");
const error_1 = require("../../../../../error");
const V2IssueCredentialMessage_1 = require("../messages/V2IssueCredentialMessage");
class V2IssueCredentialHandler {
    constructor(credentialProtocol) {
        this.supportedMessages = [V2IssueCredentialMessage_1.V2IssueCredentialMessage];
        this.credentialProtocol = credentialProtocol;
    }
    async handle(messageContext) {
        const credentialRecord = await this.credentialProtocol.processCredential(messageContext);
        const shouldAutoRespond = await this.credentialProtocol.shouldAutoRespondToCredential(messageContext.agentContext, {
            credentialRecord,
            credentialMessage: messageContext.message,
        });
        if (shouldAutoRespond) {
            return await this.acceptCredential(credentialRecord, messageContext);
        }
    }
    async acceptCredential(credentialRecord, messageContext) {
        messageContext.agentContext.config.logger.info(`Automatically sending acknowledgement with autoAccept`);
        const { message } = await this.credentialProtocol.acceptCredential(messageContext.agentContext, {
            credentialRecord,
        });
        const requestMessage = await this.credentialProtocol.findRequestMessage(messageContext.agentContext, credentialRecord.id);
        if (!requestMessage) {
            throw new error_1.CredoError(`No request message found for credential record with id '${credentialRecord.id}'`);
        }
        return (0, getOutboundMessageContext_1.getOutboundMessageContext)(messageContext.agentContext, {
            connectionRecord: messageContext.connection,
            message,
            associatedRecord: credentialRecord,
            lastReceivedMessage: messageContext.message,
            lastSentMessage: requestMessage,
        });
    }
}
exports.V2IssueCredentialHandler = V2IssueCredentialHandler;
//# sourceMappingURL=V2IssueCredentialHandler.js.map