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
exports.V2CredentialAckMessage = void 0;
const messageType_1 = require("../../../../../utils/messageType");
const common_1 = require("../../../../common");
/**
 * @see https://github.com/hyperledger/aries-rfcs/blob/master/features/0015-acks/README.md#explicit-acks
 */
class V2CredentialAckMessage extends common_1.AckMessage {
    /**
     * Create new CredentialAckMessage instance.
     * @param options
     */
    constructor(options) {
        super(options);
        this.type = V2CredentialAckMessage.type.messageTypeUri;
    }
}
V2CredentialAckMessage.type = (0, messageType_1.parseMessageType)('https://didcomm.org/issue-credential/2.0/ack');
__decorate([
    (0, messageType_1.IsValidMessageType)(V2CredentialAckMessage.type),
    __metadata("design:type", Object)
], V2CredentialAckMessage.prototype, "type", void 0);
exports.V2CredentialAckMessage = V2CredentialAckMessage;
//# sourceMappingURL=V2CredentialAckMessage.js.map