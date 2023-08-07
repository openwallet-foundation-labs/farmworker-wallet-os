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
exports.AckDecorator = exports.AckValues = void 0;
const class_validator_1 = require("class-validator");
var AckValues;
(function (AckValues) {
    AckValues["Receipt"] = "RECEIPT";
    AckValues["Outcome"] = "OUTCOME";
})(AckValues = exports.AckValues || (exports.AckValues = {}));
/**
 * Represents `~please_ack` decorator
 */
class AckDecorator {
    constructor(options) {
        // pre-aip 2 the on value was not defined yet. We interpret this as
        // the value being set to on receipt
        this.on = [AckValues.Receipt];
        if (options) {
            this.on = options.on;
        }
    }
}
__decorate([
    (0, class_validator_1.IsEnum)(AckValues, { each: true }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], AckDecorator.prototype, "on", void 0);
exports.AckDecorator = AckDecorator;
//# sourceMappingURL=AckDecorator.js.map