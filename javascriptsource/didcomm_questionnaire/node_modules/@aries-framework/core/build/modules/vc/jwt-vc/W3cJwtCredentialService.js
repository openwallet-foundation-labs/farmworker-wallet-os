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
exports.W3cJwtCredentialService = void 0;
const crypto_1 = require("../../../crypto");
const jwk_1 = require("../../../crypto/jose/jwk");
const error_1 = require("../../../error");
const plugins_1 = require("../../../plugins");
const utils_1 = require("../../../utils");
const dids_1 = require("../../dids");
const data_integrity_1 = require("../data-integrity");
const W3cJwtVerifiableCredential_1 = require("./W3cJwtVerifiableCredential");
const W3cJwtVerifiablePresentation_1 = require("./W3cJwtVerifiablePresentation");
const credentialTransformer_1 = require("./credentialTransformer");
const presentationTransformer_1 = require("./presentationTransformer");
/**
 * Supports signing and verification of credentials according to the [Verifiable Credential Data Model](https://www.w3.org/TR/vc-data-model)
 * using [Json Web Tokens](https://www.w3.org/TR/vc-data-model/#json-web-token).
 */
let W3cJwtCredentialService = class W3cJwtCredentialService {
    constructor(jwsService) {
        this.hasWarned = false;
        this.jwsService = jwsService;
    }
    warnExperimentalOnce(agentContext) {
        if (this.hasWarned)
            return;
        // Warn about experimental module
        agentContext.config.logger.warn("The 'W3cJwtCredentialService' is experimental and could have unexpected breaking changes. When using this service, make sure to use strict versions for all @aries-framework packages.");
        this.hasWarned = true;
    }
    /**
     * Signs a credential
     */
    async signCredential(agentContext, options) {
        this.warnExperimentalOnce(agentContext);
        // Validate the instance
        utils_1.MessageValidator.validateSync(options.credential);
        // Get the JWT payload for the JWT based on the JWT Encoding rules form the VC-DATA-MODEL
        // https://www.w3.org/TR/vc-data-model/#jwt-encoding
        const jwtPayload = (0, credentialTransformer_1.getJwtPayloadFromCredential)(options.credential);
        if (!(0, utils_1.isDid)(options.verificationMethod)) {
            throw new error_1.AriesFrameworkError(`Only did identifiers are supported as verification method`);
        }
        const verificationMethod = await this.resolveVerificationMethod(agentContext, options.verificationMethod, [
            'assertionMethod',
        ]);
        const key = (0, dids_1.getKeyFromVerificationMethod)(verificationMethod);
        const jwt = await this.jwsService.createJwsCompact(agentContext, {
            payload: jwtPayload,
            key,
            protectedHeaderOptions: {
                typ: 'JWT',
                alg: options.alg,
                kid: options.verificationMethod,
            },
        });
        // TODO: this re-parses and validates the credential in the JWT, which is not necessary.
        // We should somehow create an instance of W3cJwtVerifiableCredential directly from the JWT
        const jwtVc = W3cJwtVerifiableCredential_1.W3cJwtVerifiableCredential.fromSerializedJwt(jwt);
        return jwtVc;
    }
    /**
     * Verifies the signature(s) of a credential
     *
     * @param credential the credential to be verified
     * @returns the verification result
     */
    async verifyCredential(agentContext, options) {
        var _a;
        this.warnExperimentalOnce(agentContext);
        // NOTE: this is mostly from the JSON-LD service that adds this option. Once we support
        // the same granular validation results, we can remove this and the user could just check
        // which of the validations failed. Supporting for consistency with the JSON-LD service for now.
        const verifyCredentialStatus = (_a = options.verifyCredentialStatus) !== null && _a !== void 0 ? _a : true;
        const validationResults = {
            isValid: false,
            validations: {},
        };
        try {
            let credential;
            try {
                // If instance is provided as input, we want to validate the credential (otherwise it's done in the fromSerializedJwt method below)
                if (options.credential instanceof W3cJwtVerifiableCredential_1.W3cJwtVerifiableCredential) {
                    utils_1.MessageValidator.validateSync(options.credential.credential);
                }
                credential =
                    options.credential instanceof W3cJwtVerifiableCredential_1.W3cJwtVerifiableCredential
                        ? options.credential
                        : W3cJwtVerifiableCredential_1.W3cJwtVerifiableCredential.fromSerializedJwt(options.credential);
                // Verify the JWT payload (verifies whether it's not expired, etc...)
                credential.jwt.payload.validate();
                validationResults.validations.dataModel = {
                    isValid: true,
                };
            }
            catch (error) {
                validationResults.validations.dataModel = {
                    isValid: false,
                    error,
                };
                return validationResults;
            }
            const issuerVerificationMethod = await this.getVerificationMethodForJwtCredential(agentContext, {
                credential,
                purpose: ['assertionMethod'],
            });
            const issuerPublicKey = (0, dids_1.getKeyFromVerificationMethod)(issuerVerificationMethod);
            const issuerPublicJwk = (0, jwk_1.getJwkFromKey)(issuerPublicKey);
            let signatureResult = undefined;
            try {
                // Verify the JWS signature
                signatureResult = await this.jwsService.verifyJws(agentContext, {
                    jws: credential.jwt.serializedJwt,
                    // We have pre-fetched the key based on the issuer/signer of the credential
                    jwkResolver: () => issuerPublicJwk,
                });
                if (!signatureResult.isValid) {
                    validationResults.validations.signature = {
                        isValid: false,
                        error: new error_1.AriesFrameworkError('Invalid JWS signature'),
                    };
                }
                else {
                    validationResults.validations.signature = {
                        isValid: true,
                    };
                }
            }
            catch (error) {
                validationResults.validations.signature = {
                    isValid: false,
                    error,
                };
            }
            // Validate whether the credential is signed with the 'issuer' id
            // NOTE: this uses the verificationMethod.controller. We may want to use the verificationMethod.id?
            if (credential.issuerId !== issuerVerificationMethod.controller) {
                validationResults.validations.issuerIsSigner = {
                    isValid: false,
                    error: new error_1.AriesFrameworkError(`Credential is signed using verification method ${issuerVerificationMethod.id}, while the issuer of the credential is '${credential.issuerId}'`),
                };
            }
            else {
                validationResults.validations.issuerIsSigner = {
                    isValid: true,
                };
            }
            // Validate whether the `issuer` of the credential is also the signer
            const issuerIsSigner = signatureResult === null || signatureResult === void 0 ? void 0 : signatureResult.signerKeys.some((signerKey) => signerKey.fingerprint === issuerPublicKey.fingerprint);
            if (!issuerIsSigner) {
                validationResults.validations.issuerIsSigner = {
                    isValid: false,
                    error: new error_1.AriesFrameworkError('Credential is not signed by the issuer of the credential'),
                };
            }
            else {
                validationResults.validations.issuerIsSigner = {
                    isValid: true,
                };
            }
            // Validate credentialStatus
            if (verifyCredentialStatus && !credential.credentialStatus) {
                validationResults.validations.credentialStatus = {
                    isValid: true,
                };
            }
            else if (verifyCredentialStatus && credential.credentialStatus) {
                validationResults.validations.credentialStatus = {
                    isValid: false,
                    error: new error_1.AriesFrameworkError('Verifying credential status is not supported for JWT VCs'),
                };
            }
            validationResults.isValid = Object.values(validationResults.validations).every((v) => v.isValid);
            return validationResults;
        }
        catch (error) {
            validationResults.error = error;
            return validationResults;
        }
    }
    /**
     * Signs a presentation including the credentials it includes
     *
     * @param presentation the presentation to be signed
     * @returns the signed presentation
     */
    async signPresentation(agentContext, options) {
        this.warnExperimentalOnce(agentContext);
        // Validate the instance
        utils_1.MessageValidator.validateSync(options.presentation);
        // Get the JWT payload for the JWT based on the JWT Encoding rules form the VC-DATA-MODEL
        // https://www.w3.org/TR/vc-data-model/#jwt-encoding
        const jwtPayload = (0, presentationTransformer_1.getJwtPayloadFromPresentation)(options.presentation);
        // Set the nonce so it's included in the signature
        jwtPayload.additionalClaims.nonce = options.challenge;
        jwtPayload.aud = options.domain;
        const verificationMethod = await this.resolveVerificationMethod(agentContext, options.verificationMethod, [
            'authentication',
        ]);
        const jwt = await this.jwsService.createJwsCompact(agentContext, {
            payload: jwtPayload,
            key: (0, dids_1.getKeyFromVerificationMethod)(verificationMethod),
            protectedHeaderOptions: {
                typ: 'JWT',
                alg: options.alg,
                kid: options.verificationMethod,
            },
        });
        // TODO: this re-parses and validates the presentation in the JWT, which is not necessary.
        // We should somehow create an instance of W3cJwtVerifiablePresentation directly from the JWT
        const jwtVp = W3cJwtVerifiablePresentation_1.W3cJwtVerifiablePresentation.fromSerializedJwt(jwt);
        return jwtVp;
    }
    /**
     * Verifies a presentation including the credentials it includes
     *
     * @param presentation the presentation to be verified
     * @returns the verification result
     */
    async verifyPresentation(agentContext, options) {
        this.warnExperimentalOnce(agentContext);
        const validationResults = {
            isValid: false,
            validations: {},
        };
        try {
            let presentation;
            try {
                // If instance is provided as input, we want to validate the presentation
                if (options.presentation instanceof W3cJwtVerifiablePresentation_1.W3cJwtVerifiablePresentation) {
                    utils_1.MessageValidator.validateSync(options.presentation.presentation);
                }
                presentation =
                    options.presentation instanceof W3cJwtVerifiablePresentation_1.W3cJwtVerifiablePresentation
                        ? options.presentation
                        : W3cJwtVerifiablePresentation_1.W3cJwtVerifiablePresentation.fromSerializedJwt(options.presentation);
                // Verify the JWT payload (verifies whether it's not expired, etc...)
                presentation.jwt.payload.validate();
                // Make sure challenge matches nonce
                if (options.challenge !== presentation.jwt.payload.additionalClaims.nonce) {
                    throw new error_1.AriesFrameworkError(`JWT payload 'nonce' does not match challenge '${options.challenge}'`);
                }
                const audArray = (0, utils_1.asArray)(presentation.jwt.payload.aud);
                if (options.domain && !audArray.includes(options.domain)) {
                    throw new error_1.AriesFrameworkError(`JWT payload 'aud' does not include domain '${options.domain}'`);
                }
                validationResults.validations.dataModel = {
                    isValid: true,
                };
            }
            catch (error) {
                validationResults.validations.dataModel = {
                    isValid: false,
                    error,
                };
                return validationResults;
            }
            const proverVerificationMethod = await this.getVerificationMethodForJwtCredential(agentContext, {
                credential: presentation,
                purpose: ['authentication'],
            });
            const proverPublicKey = (0, dids_1.getKeyFromVerificationMethod)(proverVerificationMethod);
            const proverPublicJwk = (0, jwk_1.getJwkFromKey)(proverPublicKey);
            let signatureResult = undefined;
            try {
                // Verify the JWS signature
                signatureResult = await this.jwsService.verifyJws(agentContext, {
                    jws: presentation.jwt.serializedJwt,
                    // We have pre-fetched the key based on the singer/holder of the presentation
                    jwkResolver: () => proverPublicJwk,
                });
                if (!signatureResult.isValid) {
                    validationResults.validations.presentationSignature = {
                        isValid: false,
                        error: new error_1.AriesFrameworkError('Invalid JWS signature on presentation'),
                    };
                }
                else {
                    validationResults.validations.presentationSignature = {
                        isValid: true,
                    };
                }
            }
            catch (error) {
                validationResults.validations.presentationSignature = {
                    isValid: false,
                    error,
                };
            }
            // Validate whether the presentation is signed with the 'holder' id
            // NOTE: this uses the verificationMethod.controller. We may want to use the verificationMethod.id?
            if (presentation.holderId && proverVerificationMethod.controller !== presentation.holderId) {
                validationResults.validations.holderIsSigner = {
                    isValid: false,
                    error: new error_1.AriesFrameworkError(`Presentation is signed using verification method ${proverVerificationMethod.id}, while the holder of the presentation is '${presentation.holderId}'`),
                };
            }
            else {
                // If no holderId is present, this validation passes by default as there can't be
                // a mismatch between the 'holder' property and the signer of the presentation.
                validationResults.validations.holderIsSigner = {
                    isValid: true,
                };
            }
            // To keep things simple, we only support JWT VCs in JWT VPs for now
            const credentials = (0, utils_1.asArray)(presentation.presentation.verifiableCredential);
            // Verify all credentials in parallel, and await the result
            validationResults.validations.credentials = await Promise.all(credentials.map(async (credential) => {
                if (credential instanceof data_integrity_1.W3cJsonLdVerifiableCredential) {
                    return {
                        isValid: false,
                        error: new error_1.AriesFrameworkError('Credential is of format ldp_vc. presentations in jwp_vp format can only contain credentials in jwt_vc format'),
                        validations: {},
                    };
                }
                const credentialResult = await this.verifyCredential(agentContext, {
                    credential,
                    verifyCredentialStatus: options.verifyCredentialStatus,
                });
                let credentialSubjectAuthentication;
                // Check whether any of the credentialSubjectIds for each credential is the same as the controller of the verificationMethod
                // This authenticates the presentation creator controls one of the credentialSubject ids.
                // NOTE: this doesn't take into account the case where the credentialSubject is no the holder. In the
                // future we can add support for other flows, but for now this is the most common use case.
                // TODO: should this be handled on a higher level? I don't really see it being handled in the jsonld lib
                // or in the did-jwt-vc lib (it seems they don't even verify the credentials itself), but we probably need some
                // more experience on the use cases before we loosen the restrictions (as it means we need to handle it on a higher layer).
                const credentialSubjectIds = credential.credentialSubjectIds;
                const presentationAuthenticatesCredentialSubject = credentialSubjectIds.some((subjectId) => proverVerificationMethod.controller === subjectId);
                if (credentialSubjectIds.length > 0 && !presentationAuthenticatesCredentialSubject) {
                    credentialSubjectAuthentication = {
                        isValid: false,
                        error: new error_1.AriesFrameworkError('Credential has one or more credentialSubject ids, but presentation does not authenticate credential subject'),
                    };
                }
                else {
                    credentialSubjectAuthentication = {
                        isValid: true,
                    };
                }
                return Object.assign(Object.assign({}, credentialResult), { isValid: credentialResult.isValid && credentialSubjectAuthentication.isValid, validations: Object.assign(Object.assign({}, credentialResult.validations), { credentialSubjectAuthentication }) });
            }));
            // Deeply nested check whether all validations have passed
            validationResults.isValid = Object.values(validationResults.validations).every((v) => Array.isArray(v) ? v.every((vv) => vv.isValid) : v.isValid);
            return validationResults;
        }
        catch (error) {
            validationResults.error = error;
            return validationResults;
        }
    }
    async resolveVerificationMethod(agentContext, verificationMethod, allowsPurposes) {
        const didResolver = agentContext.dependencyManager.resolve(dids_1.DidResolverService);
        const didDocument = await didResolver.resolveDidDocument(agentContext, verificationMethod);
        return didDocument.dereferenceKey(verificationMethod, allowsPurposes);
    }
    /**
     * This method tries to find the verification method associated with the JWT credential or presentation.
     * This verification method can then be used to verify the credential or presentation signature.
     *
     * The following methods are used to extract the verification method:
     *  - verification method is resolved based on the `kid` in the protected header
     *    - either as absolute reference (e.g. `did:example:123#key-1`)
     *    - or as relative reference to the `iss` of the JWT (e.g. `iss` is `did:example:123` and `kid` is `#key-1`)
     *  - the did document is resolved based on the `iss` field, after which the verification method is extracted based on the `alg`
     *    used to sign the JWT and the specified `purpose`. Only a single verification method may be present, and in all other cases,
     *    an error is thrown.
     *
     * The signer (`iss`) of the JWT is verified against the `controller` of the verificationMethod resolved in the did
     * document. This means if the `iss` of a credential is `did:example:123` and the controller of the verificationMethod
     * is `did:example:456`, an error is thrown to prevent the JWT from successfully being verified.
     *
     * In addition the JWT must conform to one of the following rules:
     *   - MUST be a credential and have an `iss` field and MAY have an absolute or relative `kid`
     *   - MUST not be a credential AND ONE of the following:
     *      - have an `iss` field and MAY have an absolute or relative `kid`
     *      - does not have an `iss` field and MUST have an absolute `kid`
     */
    async getVerificationMethodForJwtCredential(agentContext, options) {
        var _a, _b;
        const { credential, purpose } = options;
        const kid = credential.jwt.header.kid;
        const didResolver = agentContext.dependencyManager.resolve(dids_1.DidResolverService);
        // The signerId is the `holder` of the presentation or the `issuer` of the credential
        // For a credential only the `iss` COULD be enough to resolve the signer key (see method comments)
        const signerId = credential.jwt.payload.iss;
        let verificationMethod;
        // If the kid starts with # we assume it is a relative did url, and we resolve it based on the `iss` and the `kid`
        if (kid === null || kid === void 0 ? void 0 : kid.startsWith('#')) {
            if (!signerId) {
                throw new error_1.AriesFrameworkError(`JWT 'kid' MUST be absolute when when no 'iss' is present in JWT payload`);
            }
            const didDocument = await didResolver.resolveDidDocument(agentContext, signerId);
            verificationMethod = didDocument.dereferenceKey(`${signerId}${kid}`, purpose);
        }
        // this is a full did url (todo check if it contains a #)
        else if (kid && (0, utils_1.isDid)(kid)) {
            const didDocument = await didResolver.resolveDidDocument(agentContext, kid);
            verificationMethod = didDocument.dereferenceKey(kid, purpose);
            if (signerId && didDocument.id !== signerId) {
                throw new error_1.AriesFrameworkError(`kid '${kid}' does not match id of signer (holder/issuer) '${signerId}'`);
            }
        }
        else {
            if (!signerId) {
                throw new error_1.AriesFrameworkError(`JWT 'iss' MUST be present in payload when no 'kid' is specified`);
            }
            // Find the verificationMethod in the did document based on the alg and proofPurpose
            const jwkClass = (0, jwk_1.getJwkClassFromJwaSignatureAlgorithm)(credential.jwt.header.alg);
            if (!jwkClass)
                throw new error_1.AriesFrameworkError(`Unsupported JWT alg '${credential.jwt.header.alg}'`);
            const { supportedVerificationMethodTypes } = (0, dids_1.getKeyDidMappingByKeyType)(jwkClass.keyType);
            const didDocument = await didResolver.resolveDidDocument(agentContext, signerId);
            const verificationMethods = (_b = (_a = didDocument.assertionMethod) === null || _a === void 0 ? void 0 : _a.map((v) => (typeof v === 'string' ? didDocument.dereferenceVerificationMethod(v) : v)).filter((v) => supportedVerificationMethodTypes.includes(v.type))) !== null && _b !== void 0 ? _b : [];
            if (verificationMethods.length === 0) {
                throw new error_1.AriesFrameworkError(`No verification methods found for signer '${signerId}' and key type '${jwkClass.keyType}' for alg '${credential.jwt.header.alg}'. Unable to determine which public key is associated with the credential.`);
            }
            else if (verificationMethods.length > 1) {
                throw new error_1.AriesFrameworkError(`Multiple verification methods found for signer '${signerId}' and key type '${jwkClass.keyType}' for alg '${credential.jwt.header.alg}'. Unable to determine which public key is associated with the credential.`);
            }
            verificationMethod = verificationMethods[0];
        }
        // Verify the controller of the verificationMethod matches the signer of the credential
        if (signerId && verificationMethod.controller !== signerId) {
            throw new error_1.AriesFrameworkError(`Verification method controller '${verificationMethod.controller}' does not match the signer '${signerId}'`);
        }
        return verificationMethod;
    }
};
W3cJwtCredentialService = __decorate([
    (0, plugins_1.injectable)(),
    __metadata("design:paramtypes", [crypto_1.JwsService])
], W3cJwtCredentialService);
exports.W3cJwtCredentialService = W3cJwtCredentialService;
//# sourceMappingURL=W3cJwtCredentialService.js.map