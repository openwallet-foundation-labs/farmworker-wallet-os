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
exports.DataIntegrityProof = void 0;
const class_validator_1 = require("class-validator");
const utils_1 = require("../../../../utils");
/**
 * Linked Data Proof
 * @see https://w3c.github.io/vc-data-model/#proofs-signatures
 *
 * @class LinkedDataProof
 */
class DataIntegrityProof {
    constructor(options) {
        if (options) {
            this.type = options.type;
            this.cryptosuite = options.cryptosuite;
            this.verificationMethod = options.verificationMethod;
            this.proofPurpose = options.proofPurpose;
            this.domain = options.domain;
            this.challenge = options.challenge;
            this.nonce = options.nonce;
            this.created = options.created;
            this.expires = options.expires;
            this.proofValue = options.proofValue;
            this.previousProof = options.previousProof;
        }
    }
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEnum)(['DataIntegrityProof']),
    __metadata("design:type", String)
], DataIntegrityProof.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DataIntegrityProof.prototype, "cryptosuite", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DataIntegrityProof.prototype, "proofPurpose", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DataIntegrityProof.prototype, "verificationMethod", void 0);
__decorate([
    (0, utils_1.IsUri)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], DataIntegrityProof.prototype, "domain", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], DataIntegrityProof.prototype, "challenge", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], DataIntegrityProof.prototype, "nonce", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], DataIntegrityProof.prototype, "created", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], DataIntegrityProof.prototype, "expires", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], DataIntegrityProof.prototype, "proofValue", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], DataIntegrityProof.prototype, "previousProof", void 0);
exports.DataIntegrityProof = DataIntegrityProof;
//# sourceMappingURL=DataIntegrityProof.js.map