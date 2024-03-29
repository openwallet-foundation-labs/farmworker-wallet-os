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
exports.DidExchangeResponseMessage = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const AgentMessage_1 = require("../../../agent/AgentMessage");
const Attachment_1 = require("../../../decorators/attachment/Attachment");
const messageType_1 = require("../../../utils/messageType");
/**
 * Message part of connection protocol used to complete the connection
 *
 * @see https://github.com/hyperledger/aries-rfcs/blob/main/features/0023-did-exchange/README.md#2-exchange-response
 */
class DidExchangeResponseMessage extends AgentMessage_1.AgentMessage {
    /**
     * Create new DidExchangeResponseMessage instance.
     * @param options
     */
    constructor(options) {
        super();
        this.type = DidExchangeResponseMessage.type.messageTypeUri;
        if (options) {
            this.id = options.id || this.generateId();
            this.did = options.did;
            this.setThread({
                threadId: options.threadId,
            });
        }
    }
}
DidExchangeResponseMessage.type = (0, messageType_1.parseMessageType)('https://didcomm.org/didexchange/1.0/response');
__decorate([
    (0, messageType_1.IsValidMessageType)(DidExchangeResponseMessage.type),
    __metadata("design:type", Object)
], DidExchangeResponseMessage.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DidExchangeResponseMessage.prototype, "did", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'did_doc~attach' }),
    (0, class_transformer_1.Type)(() => Attachment_1.Attachment),
    (0, class_validator_1.ValidateNested)(),
    __metadata("design:type", Attachment_1.Attachment)
], DidExchangeResponseMessage.prototype, "didDoc", void 0);
exports.DidExchangeResponseMessage = DidExchangeResponseMessage;
//# sourceMappingURL=DidExchangeResponseMessage.js.map