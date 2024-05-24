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
exports.W3cJsonLdVerifiableCredential = void 0;
const class_validator_1 = require("class-validator");
const utils_1 = require("../../../../utils");
const ClaimFormat_1 = require("../../models/ClaimFormat");
const W3cCredential_1 = require("../../models/credential/W3cCredential");
const DataIntegrityProof_1 = require("./DataIntegrityProof");
const LinkedDataProof_1 = require("./LinkedDataProof");
const ProofTransformer_1 = require("./ProofTransformer");
class W3cJsonLdVerifiableCredential extends W3cCredential_1.W3cCredential {
    constructor(options) {
        super(options);
        if (options) {
            this.proof = (0, utils_1.mapSingleOrArray)(options.proof, (proof) => {
                if (proof.cryptosuite)
                    return new DataIntegrityProof_1.DataIntegrityProof(proof);
                else
                    return new LinkedDataProof_1.LinkedDataProof(proof);
            });
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
    static fromJson(json) {
        return utils_1.JsonTransformer.fromJSON(json, W3cJsonLdVerifiableCredential);
    }
    /**
     * The {@link ClaimFormat} of the credential. For JSON-LD credentials this is always `ldp_vc`.
     */
    get claimFormat() {
        return ClaimFormat_1.ClaimFormat.LdpVc;
    }
    /**
     * Get the encoded variant of the W3C Verifiable Credential. For JSON-LD credentials this is
     * a JSON object.
     */
    get encoded() {
        return this.toJson();
    }
    get jsonCredential() {
        return this.toJson();
    }
}
__decorate([
    (0, ProofTransformer_1.ProofTransformer)(),
    (0, utils_1.IsInstanceOrArrayOfInstances)({ classType: [LinkedDataProof_1.LinkedDataProof, DataIntegrityProof_1.DataIntegrityProof] }),
    (0, class_validator_1.ValidateNested)(),
    __metadata("design:type", Object)
], W3cJsonLdVerifiableCredential.prototype, "proof", void 0);
exports.W3cJsonLdVerifiableCredential = W3cJsonLdVerifiableCredential;
//# sourceMappingURL=W3cJsonLdVerifiableCredential.js.map