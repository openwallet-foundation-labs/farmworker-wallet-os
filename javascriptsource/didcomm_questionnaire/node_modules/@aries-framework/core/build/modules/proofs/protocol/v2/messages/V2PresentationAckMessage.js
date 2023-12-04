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
exports.V2PresentationAckMessage = void 0;
const messageType_1 = require("../../../../../utils/messageType");
const AckMessage_1 = require("../../../../common/messages/AckMessage");
class V2PresentationAckMessage extends AckMessage_1.AckMessage {
    constructor() {
        super(...arguments);
        this.type = V2PresentationAckMessage.type.messageTypeUri;
    }
}
V2PresentationAckMessage.type = (0, messageType_1.parseMessageType)('https://didcomm.org/present-proof/2.0/ack');
__decorate([
    (0, messageType_1.IsValidMessageType)(V2PresentationAckMessage.type),
    __metadata("design:type", Object)
], V2PresentationAckMessage.prototype, "type", void 0);
exports.V2PresentationAckMessage = V2PresentationAckMessage;
//# sourceMappingURL=V2PresentationAckMessage.js.map