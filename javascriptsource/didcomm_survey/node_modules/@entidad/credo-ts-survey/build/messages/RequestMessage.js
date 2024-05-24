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
exports.RequestMessage = void 0;
const core_1 = require("@credo-ts/core");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const models_1 = require("../models");
class RequestMessage extends core_1.AgentMessage {
    /**
     * Create new RequestMessage instance.
     * @param options
     */
    constructor(options) {
        super();
        this.type = RequestMessage.type.messageTypeUri;
        if (options) {
            this.id = options.id || this.generateId();
            this.signatureRequired = options.signatureRequired;
            this.expirationDate = options.expirationDate;
            this.request = options.request;
        }
    }
}
RequestMessage.type = (0, core_1.parseMessageType)('https://didcomm.org/survey/1.0/request');
__decorate([
    (0, core_1.IsValidMessageType)(RequestMessage.type),
    __metadata("design:type", Object)
], RequestMessage.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Expose)({ name: 'signature_required' }),
    __metadata("design:type", Boolean)
], RequestMessage.prototype, "signatureRequired", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RequestMessage.prototype, "expirationDate", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'request' }),
    __metadata("design:type", models_1.SurveyModel)
], RequestMessage.prototype, "request", void 0);
exports.RequestMessage = RequestMessage;
//# sourceMappingURL=RequestMessage.js.map