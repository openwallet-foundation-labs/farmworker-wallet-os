"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DidRotateProblemReportHandler = void 0;
const messages_1 = require("../messages");
class DidRotateProblemReportHandler {
    constructor(didRotateService) {
        this.supportedMessages = [messages_1.DidRotateProblemReportMessage];
        this.didRotateService = didRotateService;
    }
    async handle(messageContext) {
        await this.didRotateService.processProblemReport(messageContext);
    }
}
exports.DidRotateProblemReportHandler = DidRotateProblemReportHandler;
//# sourceMappingURL=DidRotateProblemReportHandler.js.map