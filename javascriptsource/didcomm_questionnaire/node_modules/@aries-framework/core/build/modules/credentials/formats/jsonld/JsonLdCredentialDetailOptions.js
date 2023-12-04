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
exports.JsonLdCredentialDetailOptions = exports.JsonLdCredentialDetailCredentialStatus = void 0;
const class_validator_1 = require("class-validator");
class JsonLdCredentialDetailCredentialStatus {
    constructor(options) {
        if (options) {
            this.type = options.type;
        }
    }
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], JsonLdCredentialDetailCredentialStatus.prototype, "type", void 0);
exports.JsonLdCredentialDetailCredentialStatus = JsonLdCredentialDetailCredentialStatus;
class JsonLdCredentialDetailOptions {
    constructor(options) {
        if (options) {
            this.proofPurpose = options.proofPurpose;
            this.created = options.created;
            this.domain = options.domain;
            this.challenge = options.challenge;
            this.credentialStatus = options.credentialStatus;
            this.proofType = options.proofType;
        }
    }
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], JsonLdCredentialDetailOptions.prototype, "proofPurpose", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], JsonLdCredentialDetailOptions.prototype, "created", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], JsonLdCredentialDetailOptions.prototype, "domain", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], JsonLdCredentialDetailOptions.prototype, "challenge", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], JsonLdCredentialDetailOptions.prototype, "proofType", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", JsonLdCredentialDetailCredentialStatus)
], JsonLdCredentialDetailOptions.prototype, "credentialStatus", void 0);
exports.JsonLdCredentialDetailOptions = JsonLdCredentialDetailOptions;
//# sourceMappingURL=JsonLdCredentialDetailOptions.js.map