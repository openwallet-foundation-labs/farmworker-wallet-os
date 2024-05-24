"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DifPresentationExchangeError = void 0;
const error_1 = require("../../error");
class DifPresentationExchangeError extends error_1.CredoError {
    constructor(message, { cause, additionalMessages } = {}) {
        super(message, { cause });
        this.additionalMessages = additionalMessages;
    }
}
exports.DifPresentationExchangeError = DifPresentationExchangeError;
//# sourceMappingURL=DifPresentationExchangeError.js.map