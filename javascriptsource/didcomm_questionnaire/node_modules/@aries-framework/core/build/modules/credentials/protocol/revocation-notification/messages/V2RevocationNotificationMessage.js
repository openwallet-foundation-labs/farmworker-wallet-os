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
exports.V2RevocationNotificationMessage = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const AgentMessage_1 = require("../../../../../agent/AgentMessage");
const messageType_1 = require("../../../../../utils/messageType");
class V2RevocationNotificationMessage extends AgentMessage_1.AgentMessage {
    constructor(options) {
        var _a;
        super();
        this.type = V2RevocationNotificationMessage.type.messageTypeUri;
        if (options) {
            this.revocationFormat = options.revocationFormat;
            this.credentialId = options.credentialId;
            this.id = (_a = options.id) !== null && _a !== void 0 ? _a : this.generateId();
            this.comment = options.comment;
            this.pleaseAck = options.pleaseAck;
        }
    }
}
V2RevocationNotificationMessage.type = (0, messageType_1.parseMessageType)('https://didcomm.org/revocation_notification/2.0/revoke');
__decorate([
    (0, messageType_1.IsValidMessageType)(V2RevocationNotificationMessage.type),
    __metadata("design:type", Object)
], V2RevocationNotificationMessage.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], V2RevocationNotificationMessage.prototype, "comment", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'revocation_format' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], V2RevocationNotificationMessage.prototype, "revocationFormat", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'credential_id' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], V2RevocationNotificationMessage.prototype, "credentialId", void 0);
exports.V2RevocationNotificationMessage = V2RevocationNotificationMessage;
//# sourceMappingURL=V2RevocationNotificationMessage.js.map