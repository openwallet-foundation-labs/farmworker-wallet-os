"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.V2RequestPresentationHandler = void 0;
const models_1 = require("../../../../../agent/models");
const ServiceDecorator_1 = require("../../../../../decorators/service/ServiceDecorator");
const storage_1 = require("../../../../../storage");
const DidCommMessageRepository_1 = require("../../../../../storage/didcomm/DidCommMessageRepository");
const routing_1 = require("../../../../routing");
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
        if (messageContext.connection) {
            return new models_1.OutboundMessageContext(message, {
                agentContext: messageContext.agentContext,
                connection: messageContext.connection,
                associatedRecord: proofRecord,
            });
        }
        else if (messageContext.message.service) {
            const routingService = messageContext.agentContext.dependencyManager.resolve(routing_1.RoutingService);
            const didCommMessageRepository = messageContext.agentContext.dependencyManager.resolve(DidCommMessageRepository_1.DidCommMessageRepository);
            const routing = await routingService.getRouting(messageContext.agentContext);
            message.service = new ServiceDecorator_1.ServiceDecorator({
                serviceEndpoint: routing.endpoints[0],
                recipientKeys: [routing.recipientKey.publicKeyBase58],
                routingKeys: routing.routingKeys.map((key) => key.publicKeyBase58),
            });
            const recipientService = messageContext.message.service;
            await didCommMessageRepository.saveOrUpdateAgentMessage(messageContext.agentContext, {
                agentMessage: message,
                associatedRecordId: proofRecord.id,
                role: storage_1.DidCommMessageRole.Sender,
            });
            return new models_1.OutboundMessageContext(message, {
                agentContext: messageContext.agentContext,
                serviceParams: {
                    service: recipientService.resolvedDidCommService,
                    senderKey: message.service.resolvedDidCommService.recipientKeys[0],
                    returnRoute: true,
                },
            });
        }
        messageContext.agentContext.config.logger.error(`Could not automatically create presentation`);
    }
}
exports.V2RequestPresentationHandler = V2RequestPresentationHandler;
//# sourceMappingURL=V2RequestPresentationHandler.js.map