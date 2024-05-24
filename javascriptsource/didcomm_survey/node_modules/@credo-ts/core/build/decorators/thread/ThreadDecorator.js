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
exports.ThreadDecorator = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const BaseMessage_1 = require("../../agent/BaseMessage");
/**
 * Represents `~thread` decorator
 * @see https://github.com/hyperledger/aries-rfcs/blob/master/concepts/0008-message-id-and-threading/README.md
 */
class ThreadDecorator {
    constructor(partial) {
        this.threadId = partial === null || partial === void 0 ? void 0 : partial.threadId;
        this.parentThreadId = partial === null || partial === void 0 ? void 0 : partial.parentThreadId;
        this.senderOrder = partial === null || partial === void 0 ? void 0 : partial.senderOrder;
        this.receivedOrders = partial === null || partial === void 0 ? void 0 : partial.receivedOrders;
    }
}
__decorate([
    (0, class_transformer_1.Expose)({ name: 'thid' }),
    (0, class_validator_1.Matches)(BaseMessage_1.MessageIdRegExp),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ThreadDecorator.prototype, "threadId", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'pthid' }),
    (0, class_validator_1.Matches)(BaseMessage_1.MessageIdRegExp),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ThreadDecorator.prototype, "parentThreadId", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'sender_order' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], ThreadDecorator.prototype, "senderOrder", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'received_orders' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], ThreadDecorator.prototype, "receivedOrders", void 0);
exports.ThreadDecorator = ThreadDecorator;
//# sourceMappingURL=ThreadDecorator.js.map