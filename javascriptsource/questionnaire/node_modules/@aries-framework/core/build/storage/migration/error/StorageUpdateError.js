"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageUpdateError = void 0;
const AriesFrameworkError_1 = require("../../../error/AriesFrameworkError");
class StorageUpdateError extends AriesFrameworkError_1.AriesFrameworkError {
    constructor(message, { cause } = {}) {
        super(message, { cause });
    }
}
exports.StorageUpdateError = StorageUpdateError;
//# sourceMappingURL=StorageUpdateError.js.map