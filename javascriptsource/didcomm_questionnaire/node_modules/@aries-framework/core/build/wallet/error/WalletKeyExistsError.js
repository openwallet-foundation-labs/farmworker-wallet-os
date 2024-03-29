"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletKeyExistsError = void 0;
const WalletError_1 = require("./WalletError");
class WalletKeyExistsError extends WalletError_1.WalletError {
    constructor(message, { cause } = {}) {
        super(message, { cause });
    }
}
exports.WalletKeyExistsError = WalletKeyExistsError;
//# sourceMappingURL=WalletKeyExistsError.js.map