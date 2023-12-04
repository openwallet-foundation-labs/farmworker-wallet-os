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
exports.IsCredentialType = exports.W3cCredential = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const utils_1 = require("../../../../utils");
const validators_1 = require("../../../../utils/validators");
const constants_1 = require("../../constants");
const validators_2 = require("../../validators");
const W3cCredentialSchema_1 = require("./W3cCredentialSchema");
const W3cCredentialStatus_1 = require("./W3cCredentialStatus");
const W3cCredentialSubject_1 = require("./W3cCredentialSubject");
const W3cIssuer_1 = require("./W3cIssuer");
class W3cCredential {
    constructor(options) {
        var _a;
        if (options) {
            this.context = (_a = options.context) !== null && _a !== void 0 ? _a : [constants_1.CREDENTIALS_CONTEXT_V1_URL];
            this.id = options.id;
            this.type = options.type || ['VerifiableCredential'];
            this.issuer =
                typeof options.issuer === 'string' || options.issuer instanceof W3cIssuer_1.W3cIssuer
                    ? options.issuer
                    : new W3cIssuer_1.W3cIssuer(options.issuer);
            this.issuanceDate = options.issuanceDate;
            this.expirationDate = options.expirationDate;
            this.credentialSubject = (0, utils_1.mapSingleOrArray)(options.credentialSubject, (subject) => subject instanceof W3cCredentialSubject_1.W3cCredentialSubject ? subject : new W3cCredentialSubject_1.W3cCredentialSubject(subject));
            if (options.credentialStatus) {
                this.credentialStatus =
                    options.credentialStatus instanceof W3cCredentialStatus_1.W3cCredentialStatus
                        ? options.credentialStatus
                        : new W3cCredentialStatus_1.W3cCredentialStatus(options.credentialStatus);
            }
        }
    }
    get issuerId() {
        return this.issuer instanceof W3cIssuer_1.W3cIssuer ? this.issuer.id : this.issuer;
    }
    get credentialSchemaIds() {
        if (!this.credentialSchema)
            return [];
        if (Array.isArray(this.credentialSchema)) {
            return this.credentialSchema.map((credentialSchema) => credentialSchema.id);
        }
        return [this.credentialSchema.id];
    }
    get credentialSubjectIds() {
        if (Array.isArray(this.credentialSubject)) {
            return this.credentialSubject
                .map((credentialSubject) => credentialSubject.id)
                .filter((v) => v !== undefined);
        }
        return this.credentialSubject.id ? [this.credentialSubject.id] : [];
    }
    get contexts() {
        return (0, utils_1.asArray)(this.context);
    }
    static fromJson(json) {
        return utils_1.JsonTransformer.fromJSON(json, W3cCredential);
    }
}
__decorate([
    (0, class_transformer_1.Expose)({ name: '@context' }),
    (0, validators_2.IsCredentialJsonLdContext)(),
    __metadata("design:type", Array)
], W3cCredential.prototype, "context", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, validators_1.IsUri)(),
    __metadata("design:type", String)
], W3cCredential.prototype, "id", void 0);
__decorate([
    IsCredentialType(),
    __metadata("design:type", Array)
], W3cCredential.prototype, "type", void 0);
__decorate([
    (0, W3cIssuer_1.W3cIssuerTransformer)(),
    (0, W3cIssuer_1.IsW3cIssuer)(),
    __metadata("design:type", Object)
], W3cCredential.prototype, "issuer", void 0);
__decorate([
    (0, class_validator_1.IsRFC3339)(),
    __metadata("design:type", String)
], W3cCredential.prototype, "issuanceDate", void 0);
__decorate([
    (0, class_validator_1.IsRFC3339)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], W3cCredential.prototype, "expirationDate", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => W3cCredentialSubject_1.W3cCredentialSubject),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, validators_1.IsInstanceOrArrayOfInstances)({ classType: W3cCredentialSubject_1.W3cCredentialSubject }),
    __metadata("design:type", Object)
], W3cCredential.prototype, "credentialSubject", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => W3cCredentialSchema_1.W3cCredentialSchema),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, validators_1.IsInstanceOrArrayOfInstances)({ classType: W3cCredentialSchema_1.W3cCredentialSchema, allowEmptyArray: true }),
    __metadata("design:type", Object)
], W3cCredential.prototype, "credentialSchema", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => W3cCredentialStatus_1.W3cCredentialStatus),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.IsInstance)(W3cCredentialStatus_1.W3cCredentialStatus),
    __metadata("design:type", W3cCredentialStatus_1.W3cCredentialStatus)
], W3cCredential.prototype, "credentialStatus", void 0);
exports.W3cCredential = W3cCredential;
// Custom validator
function IsCredentialType(validationOptions) {
    return (0, class_validator_1.ValidateBy)({
        name: 'IsVerifiableCredentialType',
        validator: {
            validate: (value) => {
                if (Array.isArray(value)) {
                    return value.includes(constants_1.VERIFIABLE_CREDENTIAL_TYPE);
                }
                return false;
            },
            defaultMessage: (0, class_validator_1.buildMessage)((eachPrefix) => eachPrefix + '$property must be an array of strings which includes "VerifiableCredential"', validationOptions),
        },
    }, validationOptions);
}
exports.IsCredentialType = IsCredentialType;
//# sourceMappingURL=W3cCredential.js.map