"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseMessageHandler = void 0;
const messages_1 = require("../messages");
class ResponseMessageHandler {
    constructor(surveyService) {
        this.supportedMessages = [messages_1.ResponseMessage];
        this.surveyService = surveyService;
    }
    async handle(messageContext) {
        await this.surveyService.receiveResponse(messageContext);
    }
}
exports.ResponseMessageHandler = ResponseMessageHandler;
//# sourceMappingURL=ResponseMessageHandler.js.map