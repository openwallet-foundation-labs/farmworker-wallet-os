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
exports.SignatureDecorator = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const BaseMessage_1 = require("../../agent/BaseMessage");
const messageType_1 = require("../../utils/messageType");
/**
 * Represents `[field]~sig` decorator
 * @see https://github.com/hyperledger/aries-rfcs/blob/master/features/0234-signature-decorator/README.md
 */
class SignatureDecorator {
    constructor(options) {
        if (options) {
            this.signatureType = options.signatureType;
            this.signatureData = options.signatureData;
            this.signer = options.signer;
            this.signature = options.signature;
        }
    }
}
__decorate([
    (0, class_transformer_1.Expose)({ name: '@type' }),
    (0, class_transformer_1.Transform)(({ value }) => (0, messageType_1.replaceLegacyDidSovPrefix)(value), {
        toClassOnly: true,
    }),
    (0, class_validator_1.Matches)(BaseMessage_1.MessageTypeRegExp),
    __metadata("design:type", String)
], SignatureDecorator.prototype, "signatureType", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'sig_data' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SignatureDecorator.prototype, "signatureData", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'signer' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SignatureDecorator.prototype, "signer", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'signature' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SignatureDecorator.prototype, "signature", void 0);
exports.SignatureDecorator = SignatureDecorator;
//# sourceMappingURL=SignatureDecorator.js.map