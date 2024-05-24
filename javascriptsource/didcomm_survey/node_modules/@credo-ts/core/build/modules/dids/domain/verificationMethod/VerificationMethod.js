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
exports.VerificationMethod = void 0;
const class_validator_1 = require("class-validator");
class VerificationMethod {
    constructor(options) {
        if (options) {
            this.id = options.id;
            this.type = options.type;
            this.controller = options.controller;
            this.publicKeyBase58 = options.publicKeyBase58;
            this.publicKeyBase64 = options.publicKeyBase64;
            this.publicKeyJwk = options.publicKeyJwk;
            this.publicKeyHex = options.publicKeyHex;
            this.publicKeyMultibase = options.publicKeyMultibase;
            this.publicKeyPem = options.publicKeyPem;
            this.blockchainAccountId = options.blockchainAccountId;
            this.ethereumAddress = options.ethereumAddress;
        }
    }
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], VerificationMethod.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], VerificationMethod.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], VerificationMethod.prototype, "controller", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], VerificationMethod.prototype, "publicKeyBase58", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], VerificationMethod.prototype, "publicKeyBase64", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], VerificationMethod.prototype, "publicKeyHex", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], VerificationMethod.prototype, "publicKeyMultibase", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], VerificationMethod.prototype, "publicKeyPem", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], VerificationMethod.prototype, "blockchainAccountId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], VerificationMethod.prototype, "ethereumAddress", void 0);
exports.VerificationMethod = VerificationMethod;
//# sourceMappingURL=VerificationMethod.js.map