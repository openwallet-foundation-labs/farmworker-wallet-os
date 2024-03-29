"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletDuplicateError = void 0;
const WalletError_1 = require("./WalletError");
class WalletDuplicateError extends WalletError_1.WalletError {
    constructor(message, { walletType, cause }) {
        super(`${walletType}: ${message}`, { cause });
    }
}
exports.WalletDuplicateError = WalletDuplicateError;
//# sourceMappingURL=WalletDuplicateError.js.map