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
exports.EmbeddedAuthentication = void 0;
const class_validator_1 = require("class-validator");
const PublicKey_1 = require("../publicKey/PublicKey");
const Authentication_1 = require("./Authentication");
class EmbeddedAuthentication extends Authentication_1.Authentication {
    constructor(publicKey) {
        super();
        this.publicKey = publicKey;
    }
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_validator_1.IsInstance)(PublicKey_1.PublicKey),
    __metadata("design:type", PublicKey_1.PublicKey)
], EmbeddedAuthentication.prototype, "publicKey", void 0);
exports.EmbeddedAuthentication = EmbeddedAuthentication;
//# sourceMappingURL=EmbeddedAuthentication.js.map