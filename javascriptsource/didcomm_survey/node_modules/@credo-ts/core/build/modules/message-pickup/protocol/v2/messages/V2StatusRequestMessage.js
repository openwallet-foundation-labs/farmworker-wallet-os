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
exports.V2StatusRequestMessage = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const AgentMessage_1 = require("../../../../../agent/AgentMessage");
const messageType_1 = require("../../../../../utils/messageType");
class V2StatusRequestMessage extends AgentMessage_1.AgentMessage {
    constructor(options) {
        super();
        this.allowQueueTransport = false;
        this.type = V2StatusRequestMessage.type.messageTypeUri;
        if (options) {
            this.id = options.id || this.generateId();
            this.recipientKey = options.recipientKey;
        }
    }
}
V2StatusRequestMessage.type = (0, messageType_1.parseMessageType)('https://didcomm.org/messagepickup/2.0/status-request');
__decorate([
    (0, messageType_1.IsValidMessageType)(V2StatusRequestMessage.type),
    __metadata("design:type", Object)
], V2StatusRequestMessage.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Expose)({ name: 'recipient_key' }),
    __metadata("design:type", String)
], V2StatusRequestMessage.prototype, "recipientKey", void 0);
exports.V2StatusRequestMessage = V2StatusRequestMessage;
//# sourceMappingURL=V2StatusRequestMessage.js.map