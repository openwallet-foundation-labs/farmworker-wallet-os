"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediationRequestHandler = void 0;
const models_1 = require("../../../agent/models");
const MediationRequestMessage_1 = require("../messages/MediationRequestMessage");
class MediationRequestHandler {
    constructor(mediatorService, mediatorModuleConfig) {
        this.supportedMessages = [MediationRequestMessage_1.MediationRequestMessage];
        this.mediatorService = mediatorService;
        this.mediatorModuleConfig = mediatorModuleConfig;
    }
    async handle(messageContext) {
        const connection = messageContext.assertReadyConnection();
        const mediationRecord = await this.mediatorService.processMediationRequest(messageContext);
        if (this.mediatorModuleConfig.autoAcceptMediationRequests) {
            const { message } = await this.mediatorService.createGrantMediationMessage(messageContext.agentContext, mediationRecord);
            return new models_1.OutboundMessageContext(message, {
                agentContext: messageContext.agentContext,
                connection,
                associatedRecord: mediationRecord,
            });
        }
    }
}
exports.MediationRequestHandler = MediationRequestHandler;
//# sourceMappingURL=MediationRequestHandler.js.map