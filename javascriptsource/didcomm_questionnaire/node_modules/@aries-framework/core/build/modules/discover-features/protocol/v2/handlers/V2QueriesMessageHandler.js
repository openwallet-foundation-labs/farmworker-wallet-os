"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.V2QueriesMessageHandler = void 0;
const models_1 = require("../../../../../agent/models");
const messages_1 = require("../messages");
class V2QueriesMessageHandler {
    constructor(discoverFeaturesService) {
        this.supportedMessages = [messages_1.V2QueriesMessage];
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
exports.V2QueriesMessageHandler = V2QueriesMessageHandler;
//# sourceMappingURL=V2QueriesMessageHandler.js.map