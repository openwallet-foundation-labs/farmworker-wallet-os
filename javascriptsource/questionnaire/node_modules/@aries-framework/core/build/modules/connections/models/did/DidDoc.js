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
exports.DidDoc = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const service_1 = require("../../../dids/domain/service");
const authentication_1 = require("./authentication");
const publicKey_1 = require("./publicKey");
class DidDoc {
    constructor(options) {
        this.context = 'https://w3id.org/did/v1';
        this.publicKey = [];
        this.service = [];
        this.authentication = [];
        if (options) {
            this.id = options.id;
            this.publicKey = options.publicKey;
            this.service = options.service;
            this.authentication = options.authentication;
        }
    }
    /**
     * Gets the matching public key for a given key id
     *
     * @param id fully qualified key id
     */
    getPublicKey(id) {
        return this.publicKey.find((item) => item.id === id);
    }
    /**
     * Returns all of the service endpoints matching the given type.
     *
     * @param type The type of service(s) to query.
     */
    getServicesByType(type) {
        return this.service.filter((service) => service.type === type);
    }
    /**
     * Returns all of the service endpoints matching the given class
     *
     * @param classType The class to query services.
     */
    getServicesByClassType(classType) {
        return this.service.filter((service) => service instanceof classType);
    }
    /**
     * Get all DIDComm services ordered by priority descending. This means the highest
     * priority will be the first entry.
     */
    get didCommServices() {
        const didCommServiceTypes = [service_1.IndyAgentService.type, service_1.DidCommV1Service.type];
        const services = this.service.filter((service) => didCommServiceTypes.includes(service.type));
        // Sort services based on indicated priority
        return services.sort((a, b) => b.priority - a.priority);
    }
}
__decorate([
    (0, class_transformer_1.Expose)({ name: '@context' }),
    (0, class_validator_1.Equals)('https://w3id.org/did/v1'),
    __metadata("design:type", Object)
], DidDoc.prototype, "context", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DidDoc.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)(),
    (0, publicKey_1.PublicKeyTransformer)(),
    __metadata("design:type", Array)
], DidDoc.prototype, "publicKey", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)(),
    (0, service_1.ServiceTransformer)(),
    __metadata("design:type", Array)
], DidDoc.prototype, "service", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)(),
    (0, authentication_1.AuthenticationTransformer)(),
    __metadata("design:type", Array)
], DidDoc.prototype, "authentication", void 0);
exports.DidDoc = DidDoc;
//# sourceMappingURL=DidDoc.js.map