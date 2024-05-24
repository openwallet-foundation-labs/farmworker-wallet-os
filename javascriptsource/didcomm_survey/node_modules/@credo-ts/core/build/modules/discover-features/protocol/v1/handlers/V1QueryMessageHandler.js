"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.V1QueryMessageHandler = void 0;
const models_1 = require("../../../../../agent/models");
const messages_1 = require("../messages");
class V1QueryMessageHandler {
    constructor(discoverFeaturesService) {
        this.supportedMessages = [messages_1.V1QueryMessage];
        this.discoverFeaturesService = discoverFeaturesService;
    }
    async handle(inboundMessage) {
        const connection = inboundMessage.assertReadyConnection();
        const discloseMessage = await this.discoverFeaturesService.processQuery(inboundMessage);
        if (discloseMessage) {
            return new models_1.OutboundMessageContext(discloseMessage.message, {
                agentContext: inboundMessage.agentContext,
                connection,
            });
        }
    }
}
exports.V1QueryMessageHandler = V1QueryMessageHandler;
//# sourceMappingURL=V1QueryMessageHandler.js.map