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
exports.ForwardMessage = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const AgentMessage_1 = require("../../../agent/AgentMessage");
const messageType_1 = require("../../../utils/messageType");
/**
 * @see https://github.com/hyperledger/aries-rfcs/blob/master/concepts/0094-cross-domain-messaging/README.md#corerouting10forward
 */
class ForwardMessage extends AgentMessage_1.AgentMessage {
    /**
     * Create new ForwardMessage instance.
     *
     * @param options
     */
    constructor(options) {
        super();
        this.allowDidSovPrefix = true;
        this.type = ForwardMessage.type.messageTypeUri;
        if (options) {
            this.id = options.id || this.generateId();
            this.to = options.to;
            this.message = options.message;
        }
    }
}
ForwardMessage.type = (0, messageType_1.parseMessageType)('https://didcomm.org/routing/1.0/forward');
__decorate([
    (0, messageType_1.IsValidMessageType)(ForwardMessage.type),
    __metadata("design:type", Object)
], ForwardMessage.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ForwardMessage.prototype, "to", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'msg' }),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], ForwardMessage.prototype, "message", void 0);
exports.ForwardMessage = ForwardMessage;
//# sourceMappingURL=ForwardMessage.js.map