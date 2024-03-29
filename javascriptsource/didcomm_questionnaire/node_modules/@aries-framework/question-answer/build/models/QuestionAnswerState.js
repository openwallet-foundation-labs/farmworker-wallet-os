"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionAnswerState = void 0;
/**
 * QuestionAnswer states inferred from RFC 0113.
 *
 * @see https://github.com/hyperledger/aries-rfcs/blob/main/features/0113-question-answer/README.md
 */
var QuestionAnswerState;
(function (QuestionAnswerState) {
    QuestionAnswerState["QuestionSent"] = "question-sent";
    QuestionAnswerState["QuestionReceived"] = "question-received";
    QuestionAnswerState["AnswerReceived"] = "answer-received";
    QuestionAnswerState["AnswerSent"] = "answer-sent";
})(QuestionAnswerState = exports.QuestionAnswerState || (exports.QuestionAnswerState = {}));
//# sourceMappingURL=QuestionAnswerState.js.map