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
exports.HangupMessage = void 0;
const AgentMessage_1 = require("../../../agent/AgentMessage");
const messageType_1 = require("../../../utils/messageType");
/**
 * This message is sent by the rotating_party to inform the observing_party that they are done
 * with the relationship and will no longer be responding.
 *
 * @see https://github.com/hyperledger/aries-rfcs/tree/main/features/0794-did-rotate#hangup
 */
class HangupMessage extends AgentMessage_1.AgentMessage {
    /**
     * Create new HangupMessage instance.
     * @param options
     */
    constructor(options) {
        super();
        this.type = HangupMessage.type.messageTypeUri;
        if (options) {
            this.id = options.id || this.generateId();
        }
    }
}
HangupMessage.type = (0, messageType_1.parseMessageType)('https://didcomm.org/did-rotate/1.0/hangup');
__decorate([
    (0, messageType_1.IsValidMessageType)(HangupMessage.type),
    __metadata("design:type", Object)
], HangupMessage.prototype, "type", void 0);
exports.HangupMessage = HangupMessage;
//# sourceMappingURL=HangupMessage.js.map