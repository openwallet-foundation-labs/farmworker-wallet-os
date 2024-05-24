"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageSendingError = void 0;
const CredoError_1 = require("./CredoError");
class MessageSendingError extends CredoError_1.CredoError {
    constructor(message, { outboundMessageContext, cause }) {
        super(message, { cause });
        this.outboundMessageContext = outboundMessageContext;
    }
}
exports.MessageSendingError = MessageSendingError;
//# sourceMappingURL=MessageSendingError.js.map