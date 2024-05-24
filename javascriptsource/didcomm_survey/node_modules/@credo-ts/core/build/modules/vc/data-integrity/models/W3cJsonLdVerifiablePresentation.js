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
exports.W3cJsonLdVerifiablePresentation = void 0;
const utils_1 = require("../../../../utils");
const models_1 = require("../../models");
const W3cPresentation_1 = require("../../models/presentation/W3cPresentation");
const DataIntegrityProof_1 = require("./DataIntegrityProof");
const LinkedDataProof_1 = require("./LinkedDataProof");
const ProofTransformer_1 = require("./ProofTransformer");
class W3cJsonLdVerifiablePresentation extends W3cPresentation_1.W3cPresentation {
    constructor(options) {
        super(options);
        if (options) {
            if (options.proof.cryptosuite)
                this.proof = new DataIntegrityProof_1.DataIntegrityProof(options.proof);
            else
                this.proof = new LinkedDataProof_1.LinkedDataProof(options.proof);
        }
    }
    get proofTypes() {
        var _a;
        const proofArray = (_a = (0, utils_1.asArray)(this.proof)) !== null && _a !== void 0 ? _a : [];
        return proofArray.map((proof) => proof.type);
    }
    get dataIntegrityCryptosuites() {
        var _a;
        const proofArray = (_a = (0, utils_1.asArray)(this.proof)) !== null && _a !== void 0 ? _a : [];
        return proofArray
            .filter((proof) => proof.type === 'DataIntegrityProof' && 'cryptosuite' in proof)
            .map((proof) => proof.cryptosuite);
    }
    toJson() {
        return utils_1.JsonTransformer.toJSON(this);
    }
    /**
     * The {@link ClaimFormat} of the presentation. For JSON-LD credentials this is always `ldp_vp`.
     */
    get claimFormat() {
        return models_1.ClaimFormat.LdpVp;
    }
    /**
     * Get the encoded variant of the W3C Verifiable Presentation. For JSON-LD presentations this is
     * a JSON object.
     */
    get encoded() {
        return this.toJson();
    }
}
__decorate([
    (0, ProofTransformer_1.ProofTransformer)(),
    (0, utils_1.IsInstanceOrArrayOfInstances)({ classType: [LinkedDataProof_1.LinkedDataProof, DataIntegrityProof_1.DataIntegrityProof] }),
    __metadata("design:type", Object)
], W3cJsonLdVerifiablePresentation.prototype, "proof", void 0);
exports.W3cJsonLdVerifiablePresentation = W3cJsonLdVerifiablePresentation;
//# sourceMappingURL=W3cJsonLdVerifiablePresentation.js.map