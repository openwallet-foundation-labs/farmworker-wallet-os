"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnswerMessage = void 0;
const core_1 = require("@aries-framework/core");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class AnswerMessage extends core_1.AgentMessage {
    /**
     * Create new AnswerMessage instance.
     * @param options
     */
    constructor(options) {
        super();
        this.type = AnswerMessage.type.messageTypeUri;
        if (options) {
            this.id = options.id || this.generateId();
            this.setThread({ threadId: options.threadId });
            this.response = options.response;
        }
    }
}
AnswerMessage.type = (0, core_1.parseMessageType)('https://didcomm.org/questionanswer/1.0/answer');
__decorate([
    (0, core_1.IsValidMessageType)(AnswerMessage.type),
    __metadata("design:type", Object)
], AnswerMessage.prototype, "type", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'response' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AnswerMessage.prototype, "response", void 0);
exports.AnswerMessage = AnswerMessage;
//# sourceMappingURL=AnswerMessage.js.map