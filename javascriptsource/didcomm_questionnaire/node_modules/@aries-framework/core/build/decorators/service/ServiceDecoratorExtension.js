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
exports.ServiceDecorated = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const ServiceDecorator_1 = require("./ServiceDecorator");
function ServiceDecorated(Base) {
    class ServiceDecoratorExtension extends Base {
        setService(serviceData) {
            this.service = new ServiceDecorator_1.ServiceDecorator(serviceData);
        }
    }
    __decorate([
        (0, class_transformer_1.Expose)({ name: '~service' }),
        (0, class_transformer_1.Type)(() => ServiceDecorator_1.ServiceDecorator),
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.ValidateNested)(),
        __metadata("design:type", ServiceDecorator_1.ServiceDecorator)
    ], ServiceDecoratorExtension.prototype, "service", void 0);
    return ServiceDecoratorExtension;
}
exports.ServiceDecorated = ServiceDecorated;
//# sourceMappingURL=ServiceDecoratorExtension.js.map