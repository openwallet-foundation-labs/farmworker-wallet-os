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
exports.OutOfBandDidCommService = void 0;
const class_validator_1 = require("class-validator");
const utils_1 = require("../../../utils");
const dids_1 = require("../../dids");
class OutOfBandDidCommService extends dids_1.DidDocumentService {
    constructor(options) {
        super(Object.assign(Object.assign({}, options), { type: OutOfBandDidCommService.type }));
        if (options) {
            this.recipientKeys = options.recipientKeys;
            this.routingKeys = options.routingKeys;
            this.accept = options.accept;
        }
    }
    get resolvedDidCommService() {
        var _a, _b;
        return {
            id: this.id,
            recipientKeys: this.recipientKeys.map((didKey) => dids_1.DidKey.fromDid(didKey).key),
            routingKeys: (_b = (_a = this.routingKeys) === null || _a === void 0 ? void 0 : _a.map((didKey) => dids_1.DidKey.fromDid(didKey).key)) !== null && _b !== void 0 ? _b : [],
            serviceEndpoint: this.serviceEndpoint,
        };
    }
    static fromResolvedDidCommService(service) {
        return new OutOfBandDidCommService({
            id: service.id,
            recipientKeys: service.recipientKeys.map((key) => new dids_1.DidKey(key).did),
            routingKeys: service.routingKeys.map((key) => new dids_1.DidKey(key).did),
            serviceEndpoint: service.serviceEndpoint,
        });
    }
}
OutOfBandDidCommService.type = 'did-communication';
__decorate([
    (0, class_validator_1.ArrayNotEmpty)(),
    IsDidKeyString({ each: true }),
    __metadata("design:type", Array)
], OutOfBandDidCommService.prototype, "recipientKeys", void 0);
__decorate([
    IsDidKeyString({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], OutOfBandDidCommService.prototype, "routingKeys", void 0);
__decorate([
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], OutOfBandDidCommService.prototype, "accept", void 0);
exports.OutOfBandDidCommService = OutOfBandDidCommService;
/**
 * Checks if a given value is a did:key did string
 */
function IsDidKeyString(validationOptions) {
    return (0, class_validator_1.ValidateBy)({
        name: 'isDidKeyString',
        validator: {
            validate: (value) => (0, class_validator_1.isString)(value) && (0, utils_1.isDid)(value, 'key'),
            defaultMessage: (0, class_validator_1.buildMessage)((eachPrefix) => eachPrefix + '$property must be a did:key string', validationOptions),
        },
    }, validationOptions);
}
//# sourceMappingURL=OutOfBandDidCommService.js.map