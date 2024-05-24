"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecordDuplicateError = void 0;
const CredoError_1 = require("./CredoError");
class RecordDuplicateError extends CredoError_1.CredoError {
    constructor(message, { recordType, cause }) {
        super(`${recordType}: ${message}`, { cause });
    }
}
exports.RecordDuplicateError = RecordDuplicateError;
//# sourceMappingURL=RecordDuplicateError.js.map