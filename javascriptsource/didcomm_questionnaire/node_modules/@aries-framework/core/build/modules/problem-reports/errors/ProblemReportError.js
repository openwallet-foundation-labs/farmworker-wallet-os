"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProblemReportError = void 0;
const AriesFrameworkError_1 = require("../../../error/AriesFrameworkError");
const ProblemReportMessage_1 = require("../messages/ProblemReportMessage");
class ProblemReportError extends AriesFrameworkError_1.AriesFrameworkError {
    constructor(message, { problemCode }) {
        super(message);
        this.problemReport = new ProblemReportMessage_1.ProblemReportMessage({
            description: {
                en: message,
                code: problemCode,
            },
        });
    }
}
exports.ProblemReportError = ProblemReportError;
//# sourceMappingURL=ProblemReportError.js.map