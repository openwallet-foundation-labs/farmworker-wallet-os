"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrustPingMessageHandler = void 0;
const error_1 = require("../../../error");
const messages_1 = require("../messages");
const models_1 = require("../models");
class TrustPingMessageHandler {
    constructor(trustPingService, connectionService) {
        this.supportedMessages = [messages_1.TrustPingMessage];
        this.trustPingService = trustPingService;
        this.connectionService = connectionService;
    }
    async handle(messageContext) {
        const { connection, recipientKey } = messageContext;
        if (!connection) {
            throw new error_1.AriesFrameworkError(`Connection for verkey ${recipientKey === null || recipientKey === void 0 ? void 0 : recipientKey.fingerprint} not found!`);
        }
        // TODO: This is better addressed in a middleware of some kind because
        // any message can transition the state to complete, not just an ack or trust ping
        if (connection.state === models_1.DidExchangeState.ResponseSent) {
            await this.connectionService.updateState(messageContext.agentContext, connection, models_1.DidExchangeState.Completed);
        }
        return this.trustPingService.processPing(messageContext, connection);
    }
}
exports.TrustPingMessageHandler = TrustPingMessageHandler;
//# sourceMappingURL=TrustPingMessageHandler.js.map