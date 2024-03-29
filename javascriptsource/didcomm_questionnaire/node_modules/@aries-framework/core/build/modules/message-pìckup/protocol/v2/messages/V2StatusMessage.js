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
exports.V2StatusMessage = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const AgentMessage_1 = require("../../../../../agent/AgentMessage");
const TransportDecorator_1 = require("../../../../../decorators/transport/TransportDecorator");
const messageType_1 = require("../../../../../utils/messageType");
const transformers_1 = require("../../../../../utils/transformers");
class V2StatusMessage extends AgentMessage_1.AgentMessage {
    constructor(options) {
        super();
        this.type = V2StatusMessage.type.messageTypeUri;
        if (options) {
            this.id = options.id || this.generateId();
            this.recipientKey = options.recipientKey;
            this.messageCount = options.messageCount;
            this.longestWaitedSeconds = options.longestWaitedSeconds;
            this.newestReceivedTime = options.newestReceivedTime;
            this.oldestReceivedTime = options.oldestReceivedTime;
            this.totalBytes = options.totalBytes;
            this.liveDelivery = options.liveDelivery;
            this.setThread({
                threadId: options.threadId,
            });
        }
        this.setReturnRouting(TransportDecorator_1.ReturnRouteTypes.all);
    }
}
V2StatusMessage.type = (0, messageType_1.parseMessageType)('https://didcomm.org/messagepickup/2.0/status');
__decorate([
    (0, messageType_1.IsValidMessageType)(V2StatusMessage.type),
    __metadata("design:type", Object)
], V2StatusMessage.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Expose)({ name: 'recipient_key' }),
    __metadata("design:type", String)
], V2StatusMessage.prototype, "recipientKey", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Expose)({ name: 'message_count' }),
    __metadata("design:type", Number)
], V2StatusMessage.prototype, "messageCount", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Expose)({ name: 'longest_waited_seconds' }),
    __metadata("design:type", Number)
], V2StatusMessage.prototype, "longestWaitedSeconds", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'newest_received_time' }),
    (0, class_transformer_1.Transform)(({ value }) => (0, transformers_1.DateParser)(value)),
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], V2StatusMessage.prototype, "newestReceivedTime", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => (0, transformers_1.DateParser)(value)),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Expose)({ name: 'oldest_received_time' }),
    __metadata("design:type", Date)
], V2StatusMessage.prototype, "oldestReceivedTime", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Expose)({ name: 'total_bytes' }),
    __metadata("design:type", Number)
], V2StatusMessage.prototype, "totalBytes", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Expose)({ name: 'live_delivery' }),
    __metadata("design:type", Boolean)
], V2StatusMessage.prototype, "liveDelivery", void 0);
exports.V2StatusMessage = V2StatusMessage;
//# sourceMappingURL=V2StatusMessage.js.map