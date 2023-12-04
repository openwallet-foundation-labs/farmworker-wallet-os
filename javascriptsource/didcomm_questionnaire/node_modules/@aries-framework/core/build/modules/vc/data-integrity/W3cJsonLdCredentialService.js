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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.W3cJsonLdCredentialService = void 0;
const WalletKeyPair_1 = require("../../../crypto/WalletKeyPair");
const error_1 = require("../../../error");
const plugins_1 = require("../../../plugins");
const utils_1 = require("../../../utils");
const dids_1 = require("../../dids");
const key_type_1 = require("../../dids/domain/key-type");
const W3cCredentialsModuleConfig_1 = require("../W3cCredentialsModuleConfig");
const util_1 = require("../util");
const SignatureSuiteRegistry_1 = require("./SignatureSuiteRegistry");
const deriveProof_1 = require("./deriveProof");
const jsonldUtil_1 = require("./jsonldUtil");
const jsonld_1 = __importDefault(require("./libraries/jsonld"));
const vc_1 = __importDefault(require("./libraries/vc"));
const models_1 = require("./models");
const W3cJsonLdVerifiablePresentation_1 = require("./models/W3cJsonLdVerifiablePresentation");
/**
 * Supports signing and verification of credentials according to the [Verifiable Credential Data Model](https://www.w3.org/TR/vc-data-model)
 * using [Data Integrity Proof](https://www.w3.org/TR/vc-data-model/#data-integrity-proofs).
 */
