"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AriesFrameworkError = void 0;
const BaseError_1 = require("./BaseError");
class AriesFrameworkError extends BaseError_1.BaseError {
    /**
     * Create base AriesFrameworkError.
     * @param message the error message
     * @param cause the error that caused this error to be created
     */
    constructor(message, { cause } = {}) {
        super(message, cause);
    }
}
exports.AriesFrameworkError = AriesFrameworkError;
//# sourceMappingURL=AriesFrameworkError.js.map