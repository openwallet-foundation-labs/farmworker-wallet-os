"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.V2ProposePresentationHandler = void 0;
const models_1 = require("../../../../../agent/models");
const V2ProposePresentationMessage_1 = require("../messages/V2ProposePresentationMessage");
class V2ProposePresentationHandler {
    constructor(proofProtocol) {
        this.supportedMessages = [V2ProposePresentationMessage_1.V2ProposePresentationMessage];
        this.proofProtocol = proofProtocol;
    }
    async handle(messageContext) {
        const proofRecord = await this.proofProtocol.processProposal(messageContext);
        const shouldAutoRespond = await this.proofProtocol.shouldAutoRespondToProposal(messageContext.agentContext, {
            proofRecord,
            proposalMessage: messageContext.message,
        });
        if (shouldAutoRespond) {
            return this.acceptProposal(proofRecord, messageContext);
        }
    }
    async acceptProposal(proofRecord, messageContext) {
        messageContext.agentContext.config.logger.info(`Automatically sending request with autoAccept`);
        if (!messageContext.connection) {
            messageContext.agentContext.config.logger.error('No connection on the messageContext, aborting auto accept');
            return;
        }
        const { message } = await this.proofProtocol.acceptProposal(messageContext.agentContext, { proofRecord });
        return new models_1.OutboundMessageContext(message, {
            agentContext: messageContext.agentContext,
            connection: messageContext.connection,
            associatedRecord: proofRecord,
        });
    }
}
exports.V2ProposePresentationHandler = V2ProposePresentationHandler;
//# sourceMappingURL=V2ProposePresentationHandler.js.map