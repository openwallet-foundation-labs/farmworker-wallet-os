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
exports.TrustPingResponseMessage = void 0;
const class_validator_1 = require("class-validator");
const AgentMessage_1 = require("../../../agent/AgentMessage");
const messageType_1 = require("../../../utils/messageType");
/**
 * Message to respond to a trust ping message
 *
 * @see https://github.com/hyperledger/aries-rfcs/blob/master/features/0048-trust-ping/README.md#messages
 */
class TrustPingResponseMessage extends AgentMessage_1.AgentMessage {
    /**
     * Create new TrustPingResponseMessage instance.
     * responseRequested will be true if not passed
     * @param options
     */
    constructor(options) {
        super();
        this.allowDidSovPrefix = true;
        this.type = TrustPingResponseMessage.type.messageTypeUri;
        if (options) {
            this.id = options.id || this.generateId();
            this.comment = options.comment;
            this.setThread({
                threadId: options.threadId,
            });
            if (options.timing) {
                this.setTiming({
                    inTime: options.timing.inTime,
                    outTime: options.timing.outTime,
                });
            }
        }
    }
}
TrustPingResponseMessage.type = (0, messageType_1.parseMessageType)('https://didcomm.org/trust_ping/1.0/ping_response');
__decorate([
    (0, messageType_1.IsValidMessageType)(TrustPingResponseMessage.type),
    __metadata("design:type", Object)
], TrustPingResponseMessage.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], TrustPingResponseMessage.prototype, "comment", void 0);
exports.TrustPingResponseMessage = TrustPingResponseMessage;
//# sourceMappingURL=TrustPingResponseMessage.js.map