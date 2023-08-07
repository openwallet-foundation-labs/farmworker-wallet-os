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
exports.TimingDecorator = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
/**
 * Represents `~timing` decorator
 * @see https://github.com/hyperledger/aries-rfcs/blob/master/features/0032-message-timing/README.md
 */
class TimingDecorator {
    constructor(partial) {
        this.inTime = partial === null || partial === void 0 ? void 0 : partial.inTime;
        this.outTime = partial === null || partial === void 0 ? void 0 : partial.outTime;
        this.staleTime = partial === null || partial === void 0 ? void 0 : partial.staleTime;
        this.expiresTime = partial === null || partial === void 0 ? void 0 : partial.expiresTime;
        this.delayMilli = partial === null || partial === void 0 ? void 0 : partial.delayMilli;
        this.waitUntilTime = partial === null || partial === void 0 ? void 0 : partial.waitUntilTime;
    }
}
__decorate([
    (0, class_transformer_1.Expose)({ name: 'in_time' }),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date
    /**
     * The timestamp when the message was emitted. At least millisecond precision is preferred, though second precision is acceptable.
     */
    )
], TimingDecorator.prototype, "inTime", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'out_time' }),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date
    /**
     * Ideally, the decorated message should be processed by the the specified timestamp. After that, the message may become irrelevant or less meaningful than intended.
     * This is a hint only.
     */
    )
], TimingDecorator.prototype, "outTime", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'stale_time' }),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date
    /**
     * The decorated message should be considered invalid or expired if encountered after the specified timestamp.
     * This is a much stronger claim than the one for `stale_time`; it says that the receiver should cancel attempts to process it once the deadline is past,
     * because the sender won't stand behind it any longer. While processing of the received message should stop,
     * the thread of the message should be retained as the sender may send an updated/replacement message.
     * In the case that the sender does not follow up, the policy of the receiver agent related to abandoned threads would presumably be used to eventually delete the thread.
     */
    )
], TimingDecorator.prototype, "staleTime", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'expires_time' }),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date
    /**
     * Wait at least this many milliseconds before processing the message. This may be useful to defeat temporal correlation.
     * It is recommended that agents supporting this field should not honor requests for delays longer than 10 minutes (600,000 milliseconds).
     */
    )
], TimingDecorator.prototype, "expiresTime", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'delay_milli' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], TimingDecorator.prototype, "delayMilli", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'wait_until_time' }),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], TimingDecorator.prototype, "waitUntilTime", void 0);
exports.TimingDecorator = TimingDecorator;
//# sourceMappingURL=TimingDecorator.js.map