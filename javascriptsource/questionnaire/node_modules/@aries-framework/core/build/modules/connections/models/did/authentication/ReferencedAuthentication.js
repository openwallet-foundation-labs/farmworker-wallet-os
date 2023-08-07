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
exports.ReferencedAuthentication = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const PublicKey_1 = require("../publicKey/PublicKey");
const Authentication_1 = require("./Authentication");
class ReferencedAuthentication extends Authentication_1.Authentication {
    constructor(publicKey, type) {
        super();
        this.publicKey = publicKey;
        this.type = type;
    }
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReferencedAuthentication.prototype, "type", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => value.id, {
        toPlainOnly: true,
    }),
    __metadata("design:type", PublicKey_1.PublicKey)
], ReferencedAuthentication.prototype, "publicKey", void 0);
exports.ReferencedAuthentication = ReferencedAuthentication;
//# sourceMappingURL=ReferencedAuthentication.js.map