"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.V2OfferCredentialHandler = void 0;
const getOutboundMessageContext_1 = require("../../../../../agent/getOutboundMessageContext");
const V2OfferCredentialMessage_1 = require("../messages/V2OfferCredentialMessage");
class V2OfferCredentialHandler {
    constructor(credentialProtocol) {
        this.supportedMessages = [V2OfferCredentialMessage_1.V2OfferCredentialMessage];
        this.credentialProtocol = credentialProtocol;
    }
    async handle(messageContext) {
        const credentialRecord = await this.credentialProtocol.processOffer(messageContext);
        const shouldAutoRespond = await this.credentialProtocol.shouldAutoRespondToOffer(messageContext.agentContext, {
            credentialRecord,
            offerMessage: messageContext.message,
        });
        if (shouldAutoRespond) {
            return await this.acceptOffer(credentialRecord, messageContext);
        }
    }
    async acceptOffer(credentialRecord, messageContext) {
        messageContext.agentContext.config.logger.info(`Automatically sending request with autoAccept`);
        const { message } = await this.credentialProtocol.acceptOffer(messageContext.agentContext, { credentialRecord });
        return (0, getOutboundMessageContext_1.getOutboundMessageContext)(messageContext.agentContext, {
            connectionRecord: messageContext.connection,
            message,
            associatedRecord: credentialRecord,
            lastReceivedMessage: messageContext.message,
        });
    }
}
exports.V2OfferCredentialHandler = V2OfferCredentialHandler;
//# sourceMappingURL=V2OfferCredentialHandler.js.map