"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionAnswerRecord = void 0;
const core_1 = require("@aries-framework/core");
class QuestionAnswerRecord extends core_1.BaseRecord {
    constructor(props) {
        var _a, _b, _c;
        super();
        this.type = QuestionAnswerRecord.type;
        if (props) {
            this.id = (_a = props.id) !== null && _a !== void 0 ? _a : core_1.utils.uuid();
            this.createdAt = (_b = props.createdAt) !== null && _b !== void 0 ? _b : new Date();
            this.questionText = props.questionText;
            this.questionDetail = props.questionDetail;
            this.validResponses = props.validResponses;
            this.connectionId = props.connectionId;
            this._tags = (_c = props.tags) !== null && _c !== void 0 ? _c : {};
            this.role = props.role;
            this.signatureRequired = props.signatureRequired;
            this.state = props.state;
            this.threadId = props.threadId;
            this.response = props.response;
        }
    }
    getTags() {
        return Object.assign(Object.assign({}, this._tags), { connectionId: this.connectionId, role: this.role, state: this.state, threadId: this.threadId });
    }
    assertRole(expectedRole) {
        if (this.role !== expectedRole) {
            throw new core_1.AriesFrameworkError(`Invalid question answer record role ${this.role}, expected is ${expectedRole}.`);
        }
    }
    assertState(expectedStates) {
        if (!Array.isArray(expectedStates)) {
            expectedStates = [expectedStates];
        }
        if (!expectedStates.includes(this.state)) {
            throw new core_1.AriesFrameworkError(`Question answer record is in invalid state ${this.state}. Valid states are: ${expectedStates.join(', ')}.`);
        }
    }
}
exports.QuestionAnswerRecord = QuestionAnswerRecord;
QuestionAnswerRecord.type = 'QuestionAnswerRecord';
//# sourceMappingURL=QuestionAnswerRecord.js.map