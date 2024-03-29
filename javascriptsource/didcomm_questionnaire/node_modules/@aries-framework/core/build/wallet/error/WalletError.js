"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletError = void 0;
const AriesFrameworkError_1 = require("../../error/AriesFrameworkError");
class WalletError extends AriesFrameworkError_1.AriesFrameworkError {
    constructor(message, { cause } = {}) {
        super(message, { cause });
    }
}
exports.WalletError = WalletError;
//# sourceMappingURL=WalletError.js.map