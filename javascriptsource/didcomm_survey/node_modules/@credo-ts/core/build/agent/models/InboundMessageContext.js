"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InboundMessageContext = void 0;
const error_1 = require("../../error");
class InboundMessageContext {
    constructor(message, context) {
        var _a;
        this.message = message;
        this.recipientKey = context.recipientKey;
        this.senderKey = context.senderKey;
        this.connection = context.connection;
        this.sessionId = context.sessionId;
        this.agentContext = context.agentContext;
        this.receivedAt = (_a = context.receivedAt) !== null && _a !== void 0 ? _a : new Date();
    }
    /**
     * Assert the inbound message has a ready connection associated with it.
     *
     * @throws {CredoError} if there is no connection or the connection is not ready
     */
    assertReadyConnection() {
        if (!this.connection) {
            throw new error_1.CredoError(`No connection associated with incoming message ${this.message.type}`);
        }
        // Make sure connection is ready
        this.connection.assertReady();
        return this.connection;
    }
    toJSON() {
        var _a, _b;
        return {
            message: this.message,
            recipientKey: (_a = this.recipientKey) === null || _a === void 0 ? void 0 : _a.fingerprint,
            senderKey: (_b = this.senderKey) === null || _b === void 0 ? void 0 : _b.fingerprint,
            sessionId: this.sessionId,
            agentContext: this.agentContext.toJSON(),
        };
    }
}
exports.InboundMessageContext = InboundMessageContext;
//# sourceMappingURL=InboundMessageContext.js.map