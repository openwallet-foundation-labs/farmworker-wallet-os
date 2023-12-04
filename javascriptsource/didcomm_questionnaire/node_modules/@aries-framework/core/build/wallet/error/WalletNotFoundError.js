"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletNotFoundError = void 0;
const WalletError_1 = require("./WalletError");
class WalletNotFoundError extends WalletError_1.WalletError {
    constructor(message, { walletType, cause }) {
        super(`${walletType}: ${message}`, { cause });
    }
}
exports.WalletNotFoundError = WalletNotFoundError;
//# sourceMappingURL=WalletNotFoundError.js.map