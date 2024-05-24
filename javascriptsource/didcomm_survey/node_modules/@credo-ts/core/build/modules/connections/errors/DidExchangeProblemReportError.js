"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DidExchangeProblemReportError = void 0;
const problem_reports_1 = require("../../problem-reports");
const messages_1 = require("../messages");
class DidExchangeProblemReportError extends problem_reports_1.ProblemReportError {
    constructor(message, { problemCode }) {
        super(message, { problemCode });
        this.message = message;
        this.problemReport = new messages_1.DidExchangeProblemReportMessage({
            description: {
                en: message,
                code: problemCode,
            },
        });
    }
}
exports.DidExchangeProblemReportError = DidExchangeProblemReportError;
//# sourceMappingURL=DidExchangeProblemReportError.js.map