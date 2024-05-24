"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutboundMessageContext = void 0;
const error_1 = require("../../error");
class OutboundMessageContext {
    constructor(message, context) {
        this.message = message;
        this.connection = context.connection;
        this.sessionId = context.sessionId;
        this.outOfBand = context.outOfBand;
        this.serviceParams = context.serviceParams;
        this.associatedRecord = context.associatedRecord;
        this.inboundMessageContext = context.inboundMessageContext;
        this.agentContext = context.agentContext;
    }
    /**
     * Assert the outbound message has a ready connection associated with it.
     *
     * @throws {CredoError} if there is no connection or the connection is not ready
     */
    assertReadyConnection() {
        if (!this.connection) {
            throw new error_1.CredoError(`No connection associated with outgoing message ${this.message.type}`);
        }
        // Make sure connection is ready
        this.connection.assertReady();
        return this.connection;
    }
    isOutboundServiceMessage() {
        var _a;
        return ((_a = this.serviceParams) === null || _a === void 0 ? void 0 : _a.service) !== undefined;
    }
    toJSON() {
        return {
            message: this.message,
            outOfBand: this.outOfBand,
            associatedRecord: this.associatedRecord,
            sessionId: this.sessionId,
            serviceParams: this.serviceParams,
            agentContext: this.agentContext.toJSON(),
            connection: this.connection,
        };
    }
}
exports.OutboundMessageContext = OutboundMessageContext;
//# sourceMappingURL=OutboundMessageContext.js.map