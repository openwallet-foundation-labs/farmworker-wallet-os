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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignatureSuiteRegistry = exports.SignatureSuiteToken = void 0;
const error_1 = require("../../../error");
const plugins_1 = require("../../../plugins");
const jsonld_signatures_1 = require("./libraries/jsonld-signatures");
const LinkedDataSignature = jsonld_signatures_1.suites.LinkedDataSignature;
exports.SignatureSuiteToken = Symbol('SignatureSuiteToken');
let SignatureSuiteRegistry = class SignatureSuiteRegistry {
    constructor(suites) {
        this.suiteMapping = suites.filter((suite) => suite !== 'default');
    }
    get supportedProofTypes() {
        return this.suiteMapping.map((x) => x.proofType);
    }
    /**
     * @deprecated recommended to always search by key type instead as that will have broader support
     */
    getByVerificationMethodType(verificationMethodType) {
        return this.suiteMapping.find((x) => x.verificationMethodTypes.includes(verificationMethodType));
    }
    getAllByKeyType(keyType) {
        return this.suiteMapping.filter((x) => x.keyTypes.includes(keyType));
    }
    getByProofType(proofType) {
        const suiteInfo = this.suiteMapping.find((x) => x.proofType === proofType);
        if (!suiteInfo) {
            throw new error_1.CredoError(`No signature suite for proof type: ${proofType}`);
        }
        return suiteInfo;
    }
    getVerificationMethodTypesByProofType(proofType) {
        const suiteInfo = this.suiteMapping.find((suiteInfo) => suiteInfo.proofType === proofType);
        if (!suiteInfo) {
            throw new error_1.CredoError(`No verification method type found for proof type: ${proofType}`);
        }
        return suiteInfo.verificationMethodTypes;
    }
};
SignatureSuiteRegistry = __decorate([
    (0, plugins_1.injectable)(),
    __param(0, (0, plugins_1.injectAll)(exports.SignatureSuiteToken)),
    __metadata("design:paramtypes", [Array])
], SignatureSuiteRegistry);
exports.SignatureSuiteRegistry = SignatureSuiteRegistry;
//# sourceMappingURL=SignatureSuiteRegistry.js.map