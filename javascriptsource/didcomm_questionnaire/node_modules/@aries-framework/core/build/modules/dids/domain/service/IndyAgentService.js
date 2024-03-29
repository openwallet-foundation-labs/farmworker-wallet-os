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
exports.IndyAgentService = void 0;
const class_validator_1 = require("class-validator");
const DidDocumentService_1 = require("./DidDocumentService");
class IndyAgentService extends DidDocumentService_1.DidDocumentService {
    constructor(options) {
        super(Object.assign(Object.assign({}, options), { type: IndyAgentService.type }));
        this.priority = 0;
        if (options) {
            this.recipientKeys = options.recipientKeys;
            this.routingKeys = options.routingKeys;
            if (options.priority)
                this.priority = options.priority;
        }
    }
}
IndyAgentService.type = 'IndyAgent';
__decorate([
    (0, class_validator_1.ArrayNotEmpty)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], IndyAgentService.prototype, "recipientKeys", void 0);
__decorate([
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], IndyAgentService.prototype, "routingKeys", void 0);
exports.IndyAgentService = IndyAgentService;
//# sourceMappingURL=IndyAgentService.js.map