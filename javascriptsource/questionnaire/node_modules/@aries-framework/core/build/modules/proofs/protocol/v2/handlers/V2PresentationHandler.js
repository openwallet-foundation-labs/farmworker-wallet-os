"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.V2PresentationHandler = void 0;
const models_1 = require("../../../../../agent/models");
const storage_1 = require("../../../../../storage");
const messages_1 = require("../messages");
class V2PresentationHandler {
    constructor(proofProtocol) {
        this.supportedMessages = [messages_1.V2PresentationMessage];
        this.proofProtocol = proofProtocol;
    }
    async handle(messageContext) {
        const proofRecord = await this.proofProtocol.processPresentation(messageContext);
        const shouldAutoRespond = await this.proofProtocol.shouldAutoRespondToPresentation(messageContext.agentContext, {
            proofRecord,
            presentationMessage: messageContext.message,
        });
        if (shouldAutoRespond) {
            return await this.acceptPresentation(proofRecord, messageContext);
        }
    }
    async acceptPresentation(proofRecord, messageContext) {
        var _a, _b;
        messageContext.agentContext.config.logger.info(`Automatically sending acknowledgement with autoAccept`);
        const { message } = await this.proofProtocol.acceptPresentation(messageContext.agentContext, {
            proofRecord,
        });
        const didCommMessageRepository = messageContext.agentContext.dependencyManager.resolve(storage_1.DidCommMessageRepository);
        const requestMessage = await didCommMessageRepository.findAgentMessage(messageContext.agentContext, {
            associatedRecordId: proofRecord.id,
            messageClass: messages_1.V2RequestPresentationMessage,
        });
        if (messageContext.connection) {
            return new models_1.OutboundMessageContext(message, {
                agentContext: messageContext.agentContext,
                connection: messageContext.connection,
                associatedRecord: proofRecord,
            });
        }
        else if ((requestMessage === null || requestMessage === void 0 ? void 0 : requestMessage.service) && ((_a = messageContext.message) === null || _a === void 0 ? void 0 : _a.service)) {
            const recipientService = (_b = messageContext.message) === null || _b === void 0 ? void 0 : _b.service;
            const ourService = requestMessage === null || requestMessage === void 0 ? void 0 : requestMessage.service;
            return new models_1.OutboundMessageContext(message, {
                agentContext: messageContext.agentContext,
                serviceParams: {
                    service: recipientService.resolvedDidCommService,
                    senderKey: ourService.resolvedDidCommService.recipientKeys[0],
                    returnRoute: true,
                },
            });
        }
        messageContext.agentContext.config.logger.error(`Could not automatically create presentation ack`);
    }
}
exports.V2PresentationHandler = V2PresentationHandler;
//# sourceMappingURL=V2PresentationHandler.js.map