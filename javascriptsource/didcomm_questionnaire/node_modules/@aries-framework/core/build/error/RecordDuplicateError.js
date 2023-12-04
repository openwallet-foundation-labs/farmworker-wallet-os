"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecordDuplicateError = void 0;
const AriesFrameworkError_1 = require("./AriesFrameworkError");
class RecordDuplicateError extends AriesFrameworkError_1.AriesFrameworkError {
    constructor(message, { recordType, cause }) {
        super(`${recordType}: ${message}`, { cause });
    }
}
exports.RecordDuplicateError = RecordDuplicateError;
//# sourceMappingURL=RecordDuplicateError.js.map