"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DidExchangeResponseHandler = void 0;
const models_1 = require("../../../agent/models");
const TransportDecorator_1 = require("../../../decorators/transport/TransportDecorator");
const error_1 = require("../../../error");
const OutOfBandState_1 = require("../../oob/domain/OutOfBandState");
const messages_1 = require("../messages");
const models_2 = require("../models");
class DidExchangeResponseHandler {
    constructor(didExchangeProtocol, outOfBandService, connectionService, didResolverService, connectionsModuleConfig) {
        this.supportedMessages = [messages_1.DidExchangeResponseMessage];
        this.didExchangeProtocol = didExchangeProtocol;
        this.outOfBandService = outOfBandService;
        this.connectionService = connectionService;
        this.didResolverService = didResolverService;
        this.connectionsModuleConfig = connectionsModuleConfig;
    }
    async handle(messageContext) {
        var _a;
        const { agentContext, recipientKey, senderKey, message } = messageContext;
        if (!recipientKey || !senderKey) {
            throw new error_1.AriesFrameworkError('Unable to process connection response without sender key or recipient key');
        }
        const connectionRecord = await this.connectionService.getByRoleAndThreadId(agentContext, models_2.DidExchangeRole.Requester, message.threadId);
        if (!connectionRecord) {
            throw new error_1.AriesFrameworkError(`Connection for thread ID ${message.threadId} not found!`);
        }
        if (!connectionRecord.did) {
            throw new error_1.AriesFrameworkError(`Connection record ${connectionRecord.id} has no 'did'`);
        }
        const ourDidDocument = await this.didResolverService.resolveDidDocument(agentContext, connectionRecord.did);
        if (!ourDidDocument) {
            throw new error_1.AriesFrameworkError(`Did document for did ${connectionRecord.did} was not resolved`);
        }
        // Validate if recipient key is included in recipient keys of the did document resolved by
        // connection record did
        if (!ourDidDocument.recipientKeys.find((key) => key.fingerprint === recipientKey.fingerprint)) {
            throw new error_1.AriesFrameworkError(`Recipient key ${recipientKey.fingerprint} not found in did document recipient keys.`);
        }
        const { protocol } = connectionRecord;
        if (protocol !== models_2.HandshakeProtocol.DidExchange) {
            throw new error_1.AriesFrameworkError(`Connection record protocol is ${protocol} but handler supports only ${models_2.HandshakeProtocol.DidExchange}.`);
        }
        if (!connectionRecord.outOfBandId) {
            throw new error_1.AriesFrameworkError(`Connection ${connectionRecord.id} does not have outOfBandId!`);
        }
        const outOfBandRecord = await this.outOfBandService.findById(agentContext, connectionRecord.outOfBandId);
        if (!outOfBandRecord) {
            throw new error_1.AriesFrameworkError(`OutOfBand record for connection ${connectionRecord.id} with outOfBandId ${connectionRecord.outOfBandId} not found!`);
        }
        // TODO
        //
        // A connection request message is the only case when I can use the connection record found
        // only based on recipient key without checking that `theirKey` is equal to sender key.
        //
        // The question is if we should do it here in this way or rather somewhere else to keep
        // responsibility of all handlers aligned.
        //
        messageContext.connection = connectionRecord;
        const connection = await this.didExchangeProtocol.processResponse(messageContext, outOfBandRecord);
        // TODO: should we only send complete message in case of autoAcceptConnection or always?
        // In AATH we have a separate step to send the complete. So for now we'll only do it
        // if auto accept is enabled
        if ((_a = connection.autoAcceptConnection) !== null && _a !== void 0 ? _a : this.connectionsModuleConfig.autoAcceptConnections) {
            const message = await this.didExchangeProtocol.createComplete(agentContext, connection, outOfBandRecord);
            // Disable return routing as we don't want to receive a response for this message over the same channel
            // This has led to long timeouts as not all clients actually close an http socket if there is no response message
            message.setReturnRouting(TransportDecorator_1.ReturnRouteTypes.none);
            if (!outOfBandRecord.reusable) {
                await this.outOfBandService.updateState(agentContext, outOfBandRecord, OutOfBandState_1.OutOfBandState.Done);
            }
            return new models_1.OutboundMessageContext(message, { agentContext, connection });
        }
    }
}
exports.DidExchangeResponseHandler = DidExchangeResponseHandler;
//# sourceMappingURL=DidExchangeResponseHandler.js.map