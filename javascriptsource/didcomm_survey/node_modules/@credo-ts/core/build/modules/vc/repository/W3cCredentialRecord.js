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
exports.W3cCredentialRecord = void 0;
const BaseRecord_1 = require("../../../storage/BaseRecord");
const utils_1 = require("../../../utils");
const uuid_1 = require("../../../utils/uuid");
const models_1 = require("../models");
class W3cCredentialRecord extends BaseRecord_1.BaseRecord {
    constructor(props) {
        var _a, _b;
        super();
        this.type = W3cCredentialRecord.type;
        if (props) {
            this.id = (_a = props.id) !== null && _a !== void 0 ? _a : (0, uuid_1.uuid)();
            this.createdAt = (_b = props.createdAt) !== null && _b !== void 0 ? _b : new Date();
            this._tags = props.tags;
            this.credential = props.credential;
        }
    }
    getTags() {
        // Contexts are usually strings, but can sometimes be objects. We're unable to use objects as tags,
        // so we filter out the objects before setting the tags.
        const stringContexts = this.credential.contexts.filter((ctx) => typeof ctx === 'string');
        const tags = Object.assign(Object.assign({}, this._tags), { issuerId: this.credential.issuerId, subjectIds: this.credential.credentialSubjectIds, schemaIds: this.credential.credentialSchemaIds, contexts: stringContexts, givenId: this.credential.id, claimFormat: this.credential.claimFormat, types: this.credential.type });
        // Proof types is used for ldp_vc credentials
        if (this.credential.claimFormat === models_1.ClaimFormat.LdpVc) {
            tags.proofTypes = this.credential.proofTypes;
            tags.cryptosuites = this.credential.dataIntegrityCryptosuites;
        }
        // Algs is used for jwt_vc credentials
        else if (this.credential.claimFormat === models_1.ClaimFormat.JwtVc) {
            tags.algs = [this.credential.jwt.header.alg];
        }
        return tags;
    }
    /**
     * This overwrites the default clone method for records
     * as the W3cRecord has issues with the default clone method
     * due to how W3cJwtVerifiableCredential is implemented. This is
     * a temporary way to make sure the clone still works, but ideally
     * we find an alternative.
     */
    clone() {
        return utils_1.JsonTransformer.fromJSON(utils_1.JsonTransformer.toJSON(this), this.constructor);
    }
}
W3cCredentialRecord.type = 'W3cCredentialRecord';
__decorate([
    (0, models_1.W3cVerifiableCredentialTransformer)(),
    __metadata("design:type", Object)
], W3cCredentialRecord.prototype, "credential", void 0);
exports.W3cCredentialRecord = W3cCredentialRecord;
//# sourceMappingURL=W3cCredentialRecord.js.map