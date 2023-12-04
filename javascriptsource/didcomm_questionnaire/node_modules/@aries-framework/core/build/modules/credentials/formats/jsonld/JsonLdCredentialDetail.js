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
exports.JsonLdCredentialDetail = void 0;
const class_transformer_1 = require("class-transformer");
const W3cCredential_1 = require("../../../vc/models/credential/W3cCredential");
const JsonLdCredentialDetailOptions_1 = require("./JsonLdCredentialDetailOptions");
/**
 * Class providing validation for the V2 json ld credential as per RFC0593 (used to sign credentials)
 *
 */
class JsonLdCredentialDetail {
    constructor(options) {
        if (options) {
            this.credential = options.credential;
            this.options = options.options;
        }
    }
}
__decorate([
    (0, class_transformer_1.Type)(() => W3cCredential_1.W3cCredential),
    __metadata("design:type", W3cCredential_1.W3cCredential)
], JsonLdCredentialDetail.prototype, "credential", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'options' }),
    (0, class_transformer_1.Type)(() => JsonLdCredentialDetailOptions_1.JsonLdCredentialDetailOptions),
    __metadata("design:type", JsonLdCredentialDetailOptions_1.JsonLdCredentialDetailOptions)
], JsonLdCredentialDetail.prototype, "options", void 0);
exports.JsonLdCredentialDetail = JsonLdCredentialDetail;
//# sourceMappingURL=JsonLdCredentialDetail.js.map