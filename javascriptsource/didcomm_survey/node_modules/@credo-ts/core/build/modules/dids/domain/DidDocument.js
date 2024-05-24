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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findVerificationMethodByKeyType = exports.DidDocument = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const Key_1 = require("../../../crypto/Key");
const KeyType_1 = require("../../../crypto/KeyType");
const error_1 = require("../../../error");
const JsonTransformer_1 = require("../../../utils/JsonTransformer");
const transformers_1 = require("../../../utils/transformers");
const key_type_1 = require("./key-type");
const service_1 = require("./service");
const verificationMethod_1 = require("./verificationMethod");
class DidDocument {
    constructor(options) {
        var _a;
        this.context = ['https://w3id.org/did/v1'];
        if (options) {
            this.context = (_a = options.context) !== null && _a !== void 0 ? _a : this.context;
            this.id = options.id;
            this.alsoKnownAs = options.alsoKnownAs;
            this.controller = options.controller;
            this.verificationMethod = options.verificationMethod;
            this.service = options.service;
            this.authentication = options.authentication;
            this.assertionMethod = options.assertionMethod;
            this.keyAgreement = options.keyAgreement;
            this.capabilityInvocation = options.capabilityInvocation;
            this.capabilityDelegation = options.capabilityDelegation;
        }
    }
    dereferenceVerificationMethod(keyId) {
        var _a;
        // TODO: once we use JSON-LD we should use that to resolve references in did documents.
        // for now we check whether the key id ends with the keyId.
        // so if looking for #123 and key.id is did:key:123#123, it is valid. But #123 as key.id is also valid
        const verificationMethod = (_a = this.verificationMethod) === null || _a === void 0 ? void 0 : _a.find((key) => key.id.endsWith(keyId));
        if (!verificationMethod) {
            throw new error_1.CredoError(`Unable to locate verification method with id '${keyId}'`);
        }
        return verificationMethod;
    }
    dereferenceKey(keyId, allowedPurposes) {
        var _a;
        const allPurposes = [
            'authentication',
            'keyAgreement',
            'assertionMethod',
            'capabilityInvocation',
            'capabilityDelegation',
            'verificationMethod',
        ];
        const purposes = allowedPurposes !== null && allowedPurposes !== void 0 ? allowedPurposes : allPurposes;
        for (const purpose of purposes) {
            for (const key of (_a = this[purpose]) !== null && _a !== void 0 ? _a : []) {
                if (typeof key === 'string' && key.endsWith(keyId)) {
                    return this.dereferenceVerificationMethod(key);
                }
                else if (typeof key !== 'string' && key.id.endsWith(keyId)) {
                    return key;
                }
            }
        }
        throw new error_1.CredoError(`Unable to locate verification method with id '${keyId}' in purposes ${purposes}`);
    }
    /**
     * Returns all of the service endpoints matching the given type.
     *
     * @param type The type of service(s) to query.
     */
    getServicesByType(type) {
        var _a, _b;
        return ((_b = (_a = this.service) === null || _a === void 0 ? void 0 : _a.filter((service) => service.type === type)) !== null && _b !== void 0 ? _b : []);
    }
    /**
     * Returns all of the service endpoints matching the given class
     *
     * @param classType The class to query services.
     */
    getServicesByClassType(classType) {
        var _a, _b;
        return ((_b = (_a = this.service) === null || _a === void 0 ? void 0 : _a.filter((service) => service instanceof classType)) !== null && _b !== void 0 ? _b : []);
    }
    /**
     * Get all DIDComm services ordered by priority descending. This means the highest
     * priority will be the first entry.
     */
    get didCommServices() {
        var _a, _b;
        const didCommServiceTypes = [service_1.IndyAgentService.type, service_1.DidCommV1Service.type];
        const services = ((_b = (_a = this.service) === null || _a === void 0 ? void 0 : _a.filter((service) => didCommServiceTypes.includes(service.type))) !== null && _b !== void 0 ? _b : []);
        // Sort services based on indicated priority
        return services.sort((a, b) => a.priority - b.priority);
    }
    // TODO: it would probably be easier if we add a utility to each service so we don't have to handle logic for all service types here
    get recipientKeys() {
        let recipientKeys = [];
        for (const service of this.didCommServices) {
            if (service.type === service_1.IndyAgentService.type) {
                recipientKeys = [
                    ...recipientKeys,
                    ...service.recipientKeys.map((publicKeyBase58) => Key_1.Key.fromPublicKeyBase58(publicKeyBase58, KeyType_1.KeyType.Ed25519)),
                ];
            }
            else if (service.type === service_1.DidCommV1Service.type) {
                recipientKeys = [
                    ...recipientKeys,
                    ...service.recipientKeys.map((recipientKey) => (0, key_type_1.getKeyFromVerificationMethod)(this.dereferenceKey(recipientKey, ['authentication', 'keyAgreement']))),
                ];
            }
        }
        return recipientKeys;
    }
    toJSON() {
        return JsonTransformer_1.JsonTransformer.toJSON(this);
    }
}
__decorate([
    (0, class_transformer_1.Expose)({ name: '@context' }),
    (0, transformers_1.IsStringOrStringArray)(),
    __metadata("design:type", Object)
], DidDocument.prototype, "context", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DidDocument.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], DidDocument.prototype, "alsoKnownAs", void 0);
__decorate([
    (0, transformers_1.IsStringOrStringArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], DidDocument.prototype, "controller", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => verificationMethod_1.VerificationMethod),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], DidDocument.prototype, "verificationMethod", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, service_1.ServiceTransformer)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], DidDocument.prototype, "service", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, verificationMethod_1.VerificationMethodTransformer)(),
    (0, verificationMethod_1.IsStringOrVerificationMethod)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], DidDocument.prototype, "authentication", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, verificationMethod_1.VerificationMethodTransformer)(),
    (0, verificationMethod_1.IsStringOrVerificationMethod)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], DidDocument.prototype, "assertionMethod", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, verificationMethod_1.VerificationMethodTransformer)(),
    (0, verificationMethod_1.IsStringOrVerificationMethod)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], DidDocument.prototype, "keyAgreement", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, verificationMethod_1.VerificationMethodTransformer)(),
    (0, verificationMethod_1.IsStringOrVerificationMethod)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], DidDocument.prototype, "capabilityInvocation", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, verificationMethod_1.VerificationMethodTransformer)(),
    (0, verificationMethod_1.IsStringOrVerificationMethod)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], DidDocument.prototype, "capabilityDelegation", void 0);
