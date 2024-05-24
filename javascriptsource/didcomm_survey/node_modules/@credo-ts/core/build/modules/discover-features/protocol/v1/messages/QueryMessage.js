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
exports.V1QueryMessage = void 0;
const class_validator_1 = require("class-validator");
const AgentMessage_1 = require("../../../../../agent/AgentMessage");
const messageType_1 = require("../../../../../utils/messageType");
class V1QueryMessage extends AgentMessage_1.AgentMessage {
    constructor(options) {
        var _a;
        super();
        this.type = V1QueryMessage.type.messageTypeUri;
        if (options) {
            this.id = (_a = options.id) !== null && _a !== void 0 ? _a : this.generateId();
            this.query = options.query;
            this.comment = options.comment;
        }
    }
}
V1QueryMessage.type = (0, messageType_1.parseMessageType)('https://didcomm.org/discover-features/1.0/query');
__decorate([
    (0, messageType_1.IsValidMessageType)(V1QueryMessage.type),
    __metadata("design:type", Object)
], V1QueryMessage.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], V1QueryMessage.prototype, "query", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], V1QueryMessage.prototype, "comment", void 0);
exports.V1QueryMessage = V1QueryMessage;
//# sourceMappingURL=QueryMessage.js.map