"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CredoError = void 0;
const BaseError_1 = require("./BaseError");
class CredoError extends BaseError_1.BaseError {
    /**
     * Create base CredoError.
     * @param message the error message
     * @param cause the error that caused this error to be created
     */
    constructor(message, { cause } = {}) {
        super(message, cause);
    }
}
exports.CredoError = CredoError;
//# sourceMappingURL=CredoError.js.map