"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.V2IssueCredentialHandler = void 0;
const models_1 = require("../../../../../agent/models");
const storage_1 = require("../../../../../storage");
const V2IssueCredentialMessage_1 = require("../messages/V2IssueCredentialMessage");
const V2RequestCredentialMessage_1 = require("../messages/V2RequestCredentialMessage");
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
        const didCommMessageRepository = messageContext.agentContext.dependencyManager.resolve(storage_1.DidCommMessageRepository);
        const requestMessage = await didCommMessageRepository.findAgentMessage(messageContext.agentContext, {
            associatedRecordId: credentialRecord.id,
            messageClass: V2RequestCredentialMessage_1.V2RequestCredentialMessage,
        });
        const { message } = await this.credentialProtocol.acceptCredential(messageContext.agentContext, {
            credentialRecord,
        });
        if (messageContext.connection) {
            return new models_1.OutboundMessageContext(message, {
                agentContext: messageContext.agentContext,
                connection: messageContext.connection,
                associatedRecord: credentialRecord,
            });
        }
        else if ((requestMessage === null || requestMessage === void 0 ? void 0 : requestMessage.service) && messageContext.message.service) {
            const recipientService = messageContext.message.service;
            const ourService = requestMessage.service;
            return new models_1.OutboundMessageContext(message, {
                agentContext: messageContext.agentContext,
                serviceParams: {
                    service: recipientService.resolvedDidCommService,
                    senderKey: ourService.resolvedDidCommService.recipientKeys[0],
                },
            });
        }
        messageContext.agentContext.config.logger.error(`Could not automatically create credential ack`);
    }
}
exports.V2IssueCredentialHandler = V2IssueCredentialHandler;
//# sourceMappingURL=V2IssueCredentialHandler.js.map