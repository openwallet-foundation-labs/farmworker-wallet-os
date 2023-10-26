"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.V2RequestPresentationHandler = void 0;
const getOutboundMessageContext_1 = require("../../../../../agent/getOutboundMessageContext");
const V2RequestPresentationMessage_1 = require("../messages/V2RequestPresentationMessage");
class V2RequestPresentationHandler {
    constructor(proofProtocol) {
        this.supportedMessages = [V2RequestPresentationMessage_1.V2RequestPresentationMessage];
        this.proofProtocol = proofProtocol;
    }
    async handle(messageContext) {
        const proofRecord = await this.proofProtocol.processRequest(messageContext);
        const shouldAutoRespond = await this.proofProtocol.shouldAutoRespondToRequest(messageContext.agentContext, {
            proofRecord,
            requestMessage: messageContext.message,
        });
        messageContext.agentContext.config.logger.debug(`Should auto respond to request: ${shouldAutoRespond}`);
        if (shouldAutoRespond) {
            return await this.acceptRequest(proofRecord, messageContext);
        }
    }
    async acceptRequest(proofRecord, messageContext) {
        messageContext.agentContext.config.logger.info(`Automatically sending presentation with autoAccept`);
        const { message } = await this.proofProtocol.acceptRequest(messageContext.agentContext, {
            proofRecord,
        });
        return (0, getOutboundMessageContext_1.getOutboundMessageContext)(messageContext.agentContext, {
            message,
            lastReceivedMessage: messageContext.message,
            associatedRecord: proofRecord,
            connectionRecord: messageContext.connection,
        });
    }
}
exports.V2RequestPresentationHandler = V2RequestPresentationHandler;
//# sourceMappingURL=V2RequestPresentationHandler.js.map