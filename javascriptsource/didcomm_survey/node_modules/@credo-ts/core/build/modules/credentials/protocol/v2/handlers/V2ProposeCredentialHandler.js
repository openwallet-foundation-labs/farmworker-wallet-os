"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.V2ProposeCredentialHandler = void 0;
const models_1 = require("../../../../../agent/models");
const V2ProposeCredentialMessage_1 = require("../messages/V2ProposeCredentialMessage");
class V2ProposeCredentialHandler {
    constructor(credentialProtocol) {
        this.supportedMessages = [V2ProposeCredentialMessage_1.V2ProposeCredentialMessage];
        this.credentialProtocol = credentialProtocol;
    }
    async handle(messageContext) {
        const credentialRecord = await this.credentialProtocol.processProposal(messageContext);
        const shouldAutoRespond = await this.credentialProtocol.shouldAutoRespondToProposal(messageContext.agentContext, {
            credentialRecord,
            proposalMessage: messageContext.message,
        });
        if (shouldAutoRespond) {
            return await this.acceptProposal(credentialRecord, messageContext);
        }
    }
    async acceptProposal(credentialRecord, messageContext) {
        messageContext.agentContext.config.logger.info(`Automatically sending offer with autoAccept`);
        if (!messageContext.connection) {
            messageContext.agentContext.config.logger.error('No connection on the messageContext, aborting auto accept');
            return;
        }
        const { message } = await this.credentialProtocol.acceptProposal(messageContext.agentContext, { credentialRecord });
        return new models_1.OutboundMessageContext(message, {
            agentContext: messageContext.agentContext,
            connection: messageContext.connection,
            associatedRecord: credentialRecord,
        });
    }
}
exports.V2ProposeCredentialHandler = V2ProposeCredentialHandler;
//# sourceMappingURL=V2ProposeCredentialHandler.js.map