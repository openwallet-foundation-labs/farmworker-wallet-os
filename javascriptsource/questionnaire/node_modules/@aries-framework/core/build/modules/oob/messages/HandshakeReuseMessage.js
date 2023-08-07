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
exports.HandshakeReuseMessage = void 0;
const AgentMessage_1 = require("../../../agent/AgentMessage");
const messageType_1 = require("../../../utils/messageType");
class HandshakeReuseMessage extends AgentMessage_1.AgentMessage {
    constructor(options) {
        var _a;
        super();
        this.type = HandshakeReuseMessage.type.messageTypeUri;
        if (options) {
            this.id = (_a = options.id) !== null && _a !== void 0 ? _a : this.generateId();
            this.setThread({
                parentThreadId: options.parentThreadId,
            });
        }
    }
}
HandshakeReuseMessage.type = (0, messageType_1.parseMessageType)('https://didcomm.org/out-of-band/1.1/handshake-reuse');
__decorate([
    (0, messageType_1.IsValidMessageType)(HandshakeReuseMessage.type),
    __metadata("design:type", Object)
], HandshakeReuseMessage.prototype, "type", void 0);
exports.HandshakeReuseMessage = HandshakeReuseMessage;
//# sourceMappingURL=HandshakeReuseMessage.js.map