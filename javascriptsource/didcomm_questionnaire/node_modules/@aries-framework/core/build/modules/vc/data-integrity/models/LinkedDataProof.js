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
exports.LinkedDataProofTransformer = exports.LinkedDataProof = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const utils_1 = require("../../../../utils");
/**
 * Linked Data Proof
 * @see https://w3c.github.io/vc-data-model/#proofs-signatures
 *
 * @class LinkedDataProof
 */
class LinkedDataProof {
    constructor(options) {
        if (options) {
            this.type = options.type;
            this.proofPurpose = options.proofPurpose;
            this.verificationMethod = options.verificationMethod;
            this.created = options.created;
            this.domain = options.domain;
            this.challenge = options.challenge;
            this.jws = options.jws;
            this.proofValue = options.proofValue;
            this.nonce = options.nonce;
        }
    }
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LinkedDataProof.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LinkedDataProof.prototype, "proofPurpose", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LinkedDataProof.prototype, "verificationMethod", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LinkedDataProof.prototype, "created", void 0);
__decorate([
    (0, utils_1.IsUri)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], LinkedDataProof.prototype, "domain", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], LinkedDataProof.prototype, "challenge", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], LinkedDataProof.prototype, "jws", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], LinkedDataProof.prototype, "proofValue", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], LinkedDataProof.prototype, "nonce", void 0);
exports.LinkedDataProof = LinkedDataProof;
// Custom transformers
function LinkedDataProofTransformer() {
    return (0, class_transformer_1.Transform)(({ value, type }) => {
        if (type === class_transformer_1.TransformationType.PLAIN_TO_CLASS) {
            if (Array.isArray(value))
                return value.map((v) => (0, class_transformer_1.plainToInstance)(LinkedDataProof, v));
            return (0, class_transformer_1.plainToInstance)(LinkedDataProof, value);
        }
        else if (type === class_transformer_1.TransformationType.CLASS_TO_PLAIN) {
            if (Array.isArray(value))
                return value.map((v) => (0, class_transformer_1.instanceToPlain)(v));
            return (0, class_transformer_1.instanceToPlain)(value);
        }
        // PLAIN_TO_PLAIN
        return value;
    });
}
exports.LinkedDataProofTransformer = LinkedDataProofTransformer;
//# sourceMappingURL=LinkedDataProof.js.map