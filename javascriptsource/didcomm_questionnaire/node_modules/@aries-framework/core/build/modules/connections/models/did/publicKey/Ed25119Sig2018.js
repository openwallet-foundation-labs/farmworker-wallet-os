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
exports.Ed25119Sig2018 = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const PublicKey_1 = require("./PublicKey");
class Ed25119Sig2018 extends PublicKey_1.PublicKey {
    constructor(options) {
        super(Object.assign(Object.assign({}, options), { type: 'Ed25519VerificationKey2018' }));
        this.type = 'Ed25519VerificationKey2018';
        if (options) {
            this.value = options.publicKeyBase58;
        }
    }
}
__decorate([
    (0, class_validator_1.Equals)('Ed25519VerificationKey2018'),
    __metadata("design:type", Object)
], Ed25119Sig2018.prototype, "type", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'publicKeyBase58' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Ed25119Sig2018.prototype, "value", void 0);
exports.Ed25119Sig2018 = Ed25119Sig2018;
//# sourceMappingURL=Ed25119Sig2018.js.map