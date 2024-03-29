"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionMessageHandler = void 0;
const messages_1 = require("../messages");
class QuestionMessageHandler {
    constructor(questionAnswerService) {
        this.supportedMessages = [messages_1.QuestionMessage];
        this.questionAnswerService = questionAnswerService;
    }
    async handle(messageContext) {
        await this.questionAnswerService.processReceiveQuestion(messageContext);
    }
}
exports.QuestionMessageHandler = QuestionMessageHandler;
//# sourceMappingURL=QuestionMessageHandler.js.map