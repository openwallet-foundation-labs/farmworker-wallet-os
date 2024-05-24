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
exports.V1DiscloseMessage = exports.DiscloseProtocol = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const AgentMessage_1 = require("../../../../../agent/AgentMessage");
const messageType_1 = require("../../../../../utils/messageType");
class DiscloseProtocol {
    constructor(options) {
        if (options) {
            this.protocolId = options.protocolId;
            this.roles = options.roles;
        }
    }
}
__decorate([
    (0, class_transformer_1.Expose)({ name: 'pid' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DiscloseProtocol.prototype, "protocolId", void 0);
__decorate([
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], DiscloseProtocol.prototype, "roles", void 0);
exports.DiscloseProtocol = DiscloseProtocol;
class V1DiscloseMessage extends AgentMessage_1.AgentMessage {
    constructor(options) {
        var _a;
        super();
        this.type = V1DiscloseMessage.type.messageTypeUri;
        if (options) {
            this.id = (_a = options.id) !== null && _a !== void 0 ? _a : this.generateId();
            this.protocols = options.protocols.map((p) => new DiscloseProtocol(p));
            this.setThread({
                threadId: options.threadId,
            });
        }
    }
}
V1DiscloseMessage.type = (0, messageType_1.parseMessageType)('https://didcomm.org/discover-features/1.0/disclose');
__decorate([
    (0, messageType_1.IsValidMessageType)(V1DiscloseMessage.type),
    __metadata("design:type", Object)
], V1DiscloseMessage.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsInstance)(DiscloseProtocol, { each: true }),
    (0, class_transformer_1.Type)(() => DiscloseProtocol),
    __metadata("design:type", Array)
], V1DiscloseMessage.prototype, "protocols", void 0);
exports.V1DiscloseMessage = V1DiscloseMessage;
//# sourceMappingURL=DiscloseMessage.js.map