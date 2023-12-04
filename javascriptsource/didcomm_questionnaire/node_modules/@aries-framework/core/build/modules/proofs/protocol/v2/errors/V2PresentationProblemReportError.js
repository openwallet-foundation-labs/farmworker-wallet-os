"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.V2PresentationProblemReportError = void 0;
const ProblemReportError_1 = require("../../../../problem-reports/errors/ProblemReportError");
const messages_1 = require("../messages");
class V2PresentationProblemReportError extends ProblemReportError_1.ProblemReportError {
    constructor(message, { problemCode }) {
        super(message, { problemCode });
        this.message = message;
        this.problemReport = new messages_1.V2PresentationProblemReportMessage({
            description: {
                en: message,
                code: problemCode,
            },
        });
    }
}
exports.V2PresentationProblemReportError = V2PresentationProblemReportError;
//# sourceMappingURL=V2PresentationProblemReportError.js.map