"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DidExchangeRequestHandler = void 0;
const TransportService_1 = require("../../../agent/TransportService");
const models_1 = require("../../../agent/models");
const AriesFrameworkError_1 = require("../../../error/AriesFrameworkError");
const parse_1 = require("../../dids/domain/parse");
const OutOfBandState_1 = require("../../oob/domain/OutOfBandState");
const messages_1 = require("../messages");
const models_2 = require("../models");
class DidExchangeRequestHandler {
    constructor(didExchangeProtocol, outOfBandService, routingService, didRepository, connectionsModuleConfig) {
        this.supportedMessages = [messages_1.DidExchangeRequestMessage];
        this.didExchangeProtocol = didExchangeProtocol;
        this.outOfBandService = outOfBandService;
        this.routingService = routingService;
        this.didRepository = didRepository;
        this.connectionsModuleConfig = connectionsModuleConfig;
    }
    async handle(messageContext) {
        var _a, _b;
        const { agentContext, recipientKey, senderKey, message, connection, sessionId } = messageContext;
        if (!recipientKey || !senderKey) {
            throw new AriesFrameworkError_1.AriesFrameworkError('Unable to process connection request without senderKey or recipientKey');
        }
        const parentThreadId = (_a = message.thread) === null || _a === void 0 ? void 0 : _a.parentThreadId;
        if (!parentThreadId) {
            throw new AriesFrameworkError_1.AriesFrameworkError(`Message does not contain 'pthid' attribute`);
        }
        const outOfBandRecord = (0, parse_1.tryParseDid)(parentThreadId)
            ? await this.outOfBandService.createFromImplicitInvitation(agentContext, {
                did: parentThreadId,
                threadId: message.threadId,
                recipientKey,
                handshakeProtocols: [models_2.HandshakeProtocol.DidExchange],
            })
            : await this.outOfBandService.findByCreatedInvitationId(agentContext, parentThreadId);
        if (!outOfBandRecord) {
            throw new AriesFrameworkError_1.AriesFrameworkError(`OutOfBand record for message ID ${parentThreadId} not found!`);
        }
        if (connection && !outOfBandRecord.reusable) {
            throw new AriesFrameworkError_1.AriesFrameworkError(`Connection record for non-reusable out-of-band ${outOfBandRecord.id} already exists.`);
        }
        const receivedDidRecord = await this.didRepository.findReceivedDidByRecipientKey(agentContext, senderKey);
        if (receivedDidRecord) {
            throw new AriesFrameworkError_1.AriesFrameworkError(`A received did record for sender key ${senderKey.fingerprint} already exists.`);
        }
        // TODO Shouldn't we check also if the keys match the keys from oob invitation services?
        if (outOfBandRecord.state === OutOfBandState_1.OutOfBandState.Done) {
            throw new AriesFrameworkError_1.AriesFrameworkError('Out-of-band record has been already processed and it does not accept any new requests');
        }
        const connectionRecord = await this.didExchangeProtocol.processRequest(messageContext, outOfBandRecord);
        // Associate the new connection with the session created for the inbound message
        if (sessionId) {
            const transportService = agentContext.dependencyManager.resolve(TransportService_1.TransportService);
            transportService.setConnectionIdForSession(sessionId, connectionRecord.id);
        }
        if ((_b = connectionRecord.autoAcceptConnection) !== null && _b !== void 0 ? _b : this.connectionsModuleConfig.autoAcceptConnections) {
            // TODO We should add an option to not pass routing and therefore do not rotate keys and use the keys from the invitation
            // TODO: Allow rotation of keys used in the invitation for new ones not only when out-of-band is reusable
            const routing = outOfBandRecord.reusable ? await this.routingService.getRouting(agentContext) : undefined;
            const message = await this.didExchangeProtocol.createResponse(agentContext, connectionRecord, outOfBandRecord, routing);
            return new models_1.OutboundMessageContext(message, {
                agentContext,
                connection: connectionRecord,
                outOfBand: outOfBandRecord,
            });
        }
    }
}
exports.DidExchangeRequestHandler = DidExchangeRequestHandler;
//# sourceMappingURL=DidExchangeRequestHandler.js.map