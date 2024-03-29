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
exports.DidCommV1Service = void 0;
const class_validator_1 = require("class-validator");
const DidDocumentService_1 = require("./DidDocumentService");
class DidCommV1Service extends DidDocumentService_1.DidDocumentService {
    constructor(options) {
        super(Object.assign(Object.assign({}, options), { type: DidCommV1Service.type }));
        this.priority = 0;
        if (options) {
            this.recipientKeys = options.recipientKeys;
            this.routingKeys = options.routingKeys;
            this.accept = options.accept;
            if (options.priority)
                this.priority = options.priority;
        }
    }
}
DidCommV1Service.type = 'did-communication';
__decorate([
    (0, class_validator_1.ArrayNotEmpty)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], DidCommV1Service.prototype, "recipientKeys", void 0);
__decorate([
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], DidCommV1Service.prototype, "routingKeys", void 0);
__decorate([
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], DidCommV1Service.prototype, "accept", void 0);
exports.DidCommV1Service = DidCommV1Service;
//# sourceMappingURL=DidCommV1Service.js.map