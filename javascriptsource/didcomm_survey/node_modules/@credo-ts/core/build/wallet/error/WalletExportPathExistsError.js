"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletExportPathExistsError = void 0;
const WalletError_1 = require("./WalletError");
class WalletExportPathExistsError extends WalletError_1.WalletError {
    constructor(message, { cause } = {}) {
        super(message, { cause });
    }
}
exports.WalletExportPathExistsError = WalletExportPathExistsError;
//# sourceMappingURL=WalletExportPathExistsError.js.map