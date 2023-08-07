"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.V2RequestCredentialHandler = void 0;
const models_1 = require("../../../../../agent/models");
const storage_1 = require("../../../../../storage");
const V2OfferCredentialMessage_1 = require("../messages/V2OfferCredentialMessage");
const V2RequestCredentialMessage_1 = require("../messages/V2RequestCredentialMessage");
class V2RequestCredentialHandler {
    constructor(credentialProtocol) {
        this.supportedMessages = [V2RequestCredentialMessage_1.V2RequestCredentialMessage];
        this.credentialProtocol = credentialProtocol;
    }
    async handle(messageContext) {
        const credentialRecord = await this.credentialProtocol.processRequest(messageContext);
        const shouldAutoRespond = await this.credentialProtocol.shouldAutoRespondToRequest(messageContext.agentContext, {
            credentialRecord,
            requestMessage: messageContext.message,
        });
        if (shouldAutoRespond) {
            return await this.acceptRequest(credentialRecord, messageContext);
        }
    }
    async acceptRequest(credentialRecord, messageContext) {
        messageContext.agentContext.config.logger.info(`Automatically sending credential with autoAccept`);
        const didCommMessageRepository = messageContext.agentContext.dependencyManager.resolve(storage_1.DidCommMessageRepository);
        const offerMessage = await didCommMessageRepository.findAgentMessage(messageContext.agentContext, {
            associatedRecordId: credentialRecord.id,
            messageClass: V2OfferCredentialMessage_1.V2OfferCredentialMessage,
        });
        const { message } = await this.credentialProtocol.acceptRequest(messageContext.agentContext, {
            credentialRecord,
        });
        if (messageContext.connection) {
            return new models_1.OutboundMessageContext(message, {
                agentContext: messageContext.agentContext,
                connection: messageContext.connection,
                associatedRecord: credentialRecord,
            });
        }
        else if (messageContext.message.service && (offerMessage === null || offerMessage === void 0 ? void 0 : offerMessage.service)) {
            const recipientService = messageContext.message.service;
            const ourService = offerMessage.service;
            // Set ~service, update message in record (for later use)
            message.setService(ourService);
            await didCommMessageRepository.saveOrUpdateAgentMessage(messageContext.agentContext, {
                agentMessage: message,
                associatedRecordId: credentialRecord.id,
                role: storage_1.DidCommMessageRole.Sender,
            });
            return new models_1.OutboundMessageContext(message, {
                agentContext: messageContext.agentContext,
                serviceParams: {
                    service: recipientService.resolvedDidCommService,
                    senderKey: ourService.resolvedDidCommService.recipientKeys[0],
                },
            });
        }
        messageContext.agentContext.config.logger.error(`Could not automatically issue credential`);
    }
}
exports.V2RequestCredentialHandler = V2RequestCredentialHandler;
//# sourceMappingURL=V2RequestCredentialHandler.js.map