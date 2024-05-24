"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecordNotFoundError = void 0;
const CredoError_1 = require("./CredoError");
class RecordNotFoundError extends CredoError_1.CredoError {
    constructor(message, { recordType, cause }) {
        super(`${recordType}: ${message}`, { cause });
    }
}
exports.RecordNotFoundError = RecordNotFoundError;
//# sourceMappingURL=RecordNotFoundError.js.map