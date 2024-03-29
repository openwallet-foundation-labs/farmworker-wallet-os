"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletInvalidKeyError = void 0;
const WalletError_1 = require("./WalletError");
class WalletInvalidKeyError extends WalletError_1.WalletError {
    constructor(message, { walletType, cause }) {
        super(`${walletType}: ${message}`, { cause });
    }
}
exports.WalletInvalidKeyError = WalletInvalidKeyError;
//# sourceMappingURL=WalletInvalidKeyError.js.map