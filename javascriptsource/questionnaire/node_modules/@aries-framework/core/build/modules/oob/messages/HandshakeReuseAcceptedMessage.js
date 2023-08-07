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
exports.HandshakeReuseAcceptedMessage = void 0;
const AgentMessage_1 = require("../../../agent/AgentMessage");
const messageType_1 = require("../../../utils/messageType");
class HandshakeReuseAcceptedMessage extends AgentMessage_1.AgentMessage {
    constructor(options) {
        var _a;
        super();
        this.type = HandshakeReuseAcceptedMessage.type.messageTypeUri;
        if (options) {
            this.id = (_a = options.id) !== null && _a !== void 0 ? _a : this.generateId();
            this.setThread({
                threadId: options.threadId,
                parentThreadId: options.parentThreadId,
            });
        }
    }
}
HandshakeReuseAcceptedMessage.type = (0, messageType_1.parseMessageType)('https://didcomm.org/out-of-band/1.1/handshake-reuse-accepted');
__decorate([
    (0, messageType_1.IsValidMessageType)(HandshakeReuseAcceptedMessage.type),
    __metadata("design:type", Object)
], HandshakeReuseAcceptedMessage.prototype, "type", void 0);
exports.HandshakeReuseAcceptedMessage = HandshakeReuseAcceptedMessage;
//# sourceMappingURL=HandshakeReuseAcceptedMessage.js.map