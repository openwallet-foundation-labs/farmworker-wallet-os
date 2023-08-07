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
exports.ServiceDecorator = void 0;
const class_validator_1 = require("class-validator");
const helpers_1 = require("../../modules/dids/helpers");
const uuid_1 = require("../../utils/uuid");
/**
 * Represents `~service` decorator
 *
 * Based on specification Aries RFC 0056: Service Decorator
 * @see https://github.com/hyperledger/aries-rfcs/tree/master/features/0056-service-decorator
 */
class ServiceDecorator {
    constructor(options) {
        if (options) {
            this.recipientKeys = options.recipientKeys;
            this.routingKeys = options.routingKeys;
            this.serviceEndpoint = options.serviceEndpoint;
        }
    }
    get resolvedDidCommService() {
        var _a, _b;
        return {
            id: (0, uuid_1.uuid)(),
            recipientKeys: this.recipientKeys.map(helpers_1.verkeyToInstanceOfKey),
            routingKeys: (_b = (_a = this.routingKeys) === null || _a === void 0 ? void 0 : _a.map(helpers_1.verkeyToInstanceOfKey)) !== null && _b !== void 0 ? _b : [],
            serviceEndpoint: this.serviceEndpoint,
        };
    }
}
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], ServiceDecorator.prototype, "recipientKeys", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], ServiceDecorator.prototype, "routingKeys", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ServiceDecorator.prototype, "serviceEndpoint", void 0);
exports.ServiceDecorator = ServiceDecorator;
//# sourceMappingURL=ServiceDecorator.js.map