"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.V2CredentialProblemReportError = void 0;
const ProblemReportError_1 = require("../../../../problem-reports/errors/ProblemReportError");
const V2CredentialProblemReportMessage_1 = require("../messages/V2CredentialProblemReportMessage");
class V2CredentialProblemReportError extends ProblemReportError_1.ProblemReportError {
    constructor(message, { problemCode }) {
        super(message, { problemCode });
        this.problemReport = new V2CredentialProblemReportMessage_1.V2CredentialProblemReportMessage({
            description: {
                en: message,
                code: problemCode,
            },
        });
    }
}
exports.V2CredentialProblemReportError = V2CredentialProblemReportError;
//# sourceMappingURL=V2CredentialProblemReportError.js.map