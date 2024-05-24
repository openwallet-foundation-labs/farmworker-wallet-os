"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletError = void 0;
const CredoError_1 = require("../../error/CredoError");
class WalletError extends CredoError_1.CredoError {
    constructor(message, { cause } = {}) {
        super(message, { cause });
    }
}
exports.WalletError = WalletError;
//# sourceMappingURL=WalletError.js.map