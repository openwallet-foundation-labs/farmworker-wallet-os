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
exports.AckMessage = exports.AckStatus = void 0;
const class_validator_1 = require("class-validator");
const AgentMessage_1 = require("../../../agent/AgentMessage");
const messageType_1 = require("../../../utils/messageType");
/**
 * Ack message status types
 */
var AckStatus;
(function (AckStatus) {
    AckStatus["OK"] = "OK";
    AckStatus["PENDING"] = "PENDING";
})(AckStatus = exports.AckStatus || (exports.AckStatus = {}));
/**
 * @see https://github.com/hyperledger/aries-rfcs/blob/master/features/0015-acks/README.md#explicit-acks
 */
class AckMessage extends AgentMessage_1.AgentMessage {
    /**
     * Create new AckMessage instance.
     * @param options
     */
    constructor(options) {
        super();
        this.type = AckMessage.type.messageTypeUri;
        if (options) {
            this.id = options.id || this.generateId();
            this.status = options.status;
            this.setThread({
                threadId: options.threadId,
            });
        }
    }
}
AckMessage.type = (0, messageType_1.parseMessageType)('https://didcomm.org/notification/1.0/ack');
__decorate([
    (0, messageType_1.IsValidMessageType)(AckMessage.type),
    __metadata("design:type", String)
], AckMessage.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(AckStatus),
    __metadata("design:type", String)
], AckMessage.prototype, "status", void 0);
exports.AckMessage = AckMessage;
//# sourceMappingURL=AckMessage.js.map