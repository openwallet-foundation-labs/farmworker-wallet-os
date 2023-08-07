"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionResponseHandler = void 0;
const models_1 = require("../../../agent/models");
const TransportDecorator_1 = require("../../../decorators/transport/TransportDecorator");
const error_1 = require("../../../error");
const messages_1 = require("../messages");
const models_2 = require("../models");
class ConnectionResponseHandler {
    constructor(connectionService, outOfBandService, didResolverService, connectionsModuleConfig) {
        this.supportedMessages = [messages_1.ConnectionResponseMessage];
        this.connectionService = connectionService;
        this.outOfBandService = outOfBandService;
        this.didResolverService = didResolverService;
        this.connectionsModuleConfig = connectionsModuleConfig;
    }
    async handle(messageContext) {
        var _a;
        const { recipientKey, senderKey, message } = messageContext;
        if (!recipientKey || !senderKey) {
            throw new error_1.AriesFrameworkError('Unable to process connection response without senderKey or recipientKey');
        }
        // Query by both role and thread id to allow connecting to self
        const connectionRecord = await this.connectionService.getByRoleAndThreadId(messageContext.agentContext, models_2.DidExchangeRole.Requester, message.threadId);
        if (!connectionRecord) {
            throw new error_1.AriesFrameworkError(`Connection for thread ID ${message.threadId} not found!`);
        }
        if (!connectionRecord.did) {
            throw new error_1.AriesFrameworkError(`Connection record ${connectionRecord.id} has no 'did'`);
        }
        const ourDidDocument = await this.didResolverService.resolveDidDocument(messageContext.agentContext, connectionRecord.did);
        if (!ourDidDocument) {
            throw new error_1.AriesFrameworkError(`Did document for did ${connectionRecord.did} was not resolved!`);
        }
        // Validate if recipient key is included in recipient keys of the did document resolved by
        // connection record did
        if (!ourDidDocument.recipientKeys.find((key) => key.fingerprint === recipientKey.fingerprint)) {
            throw new error_1.AriesFrameworkError(`Recipient key ${recipientKey.fingerprint} not found in did document recipient keys.`);
        }
        const outOfBandRecord = connectionRecord.outOfBandId &&
            (await this.outOfBandService.findById(messageContext.agentContext, connectionRecord.outOfBandId));
        if (!outOfBandRecord) {
            throw new error_1.AriesFrameworkError(`Out-of-band record ${connectionRecord.outOfBandId} was not found.`);
        }
        messageContext.connection = connectionRecord;
        const connection = await this.connectionService.processResponse(messageContext, outOfBandRecord);
        // TODO: should we only send ping message in case of autoAcceptConnection or always?
        // In AATH we have a separate step to send the ping. So for now we'll only do it
        // if auto accept is enable
        if ((_a = connection.autoAcceptConnection) !== null && _a !== void 0 ? _a : this.connectionsModuleConfig.autoAcceptConnections) {
            const { message } = await this.connectionService.createTrustPing(messageContext.agentContext, connection, {
                responseRequested: false,
            });
            // Disable return routing as we don't want to receive a response for this message over the same channel
            // This has led to long timeouts as not all clients actually close an http socket if there is no response message
            message.setReturnRouting(TransportDecorator_1.ReturnRouteTypes.none);
            return new models_1.OutboundMessageContext(message, { agentContext: messageContext.agentContext, connection });
        }
    }
}
exports.ConnectionResponseHandler = ConnectionResponseHandler;
//# sourceMappingURL=ConnectionResponseHandler.js.map