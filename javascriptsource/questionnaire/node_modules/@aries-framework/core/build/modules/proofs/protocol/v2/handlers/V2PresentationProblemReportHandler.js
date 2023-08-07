"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.V2PresentationProblemReportHandler = void 0;
const messages_1 = require("../messages");
class V2PresentationProblemReportHandler {
    constructor(proofService) {
        this.supportedMessages = [messages_1.V2PresentationProblemReportMessage];
        this.proofService = proofService;
    }
    async handle(messageContext) {
        await this.proofService.processProblemReport(messageContext);
    }
}
exports.V2PresentationProblemReportHandler = V2PresentationProblemReportHandler;
//# sourceMappingURL=V2PresentationProblemReportHandler.js.map