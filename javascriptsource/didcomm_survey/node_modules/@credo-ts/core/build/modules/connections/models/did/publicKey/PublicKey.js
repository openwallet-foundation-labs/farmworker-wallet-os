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
exports.PublicKey = void 0;
const class_validator_1 = require("class-validator");
class PublicKey {
    constructor(options) {
        if (options) {
            this.id = options.id;
            this.controller = options.controller;
            this.type = options.type;
            this.value = options.value;
        }
    }
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PublicKey.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PublicKey.prototype, "controller", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PublicKey.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], PublicKey.prototype, "value", void 0);
exports.PublicKey = PublicKey;
//# sourceMappingURL=PublicKey.js.map