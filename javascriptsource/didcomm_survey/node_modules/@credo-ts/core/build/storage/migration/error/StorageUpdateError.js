"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageUpdateError = void 0;
const CredoError_1 = require("../../../error/CredoError");
class StorageUpdateError extends CredoError_1.CredoError {
    constructor(message, { cause } = {}) {
        super(message, { cause });
    }
}
exports.StorageUpdateError = StorageUpdateError;
//# sourceMappingURL=StorageUpdateError.js.map