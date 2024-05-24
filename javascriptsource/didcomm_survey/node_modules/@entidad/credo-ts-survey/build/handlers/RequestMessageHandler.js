"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestMessageHandler = void 0;
const messages_1 = require("../messages");
class RequestMessageHandler {
    constructor(surveyService) {
        this.supportedMessages = [messages_1.RequestMessage];
        this.surveyService = surveyService;
    }
    async handle(messageContext) {
        await this.surveyService.processReceiveSurvey(messageContext);
    }
}
exports.RequestMessageHandler = RequestMessageHandler;
//# sourceMappingURL=RequestMessageHandler.js.map