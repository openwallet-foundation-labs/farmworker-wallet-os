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
exports.DataIntegrityCredentialOffer = exports.DataIntegrityBindingMethods = exports.DidCommSignedAttachmentBindingMethod = exports.AnonCredsLinkSecretBindingMethod = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const JsonTransformer_1 = require("../../../../utils/JsonTransformer");
const vc_1 = require("../../../vc");
const SUPPORTED_W3C_VC_DATA_MODEL_VERSIONS = ['1.1', '2.0'];
// This binding method is intended to be used in combination with a credential containing an AnonCreds proof.
class AnonCredsLinkSecretBindingMethod {
    constructor(options) {
        if (options) {
            this.credentialDefinitionId = options.credentialDefinitionId;
            this.nonce = options.nonce;
            this.keyCorrectnessProof = options.keyCorrectnessProof;
        }
    }
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)({ name: 'cred_def_id' }),
    __metadata("design:type", String)
], AnonCredsLinkSecretBindingMethod.prototype, "credentialDefinitionId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AnonCredsLinkSecretBindingMethod.prototype, "nonce", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'key_correctness_proof' }),
    __metadata("design:type", Object)
], AnonCredsLinkSecretBindingMethod.prototype, "keyCorrectnessProof", void 0);
exports.AnonCredsLinkSecretBindingMethod = AnonCredsLinkSecretBindingMethod;
class DidCommSignedAttachmentBindingMethod {
    constructor(options) {
        if (options) {
            this.algsSupported = options.algSupported;
            this.didMethodsSupported = options.didMethodsSupported;
            this.nonce = options.nonce;
        }
    }
}
__decorate([
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_transformer_1.Expose)({ name: 'algs_supported' }),
    __metadata("design:type", Array)
], DidCommSignedAttachmentBindingMethod.prototype, "algsSupported", void 0);
__decorate([
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_transformer_1.Expose)({ name: 'did_methods_supported' }),
    __metadata("design:type", Array)
], DidCommSignedAttachmentBindingMethod.prototype, "didMethodsSupported", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DidCommSignedAttachmentBindingMethod.prototype, "nonce", void 0);
exports.DidCommSignedAttachmentBindingMethod = DidCommSignedAttachmentBindingMethod;
class DataIntegrityBindingMethods {
    constructor(options) {
        if (options) {
            this.anoncredsLinkSecret = options.anonCredsLinkSecret;
            this.didcommSignedAttachment = options.didcommSignedAttachment;
        }
    }
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => AnonCredsLinkSecretBindingMethod),
    (0, class_transformer_1.Expose)({ name: 'anoncreds_link_secret' }),
    __metadata("design:type", AnonCredsLinkSecretBindingMethod)
], DataIntegrityBindingMethods.prototype, "anoncredsLinkSecret", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => DidCommSignedAttachmentBindingMethod),
    (0, class_transformer_1.Expose)({ name: 'didcomm_signed_attachment' }),
    __metadata("design:type", DidCommSignedAttachmentBindingMethod)
], DataIntegrityBindingMethods.prototype, "didcommSignedAttachment", void 0);
exports.DataIntegrityBindingMethods = DataIntegrityBindingMethods;
class DataIntegrityCredentialOffer {
    constructor(options) {
        if (options) {
            this.credential =
                options.credential instanceof vc_1.W3cCredential ? JsonTransformer_1.JsonTransformer.toJSON(options.credential) : options.credential;
            this.bindingRequired = options.bindingRequired;
            this.bindingMethod = options.bindingMethod;
            this.dataModelVersionsSupported = options.dataModelVersionsSupported;
        }
    }
}
__decorate([
    (0, class_validator_1.ArrayNotEmpty)(),
    (0, class_validator_1.IsEnum)(SUPPORTED_W3C_VC_DATA_MODEL_VERSIONS, { each: true }),
    (0, class_transformer_1.Expose)({ name: 'data_model_versions_supported' }),
    __metadata("design:type", Array)
], DataIntegrityCredentialOffer.prototype, "dataModelVersionsSupported", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Expose)({ name: 'binding_required' }),
    __metadata("design:type", Boolean)
], DataIntegrityCredentialOffer.prototype, "bindingRequired", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => DataIntegrityBindingMethods),
    (0, class_transformer_1.Expose)({ name: 'binding_method' }),
    __metadata("design:type", DataIntegrityBindingMethods
    // The credential should be compliant with the VC Data Model.
    // The credential MUST NOT contain any proofs.
    // Some properties MAY be omitted if they will only be available at time of issuance, such as issuanceDate, issuer, credentialSubject.id, credentialStatus, credentialStatus.id.
    // The credential MUST be conformant with one of the data model versions indicated in data_model_versions_supported.
    )
], DataIntegrityCredentialOffer.prototype, "bindingMethod", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'credential' }),
    __metadata("design:type", Object)
], DataIntegrityCredentialOffer.prototype, "credential", void 0);
exports.DataIntegrityCredentialOffer = DataIntegrityCredentialOffer;
//# sourceMappingURL=dataIntegrityExchange.js.map