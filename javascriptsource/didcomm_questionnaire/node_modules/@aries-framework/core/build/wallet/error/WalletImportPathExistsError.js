"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletImportPathExistsError = void 0;
const WalletError_1 = require("./WalletError");
class WalletImportPathExistsError extends WalletError_1.WalletError {
    constructor(message, { cause } = {}) {
        super(message, { cause });
    }
}
exports.WalletImportPathExistsError = WalletImportPathExistsError;
//# sourceMappingURL=WalletImportPathExistsError.js.map