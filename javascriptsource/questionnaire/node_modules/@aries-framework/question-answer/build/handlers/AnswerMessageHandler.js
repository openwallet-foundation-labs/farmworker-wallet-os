"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnswerMessageHandler = void 0;
const messages_1 = require("../messages");
class AnswerMessageHandler {
    constructor(questionAnswerService) {
        this.supportedMessages = [messages_1.AnswerMessage];
        this.questionAnswerService = questionAnswerService;
    }
    async handle(messageContext) {
        await this.questionAnswerService.receiveAnswer(messageContext);
    }
}
exports.AnswerMessageHandler = AnswerMessageHandler;
//# sourceMappingURL=AnswerMessageHandler.js.map