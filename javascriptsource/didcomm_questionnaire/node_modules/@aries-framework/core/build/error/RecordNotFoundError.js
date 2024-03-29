"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecordNotFoundError = void 0;
const AriesFrameworkError_1 = require("./AriesFrameworkError");
class RecordNotFoundError extends AriesFrameworkError_1.AriesFrameworkError {
    constructor(message, { recordType, cause }) {
        super(`${recordType}: ${message}`, { cause });
    }
}
exports.RecordNotFoundError = RecordNotFoundError;
//# sourceMappingURL=RecordNotFoundError.js.map