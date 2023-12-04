"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeylistUpdateHandler = void 0;
const models_1 = require("../../../agent/models");
const messages_1 = require("../messages");
class KeylistUpdateHandler {
    constructor(mediatorService) {
        this.supportedMessages = [messages_1.KeylistUpdateMessage];
        this.mediatorService = mediatorService;
    }
    async handle(messageContext) {
        const connection = messageContext.assertReadyConnection();
        const response = await this.mediatorService.processKeylistUpdateRequest(messageContext);
        return new models_1.OutboundMessageContext(response, {
            agentContext: messageContext.agentContext,
            connection,
        });
    }
}
exports.KeylistUpdateHandler = KeylistUpdateHandler;
//# sourceMappingURL=KeylistUpdateHandler.js.map