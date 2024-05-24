"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletExportUnsupportedError = void 0;
const WalletError_1 = require("./WalletError");
class WalletExportUnsupportedError extends WalletError_1.WalletError {
    constructor(message, { cause } = {}) {
        super(message, { cause });
    }
}
exports.WalletExportUnsupportedError = WalletExportUnsupportedError;
//# sourceMappingURL=WalletExportUnsupportedError.js.map