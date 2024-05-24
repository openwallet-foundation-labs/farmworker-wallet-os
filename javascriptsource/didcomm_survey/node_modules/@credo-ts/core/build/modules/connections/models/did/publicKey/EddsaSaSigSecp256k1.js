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
exports.EddsaSaSigSecp256k1 = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const PublicKey_1 = require("./PublicKey");
class EddsaSaSigSecp256k1 extends PublicKey_1.PublicKey {
    constructor(options) {
        super(Object.assign(Object.assign({}, options), { type: 'Secp256k1VerificationKey2018' }));
        this.type = 'Secp256k1VerificationKey2018';
        if (options) {
            this.value = options.publicKeyHex;
        }
    }
}
__decorate([
    (0, class_validator_1.Equals)('Secp256k1VerificationKey2018'),
    __metadata("design:type", Object)
], EddsaSaSigSecp256k1.prototype, "type", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'publicKeyHex' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EddsaSaSigSecp256k1.prototype, "value", void 0);
exports.EddsaSaSigSecp256k1 = EddsaSaSigSecp256k1;
//# sourceMappingURL=EddsaSaSigSecp256k1.js.map