"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.V2OfferCredentialHandler = void 0;
const models_1 = require("../../../../../agent/models");
const ServiceDecorator_1 = require("../../../../../decorators/service/ServiceDecorator");
const storage_1 = require("../../../../../storage");
const RoutingService_1 = require("../../../../routing/services/RoutingService");
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
        var _a;
        messageContext.agentContext.config.logger.info(`Automatically sending request with autoAccept`);
        if (messageContext.connection) {
            const { message } = await this.credentialProtocol.acceptOffer(messageContext.agentContext, {
                credentialRecord,
            });
            return new models_1.OutboundMessageContext(message, {
                agentContext: messageContext.agentContext,
                connection: messageContext.connection,
                associatedRecord: credentialRecord,
            });
        }
        else if ((_a = messageContext.message) === null || _a === void 0 ? void 0 : _a.service) {
            const routingService = messageContext.agentContext.dependencyManager.resolve(RoutingService_1.RoutingService);
            const routing = await routingService.getRouting(messageContext.agentContext);
            const ourService = new ServiceDecorator_1.ServiceDecorator({
                serviceEndpoint: routing.endpoints[0],
                recipientKeys: [routing.recipientKey.publicKeyBase58],
                routingKeys: routing.routingKeys.map((key) => key.publicKeyBase58),
            });
            const recipientService = messageContext.message.service;
            const { message } = await this.credentialProtocol.acceptOffer(messageContext.agentContext, {
                credentialRecord,
            });
            // Set and save ~service decorator to record (to remember our verkey)
            message.service = ourService;
            const didCommMessageRepository = messageContext.agentContext.dependencyManager.resolve(storage_1.DidCommMessageRepository);
            await didCommMessageRepository.saveOrUpdateAgentMessage(messageContext.agentContext, {
                agentMessage: message,
                role: storage_1.DidCommMessageRole.Sender,
                associatedRecordId: credentialRecord.id,
            });
            return new models_1.OutboundMessageContext(message, {
                agentContext: messageContext.agentContext,
                serviceParams: {
                    service: recipientService.resolvedDidCommService,
                    senderKey: ourService.resolvedDidCommService.recipientKeys[0],
                },
            });
        }
        messageContext.agentContext.config.logger.error(`Could not automatically create credential request`);
    }
}
exports.V2OfferCredentialHandler = V2OfferCredentialHandler;
//# sourceMappingURL=V2OfferCredentialHandler.js.map