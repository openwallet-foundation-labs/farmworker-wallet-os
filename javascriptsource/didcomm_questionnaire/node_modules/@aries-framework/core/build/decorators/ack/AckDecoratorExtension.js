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
exports.AckDecorated = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const AckDecorator_1 = require("./AckDecorator");
function AckDecorated(Base) {
    class AckDecoratorExtension extends Base {
        setPleaseAck(on = [AckDecorator_1.AckValues.Receipt]) {
            this.pleaseAck = new AckDecorator_1.AckDecorator({ on });
        }
        getPleaseAck() {
            return this.pleaseAck;
        }
        requiresAck() {
            return this.pleaseAck !== undefined;
        }
    }
    __decorate([
        (0, class_transformer_1.Expose)({ name: '~please_ack' }),
        (0, class_transformer_1.Type)(() => AckDecorator_1.AckDecorator),
        (0, class_validator_1.ValidateNested)(),
        (0, class_validator_1.IsInstance)(AckDecorator_1.AckDecorator),
        (0, class_validator_1.IsOptional)(),
        __metadata("design:type", AckDecorator_1.AckDecorator)
    ], AckDecoratorExtension.prototype, "pleaseAck", void 0);
    return AckDecoratorExtension;
}
exports.AckDecorated = AckDecorated;
//# sourceMappingURL=AckDecoratorExtension.js.map