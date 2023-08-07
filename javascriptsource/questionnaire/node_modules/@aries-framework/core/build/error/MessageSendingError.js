"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageSendingError = void 0;
const AriesFrameworkError_1 = require("./AriesFrameworkError");
class MessageSendingError extends AriesFrameworkError_1.AriesFrameworkError {
    constructor(message, { outboundMessageContext, cause }) {
        super(message, { cause });
        this.outboundMessageContext = outboundMessageContext;
    }
}
exports.MessageSendingError = MessageSendingError;
//# sourceMappingURL=MessageSendingError.js.map