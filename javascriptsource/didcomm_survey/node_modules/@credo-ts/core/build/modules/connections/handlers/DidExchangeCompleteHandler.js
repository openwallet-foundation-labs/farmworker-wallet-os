"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DidExchangeCompleteHandler = void 0;
const error_1 = require("../../../error");
const parse_1 = require("../../dids/domain/parse");
const OutOfBandState_1 = require("../../oob/domain/OutOfBandState");
const messages_1 = require("../messages");
const models_1 = require("../models");
class DidExchangeCompleteHandler {
    constructor(didExchangeProtocol, outOfBandService) {
        this.supportedMessages = [messages_1.DidExchangeCompleteMessage];
        this.didExchangeProtocol = didExchangeProtocol;
        this.outOfBandService = outOfBandService;
    }
    async handle(messageContext) {
        var _a, _b;
        const { connection: connectionRecord } = messageContext;
        if (!connectionRecord) {
            throw new error_1.CredoError(`Connection is missing in message context`);
        }
        const { protocol } = connectionRecord;
        if (protocol !== models_1.HandshakeProtocol.DidExchange) {
            throw new error_1.CredoError(`Connection record protocol is ${protocol} but handler supports only ${models_1.HandshakeProtocol.DidExchange}.`);
        }
        const { message } = messageContext;
        const parentThreadId = (_a = message.thread) === null || _a === void 0 ? void 0 : _a.parentThreadId;
        if (!parentThreadId) {
            throw new error_1.CredoError(`Message does not contain pthid attribute`);
        }
        const outOfBandRecord = await this.outOfBandService.findByCreatedInvitationId(messageContext.agentContext, parentThreadId, (0, parse_1.tryParseDid)(parentThreadId) ? message.threadId : undefined);
        if (!outOfBandRecord) {
            throw new error_1.CredoError(`OutOfBand record for message ID ${(_b = message.thread) === null || _b === void 0 ? void 0 : _b.parentThreadId} not found!`);
        }
        if (!outOfBandRecord.reusable) {
            await this.outOfBandService.updateState(messageContext.agentContext, outOfBandRecord, OutOfBandState_1.OutOfBandState.Done);
        }
        await this.didExchangeProtocol.processComplete(messageContext, outOfBandRecord);
    }
}
exports.DidExchangeCompleteHandler = DidExchangeCompleteHandler;
//# sourceMappingURL=DidExchangeCompleteHandler.js.map