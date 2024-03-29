"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.V2CredentialProblemReportHandler = void 0;
const V2CredentialProblemReportMessage_1 = require("../messages/V2CredentialProblemReportMessage");
class V2CredentialProblemReportHandler {
    constructor(credentialProtocol) {
        this.supportedMessages = [V2CredentialProblemReportMessage_1.V2CredentialProblemReportMessage];
        this.credentialProtocol = credentialProtocol;
    }
    async handle(messageContext) {
        await this.credentialProtocol.processProblemReport(messageContext);
    }
}
exports.V2CredentialProblemReportHandler = V2CredentialProblemReportHandler;
//# sourceMappingURL=V2CredentialProblemReportHandler.js.map