exports.DidDocument = DidDocument;
/**
 * Extracting the verification method for signature type
 * @param type Signature type
 * @param didDocument DidDocument
 * @returns verification method
 */
async function findVerificationMethodByKeyType(keyType, didDocument) {
    var _a, e_1, _b, _c, _d, e_2, _e, _f;
    const didVerificationMethods = [
        'verificationMethod',
        'authentication',
        'keyAgreement',
        'assertionMethod',
        'capabilityInvocation',
        'capabilityDelegation',
    ];
    try {
        for (var _g = true, didVerificationMethods_1 = __asyncValues(didVerificationMethods), didVerificationMethods_1_1; didVerificationMethods_1_1 = await didVerificationMethods_1.next(), _a = didVerificationMethods_1_1.done, !_a;) {
            _c = didVerificationMethods_1_1.value;
            _g = false;
            try {
                const purpose = _c;
                const key = didDocument[purpose];
                if (key instanceof Array) {
                    try {
                        for (var _h = true, key_1 = (e_2 = void 0, __asyncValues(key)), key_1_1; key_1_1 = await key_1.next(), _d = key_1_1.done, !_d;) {
                            _f = key_1_1.value;
                            _h = false;
                            try {
                                const method = _f;
                                if (typeof method !== 'string') {
                                    if (method.type === keyType) {
                                        return method;
                                    }
                                }
                            }
                            finally {
                                _h = true;
                            }
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (!_h && !_d && (_e = key_1.return)) await _e.call(key_1);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                }
            }
            finally {
                _g = true;
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (!_g && !_a && (_b = didVerificationMethods_1.return)) await _b.call(didVerificationMethods_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return null;
}
exports.findVerificationMethodByKeyType = findVerificationMethodByKeyType;
//# sourceMappingURL=DidDocument.js.map