let W3cJsonLdCredentialService = class W3cJsonLdCredentialService {
    constructor(signatureSuiteRegistry, w3cCredentialsModuleConfig) {
        this.signatureSuiteRegistry = signatureSuiteRegistry;
        this.w3cCredentialsModuleConfig = w3cCredentialsModuleConfig;
    }
    /**
     * Signs a credential
     */
    async signCredential(agentContext, options) {
        var _a;
        const WalletKeyPair = (0, WalletKeyPair_1.createWalletKeyPairClass)(agentContext.wallet);
        const signingKey = await this.getPublicKeyFromVerificationMethod(agentContext, options.verificationMethod);
        const suiteInfo = this.signatureSuiteRegistry.getByProofType(options.proofType);
        if (!suiteInfo.keyTypes.includes(signingKey.keyType)) {
            throw new error_1.AriesFrameworkError('The key type of the verification method does not match the suite');
        }
        const keyPair = new WalletKeyPair({
            controller: options.credential.issuerId,
            id: options.verificationMethod,
            key: signingKey,
            wallet: agentContext.wallet,
        });
        const SuiteClass = suiteInfo.suiteClass;
        const suite = new SuiteClass({
            key: keyPair,
            LDKeyClass: WalletKeyPair,
            proof: {
                verificationMethod: options.verificationMethod,
            },
            useNativeCanonize: false,
            date: (_a = options.created) !== null && _a !== void 0 ? _a : (0, util_1.w3cDate)(),
        });
        const result = await vc_1.default.issue({
            credential: utils_1.JsonTransformer.toJSON(options.credential),
            suite: suite,
            purpose: options.proofPurpose,
            documentLoader: this.w3cCredentialsModuleConfig.documentLoader(agentContext),
        });
        return utils_1.JsonTransformer.fromJSON(result, models_1.W3cJsonLdVerifiableCredential);
    }
    /**
     * Verifies the signature(s) of a credential
     *
     * @param credential the credential to be verified
     * @returns the verification result
     */
    async verifyCredential(agentContext, options) {
        var _a;
        try {
            const verifyCredentialStatus = (_a = options.verifyCredentialStatus) !== null && _a !== void 0 ? _a : true;
            const suites = this.getSignatureSuitesForCredential(agentContext, options.credential);
            const verifyOptions = {
                credential: utils_1.JsonTransformer.toJSON(options.credential),
                suite: suites,
                documentLoader: this.w3cCredentialsModuleConfig.documentLoader(agentContext),
                checkStatus: () => {
                    if (verifyCredentialStatus) {
                        throw new error_1.AriesFrameworkError('Verifying credential status for JSON-LD credentials is currently not supported');
                    }
                    return {
                        verified: true,
                    };
                },
            };
            // this is a hack because vcjs throws if purpose is passed as undefined or null
            if (options.proofPurpose) {
                verifyOptions['purpose'] = options.proofPurpose;
            }
            const result = await vc_1.default.verifyCredential(verifyOptions);
            const { verified: isValid } = result, remainingResult = __rest(result
            // We map the result to our own result type to make it easier to work with
            // however, for now we just add a single vcJs validation result as we don't
            // have access to the internal validation results of vc-js
            , ["verified"]);
            // We map the result to our own result type to make it easier to work with
            // however, for now we just add a single vcJs validation result as we don't
            // have access to the internal validation results of vc-js
            return {
                isValid,
                validations: {
                    vcJs: Object.assign({ isValid }, remainingResult),
                },
                error: result.error,
            };
        }
        catch (error) {
            return {
                isValid: false,
                validations: {},
                error,
            };
        }
    }
    /**
     * Signs a presentation including the credentials it includes
     *
     * @param presentation the presentation to be signed
     * @returns the signed presentation
     */
    async signPresentation(agentContext, options) {
        // create keyPair
        const WalletKeyPair = (0, WalletKeyPair_1.createWalletKeyPairClass)(agentContext.wallet);
        const suiteInfo = this.signatureSuiteRegistry.getByProofType(options.proofType);
        if (!suiteInfo) {
            throw new error_1.AriesFrameworkError(`The requested proofType ${options.proofType} is not supported`);
        }
        const signingKey = await this.getPublicKeyFromVerificationMethod(agentContext, options.verificationMethod);
        if (!suiteInfo.keyTypes.includes(signingKey.keyType)) {
            throw new error_1.AriesFrameworkError('The key type of the verification method does not match the suite');
        }
        const documentLoader = this.w3cCredentialsModuleConfig.documentLoader(agentContext);
        const verificationMethodObject = (await documentLoader(options.verificationMethod)).document;
        const keyPair = new WalletKeyPair({
            controller: verificationMethodObject['controller'],
            id: options.verificationMethod,
            key: signingKey,
            wallet: agentContext.wallet,
        });
        const suite = new suiteInfo.suiteClass({
            LDKeyClass: WalletKeyPair,
            proof: {
                verificationMethod: options.verificationMethod,
            },
            date: new Date().toISOString(),
            key: keyPair,
            useNativeCanonize: false,
        });
        const result = await vc_1.default.signPresentation({
            presentation: utils_1.JsonTransformer.toJSON(options.presentation),
            suite: suite,
            challenge: options.challenge,
            domain: options.domain,
            documentLoader: this.w3cCredentialsModuleConfig.documentLoader(agentContext),
        });
        return utils_1.JsonTransformer.fromJSON(result, W3cJsonLdVerifiablePresentation_1.W3cJsonLdVerifiablePresentation);
    }
    /**
     * Verifies a presentation including the credentials it includes
     *
     * @param presentation the presentation to be verified
     * @returns the verification result
     */
    async verifyPresentation(agentContext, options) {
        try {
            // create keyPair
            const WalletKeyPair = (0, WalletKeyPair_1.createWalletKeyPairClass)(agentContext.wallet);
            let proofs = options.presentation.proof;
            if (!Array.isArray(proofs)) {
                proofs = [proofs];
            }
            if (options.purpose) {
                proofs = proofs.filter((proof) => proof.proofPurpose === options.purpose.term);
            }
            const presentationSuites = proofs.map((proof) => {
                const SuiteClass = this.signatureSuiteRegistry.getByProofType(proof.type).suiteClass;
                return new SuiteClass({
                    LDKeyClass: WalletKeyPair,
                    proof: {
                        verificationMethod: proof.verificationMethod,
                    },
                    date: proof.created,
                    useNativeCanonize: false,
                });
            });
            const credentials = (0, utils_1.asArray)(options.presentation.verifiableCredential);
            (0, jsonldUtil_1.assertOnlyW3cJsonLdVerifiableCredentials)(credentials);
            const credentialSuites = credentials.map((credential) => this.getSignatureSuitesForCredential(agentContext, credential));
            const allSuites = presentationSuites.concat(...credentialSuites);
            const verifyOptions = {
                presentation: utils_1.JsonTransformer.toJSON(options.presentation),
                suite: allSuites,
                challenge: options.challenge,
                domain: options.domain,
                documentLoader: this.w3cCredentialsModuleConfig.documentLoader(agentContext),
            };
            // this is a hack because vcjs throws if purpose is passed as undefined or null
            if (options.purpose) {
                verifyOptions['presentationPurpose'] = options.purpose;
            }
            const result = await vc_1.default.verify(verifyOptions);
            const { verified: isValid } = result, remainingResult = __rest(result
            // We map the result to our own result type to make it easier to work with
            // however, for now we just add a single vcJs validation result as we don't
            // have access to the internal validation results of vc-js
            , ["verified"]);
            // We map the result to our own result type to make it easier to work with
            // however, for now we just add a single vcJs validation result as we don't
            // have access to the internal validation results of vc-js
            return {
                isValid,
                validations: {
                    vcJs: Object.assign({ isValid }, remainingResult),
                },
                error: result.error,
            };
        }
        catch (error) {
            return {
                isValid: false,
                validations: {},
                error,
            };
        }
    }
    async deriveProof(agentContext, options) {
        // TODO: make suite dynamic
        const suiteInfo = this.signatureSuiteRegistry.getByProofType('BbsBlsSignatureProof2020');
        const SuiteClass = suiteInfo.suiteClass;
        const suite = new SuiteClass();
        const proof = await (0, deriveProof_1.deriveProof)(utils_1.JsonTransformer.toJSON(options.credential), options.revealDocument, {
            suite: suite,
            documentLoader: this.w3cCredentialsModuleConfig.documentLoader(agentContext),
        });
        return proof;
    }
    getVerificationMethodTypesByProofType(proofType) {
        return this.signatureSuiteRegistry.getByProofType(proofType).verificationMethodTypes;
    }
    getKeyTypesByProofType(proofType) {
        return this.signatureSuiteRegistry.getByProofType(proofType).keyTypes;
    }
    getProofTypeByVerificationMethodType(verificationMethodType) {
        const suite = this.signatureSuiteRegistry.getByVerificationMethodType(verificationMethodType);
        if (!suite) {
            throw new error_1.AriesFrameworkError(`No suite found for verification method type ${verificationMethodType}}`);
        }
        return suite.proofType;
    }
    async getExpandedTypesForCredential(agentContext, credential) {
        // Get the expanded types
        const expandedTypes = (await jsonld_1.default.expand(utils_1.JsonTransformer.toJSON(credential), {
            documentLoader: this.w3cCredentialsModuleConfig.documentLoader(agentContext),
        }))[0]['@type'];
        return (0, utils_1.asArray)(expandedTypes);
    }
    async getPublicKeyFromVerificationMethod(agentContext, verificationMethod) {
        const documentLoader = this.w3cCredentialsModuleConfig.documentLoader(agentContext);
        const verificationMethodObject = await documentLoader(verificationMethod);
        const verificationMethodClass = utils_1.JsonTransformer.fromJSON(verificationMethodObject.document, dids_1.VerificationMethod);
        const key = (0, key_type_1.getKeyFromVerificationMethod)(verificationMethodClass);
        return key;
    }
    getSignatureSuitesForCredential(agentContext, credential) {
        const WalletKeyPair = (0, WalletKeyPair_1.createWalletKeyPairClass)(agentContext.wallet);
        let proofs = credential.proof;
        if (!Array.isArray(proofs)) {
            proofs = [proofs];
        }
        return proofs.map((proof) => {
            var _a;
            const SuiteClass = (_a = this.signatureSuiteRegistry.getByProofType(proof.type)) === null || _a === void 0 ? void 0 : _a.suiteClass;
            if (SuiteClass) {
                return new SuiteClass({
                    LDKeyClass: WalletKeyPair,
                    proof: {
                        verificationMethod: proof.verificationMethod,
                    },
                    date: proof.created,
                    useNativeCanonize: false,
                });
            }
        });
    }
};
W3cJsonLdCredentialService = __decorate([
    (0, plugins_1.injectable)(),
    __metadata("design:paramtypes", [SignatureSuiteRegistry_1.SignatureSuiteRegistry,
        W3cCredentialsModuleConfig_1.W3cCredentialsModuleConfig])
], W3cJsonLdCredentialService);
exports.W3cJsonLdCredentialService = W3cJsonLdCredentialService;
//# sourceMappingURL=W3cJsonLdCredentialService.js.map