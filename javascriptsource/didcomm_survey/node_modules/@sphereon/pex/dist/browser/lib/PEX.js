"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PEX = void 0;
const ssi_types_1 = require("@sphereon/ssi-types");
const ConstraintUtils_1 = require("./ConstraintUtils");
const evaluation_1 = require("./evaluation");
const signing_1 = require("./signing");
const types_1 = require("./types");
const utils_1 = require("./utils");
const validation_1 = require("./validation");
/**
 * This is the main interfacing class to be used by developers using the PEX library.
 */
class PEX {
    constructor(options) {
        // TODO:  So we have state in the form of this property which is set in the constructor, but we are overwriting it elsewhere. We need to retrhink how to instantiate PEX
        this._evaluationClientWrapper = new evaluation_1.EvaluationClientWrapper();
        this.options = options;
    }
    /***
     * The evaluatePresentation compares what is expected from a presentation with a presentationDefinition.
     * presentationDefinition: It can be either v1 or v2 of presentationDefinition
     *
     * @param presentationDefinition the definition of what is expected in the presentation.
     * @param presentation the presentation which has to be evaluated in comparison of the definition.
     * @param opts - limitDisclosureSignatureSuites the credential signature suites that support limit disclosure
     *
     * @return the evaluation results specify what was expected and was fulfilled and also specifies which requirements described in the input descriptors
     * were not fulfilled by the presentation.
     */
    evaluatePresentation(presentationDefinition, presentation, opts) {
        var _a, _b, _c;
        const generatePresentationSubmission = (opts === null || opts === void 0 ? void 0 : opts.generatePresentationSubmission) !== undefined ? opts.generatePresentationSubmission : (opts === null || opts === void 0 ? void 0 : opts.presentationSubmission) === undefined;
        const pd = types_1.SSITypesBuilder.toInternalPresentationDefinition(presentationDefinition);
        const presentationCopy = JSON.parse(JSON.stringify(presentation));
        const wrappedPresentation = types_1.SSITypesBuilder.mapExternalVerifiablePresentationToWrappedVP(presentationCopy, (_a = this.options) === null || _a === void 0 ? void 0 : _a.hasher);
        const presentationSubmission = (_b = opts === null || opts === void 0 ? void 0 : opts.presentationSubmission) !== null && _b !== void 0 ? _b : wrappedPresentation.decoded.presentation_submission;
        if (!presentationSubmission && !generatePresentationSubmission) {
            throw Error(`Either a presentation submission as part of the VP or provided separately was expected`);
        }
        // TODO: we should probably add support for holder dids in the kb-jwt of an SD-JWT. We can extract this from the
        // `wrappedPresentation.original.compactKbJwt`, but as HAIP doesn't use dids, we'll leave it for now.
        const holderDIDs = ssi_types_1.CredentialMapper.isW3cPresentation(wrappedPresentation.presentation) && wrappedPresentation.presentation.holder
            ? [wrappedPresentation.presentation.holder]
            : [];
        const updatedOpts = Object.assign(Object.assign({}, opts), { holderDIDs,
            presentationSubmission,
            generatePresentationSubmission });
        const result = this._evaluationClientWrapper.evaluate(pd, wrappedPresentation.vcs, updatedOpts);
        if ((_c = result.value) === null || _c === void 0 ? void 0 : _c.descriptor_map.length) {
            const selectFromClientWrapper = new evaluation_1.EvaluationClientWrapper();
            const selectResults = selectFromClientWrapper.selectFrom(pd, wrappedPresentation.vcs, updatedOpts);
            if (selectResults.areRequiredCredentialsPresent !== ConstraintUtils_1.Status.ERROR) {
                result.errors = [];
            }
        }
        return result;
    }
    /***
     * The evaluate compares what is expected from a verifiableCredentials with the presentationDefinition.
     *
     * @param presentationDefinition the v1 or v2 definition of what is expected in the presentation.
     * @param verifiableCredentials the verifiable credentials which are candidates to fulfill requirements defined in the presentationDefinition param.
     * @param opts - holderDIDs the list of the DIDs that the wallet holders controls. Optional, but needed by some input requirements that do a holderDID check.
     * @           - limitDisclosureSignatureSuites the credential signature suites that support limit disclosure
     *
     * @return the evaluation results specify what was expected and was fulfilled and also specifies which requirements described in the input descriptors
     * were not fulfilled by the verifiable credentials.
     */
    evaluateCredentials(presentationDefinition, verifiableCredentials, opts) {
        var _a;
        const wrappedVerifiableCredentials = types_1.SSITypesBuilder.mapExternalVerifiableCredentialsToWrappedVcs(verifiableCredentials, (_a = this.options) === null || _a === void 0 ? void 0 : _a.hasher);
        // TODO:  So we have state in the form of this property which is set in the constructor, but we are overwriting it here. We need to retrhink how to instantiate PEX
        this._evaluationClientWrapper = new evaluation_1.EvaluationClientWrapper();
        const pd = types_1.SSITypesBuilder.toInternalPresentationDefinition(presentationDefinition);
        const result = this._evaluationClientWrapper.evaluate(pd, wrappedVerifiableCredentials, opts);
        if (result.value && result.value.descriptor_map.length) {
            const selectFromClientWrapper = new evaluation_1.EvaluationClientWrapper();
            const selectResults = selectFromClientWrapper.selectFrom(pd, wrappedVerifiableCredentials, opts);
            result.areRequiredCredentialsPresent = selectResults.areRequiredCredentialsPresent;
            result.errors = selectResults.errors;
        }
        else {
            result.areRequiredCredentialsPresent = ConstraintUtils_1.Status.ERROR;
        }
        return result;
    }
    /**
     * The selectFrom method is a helper function that helps filter out the verifiable credentials which can not be selected and returns
     * the selectable credentials.
     *
     * @param presentationDefinition the v1 or v2 definition of what is expected in the presentation.
     * @param verifiableCredentials verifiable credentials are the credentials from wallet provided to the library to find selectable credentials.
     * @param opts - holderDIDs the decentralized identifier(s) of the wallet holderDID. This is used to identify the credentials issued to the holderDID of wallet in certain scenario's.
     *             - limitDisclosureSignatureSuites the credential signature suites that support limit disclosure
     *
     * @return the selectable credentials.
     */
    selectFrom(presentationDefinition, verifiableCredentials, opts) {
        var _a;
        const verifiableCredentialCopy = JSON.parse(JSON.stringify(verifiableCredentials));
        const pd = types_1.SSITypesBuilder.toInternalPresentationDefinition(presentationDefinition);
        // TODO:  So we have state in the form of this property which is set in the constructor, but we are overwriting it here. We need to retrhink how to instantiate PEX
        this._evaluationClientWrapper = new evaluation_1.EvaluationClientWrapper();
        return this._evaluationClientWrapper.selectFrom(pd, types_1.SSITypesBuilder.mapExternalVerifiableCredentialsToWrappedVcs(verifiableCredentialCopy, (_a = this.options) === null || _a === void 0 ? void 0 : _a.hasher), opts);
    }
    presentationSubmissionFrom(presentationDefinition, selectedCredentials, opts) {
        var _a;
        const pd = types_1.SSITypesBuilder.toInternalPresentationDefinition(presentationDefinition);
        return this._evaluationClientWrapper.submissionFrom(pd, types_1.SSITypesBuilder.mapExternalVerifiableCredentialsToWrappedVcs(selectedCredentials, (_a = this.options) === null || _a === void 0 ? void 0 : _a.hasher), opts);
    }
    /**
     * This method helps create an Unsigned Presentation. An Unsigned Presentation after signing becomes a Presentation. And can be sent to
     * the verifier after signing it.
     *
     * @param presentationDefinition the v1 or v2 definition of what is expected in the presentation.
     * @param selectedCredentials the credentials which were declared selectable by getSelectableCredentials and then chosen by the intelligent-user
     * (e.g. human).
     * @param opts - holderDID optional; the decentralized identity of the wallet holderDID. This is used to identify the holderDID of the presentation.
     *
     * @return the presentation.
     */
    presentationFrom(presentationDefinition, selectedCredentials, opts) {
        var _a, _b;
        const presentationSubmission = this.presentationSubmissionFrom(presentationDefinition, selectedCredentials, opts);
        const hasSdJwtCredentials = selectedCredentials.some((c) => ssi_types_1.CredentialMapper.isSdJwtDecodedCredential(c) || ssi_types_1.CredentialMapper.isSdJwtEncoded(c));
        // We could include it in the KB-JWT? Not sure if we want that
        if ((opts === null || opts === void 0 ? void 0 : opts.presentationSubmissionLocation) === signing_1.PresentationSubmissionLocation.PRESENTATION && hasSdJwtCredentials) {
            throw new Error('Presentation submission location cannot be set to presentation when creating a presentation with an SD-JWT VC');
        }
        const presentationSubmissionLocation = (_a = opts === null || opts === void 0 ? void 0 : opts.presentationSubmissionLocation) !== null && _a !== void 0 ? _a : (hasSdJwtCredentials ? signing_1.PresentationSubmissionLocation.EXTERNAL : signing_1.PresentationSubmissionLocation.PRESENTATION);
        const presentation = PEX.constructPresentation(selectedCredentials, Object.assign(Object.assign({}, opts), { 
            // We only pass in the submission in case it needs to be included in the presentation
            presentationSubmission: presentationSubmissionLocation === signing_1.PresentationSubmissionLocation.PRESENTATION ? presentationSubmission : undefined, hasher: (_b = this.options) === null || _b === void 0 ? void 0 : _b.hasher }));
        return {
            presentation,
            presentationSubmissionLocation,
            presentationSubmission,
        };
    }
    static constructPresentation(selectedCredentials, opts) {
        var _a, _b, _c, _d;
        const credentials = Array.isArray(selectedCredentials) ? selectedCredentials : [selectedCredentials];
        // for SD-JWT we want to return the SD-JWT with only the needed disclosures (so filter disclosures array, and update the compactSdJwt)
        // in addition we want to create the KB-JWT payload as well.
        // FIXME: include the KB-JWT payload?
        if (credentials.some((c) => ssi_types_1.CredentialMapper.isSdJwtDecodedCredential(c) || ssi_types_1.CredentialMapper.isSdJwtEncoded(c))) {
            if (credentials.length > 1) {
                // Until there's some consensus around the following issue, we'll only support a single
                // SD-JWT credential in a presentation
                // https://github.com/decentralized-identity/presentation-exchange/issues/462
                throw new Error('Only a single credential is supported when creating a presentation with an SD-JWT VC');
            }
            if (opts === null || opts === void 0 ? void 0 : opts.presentationSubmission) {
                throw new Error('Presentation submission cannot be included in the presentation when creating a presentation with an SD-JWT VC');
            }
            if (opts === null || opts === void 0 ? void 0 : opts.basePresentationPayload) {
                throw new Error('Base presentation payload cannot be when creating a presentation from an SD-JWT VC');
            }
            // NOTE: we assume the credential already has selective disclosure applied, even if it is encoded. Is
            // that a valid assumption? It seems to be this way for BBS SD as well
            const decoded = (ssi_types_1.CredentialMapper.isSdJwtEncoded(credentials[0]) ? ssi_types_1.CredentialMapper.decodeVerifiableCredential(credentials[0], opts === null || opts === void 0 ? void 0 : opts.hasher) : credentials[0]);
            if (!(opts === null || opts === void 0 ? void 0 : opts.hasher)) {
                throw new Error('Hasher must be provided when creating a presentation with an SD-JWT VC');
            }
            // extract sd_alg or default to sha-256
            const hashAlg = (_a = decoded.signedPayload._sd_alg) !== null && _a !== void 0 ? _a : 'sha-256';
            const sdHash = (0, utils_1.calculateSdHash)(decoded.compactSdJwtVc, hashAlg, opts.hasher);
            const kbJwt = {
                // alg MUST be set by the signer
                header: {
                    typ: 'kb+jwt',
                },
                // aud MUST be set by the signer or provided by e.g. SIOP/OpenID4VP lib
                payload: {
                    iat: new Date().getTime(),
                    _sd_hash: sdHash,
                },
            };
            return Object.assign(Object.assign({}, decoded), { kbJwt });
        }
        else {
            if (!selectedCredentials) {
                throw Error(`At least a verifiable credential needs to be passed in to create a presentation`);
            }
            const verifiableCredential = (Array.isArray(selectedCredentials) ? selectedCredentials : [selectedCredentials]);
            const wVCs = verifiableCredential.map((vc) => ssi_types_1.CredentialMapper.toWrappedVerifiableCredential(vc));
            const holders = Array.from(new Set(wVCs.flatMap((wvc) => (0, utils_1.getSubjectIdsAsString)(wvc.credential))));
            if (holders.length !== 1 && !(opts === null || opts === void 0 ? void 0 : opts.holderDID)) {
                console.log(`We deduced ${holders.length} subject from ${wVCs.length} Verifiable Credentials, and no holder property was given. This might lead to undesired results`);
            }
            const holder = (_b = opts === null || opts === void 0 ? void 0 : opts.holderDID) !== null && _b !== void 0 ? _b : (holders.length === 1 ? holders[0] : undefined);
            const type = ((_c = opts === null || opts === void 0 ? void 0 : opts.basePresentationPayload) === null || _c === void 0 ? void 0 : _c.type)
                ? Array.isArray(opts.basePresentationPayload.type)
                    ? opts.basePresentationPayload.type
                    : [opts.basePresentationPayload.type]
                : [];
            if (!type.includes('VerifiablePresentation')) {
                type.push('VerifiablePresentation');
            }
            const context = ((_d = opts === null || opts === void 0 ? void 0 : opts.basePresentationPayload) === null || _d === void 0 ? void 0 : _d['@context'])
                ? Array.isArray(opts.basePresentationPayload['@context'])
                    ? opts.basePresentationPayload['@context']
                    : [opts.basePresentationPayload['@context']]
                : [];
            if (!context.includes('https://www.w3.org/2018/credentials/v1')) {
                context.push('https://www.w3.org/2018/credentials/v1');
            }
            if (opts === null || opts === void 0 ? void 0 : opts.presentationSubmission) {
                if (!type.includes('PresentationSubmission')) {
                    type.push('PresentationSubmission');
                }
                if (!context.includes('https://identity.foundation/presentation-exchange/submission/v1')) {
                    context.push('https://identity.foundation/presentation-exchange/submission/v1');
                }
            }
            return Object.assign(Object.assign(Object.assign(Object.assign({}, opts === null || opts === void 0 ? void 0 : opts.basePresentationPayload), { '@context': context, type,
                holder }), (!!(opts === null || opts === void 0 ? void 0 : opts.presentationSubmission) && { presentation_submission: opts.presentationSubmission })), { verifiableCredential });
        }
    }
    /**
     * This method validates whether an object is usable as a presentation definition or not.
     *
     * @param presentationDefinition presentationDefinition of V1 or v2 to be validated.
     *
     * @return the validation results to reveal what is acceptable/unacceptable about the passed object to be considered a valid presentation definition
     */
    static validateDefinition(presentationDefinition) {
        const result = (0, utils_1.definitionVersionDiscovery)(presentationDefinition);
        if (result.error) {
            throw new Error(result.error);
        }
        const validators = [];
        result.version === types_1.PEVersion.v1
            ? validators.push({
                bundler: new validation_1.PresentationDefinitionV1VB('root'),
                target: types_1.SSITypesBuilder.modelEntityToInternalPresentationDefinitionV1(presentationDefinition),
            })
            : validators.push({
                bundler: new validation_1.PresentationDefinitionV2VB('root'),
                target: types_1.SSITypesBuilder.modelEntityInternalPresentationDefinitionV2(presentationDefinition),
            });
        return new validation_1.ValidationEngine().validate(validators);
    }
    /**
     * This method validates whether an object is usable as a presentation submission or not.
     *
     * @param presentationSubmission the object to be validated.
     *
     * @return the validation results to reveal what is acceptable/unacceptable about the passed object to be considered a valid presentation submission
     */
    static validateSubmission(presentationSubmission) {
        return new validation_1.ValidationEngine().validate([
            {
                bundler: new validation_1.PresentationSubmissionVB('root'),
                target: presentationSubmission,
            },
        ]);
    }
    /**
     * This method can be used to combine a definition, selected Verifiable Credentials, together with
     * signing opts and a callback to sign a presentation, making it a Verifiable Presentation before sending.
     *
     * Please note that PEX has no signature support on purpose. We didn't want this library to depend on all kinds of signature suites.
     * The callback function next to the Signing Params also gets a Presentation which is evaluated against the definition.
     * It is up to you to decide whether you simply update the supplied partial proof and add it to the presentation in the callback,
     * or whether you will use the selected Credentials, Presentation definition, evaluation results and/or presentation submission together with the signature opts
     *
     * @param presentationDefinition the Presentation Definition V1 or V2
     * @param selectedCredentials the PEX and/or User selected/filtered credentials that will become part of the Verifiable Presentation
     * @param signingCallBack the function which will be provided as a parameter. And this will be the method that will be able to perform actual
     *        signing. One example of signing is available in the project named. pe-selective-disclosure.
     * @param opts Signing Params these are the signing params required to sign.
     *
     * @return the signed and thus Verifiable Presentation.
     */
    verifiablePresentationFrom(presentationDefinition, selectedCredentials, signingCallBack, opts) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const { holderDID, signatureOptions, proofOptions } = opts;
            function limitedDisclosureSuites() {
                let limitDisclosureSignatureSuites = [];
                if (proofOptions === null || proofOptions === void 0 ? void 0 : proofOptions.typeSupportsSelectiveDisclosure) {
                    if (!(proofOptions === null || proofOptions === void 0 ? void 0 : proofOptions.type)) {
                        throw Error('Please provide a proof type if you enable selective disclosure');
                    }
                    limitDisclosureSignatureSuites = [proofOptions.type];
                }
                return limitDisclosureSignatureSuites;
            }
            const holderDIDs = holderDID ? [holderDID] : [];
            const limitDisclosureSignatureSuites = limitedDisclosureSuites();
            const evaluationResult = this.evaluateCredentials(presentationDefinition, selectedCredentials, {
                holderDIDs,
                limitDisclosureSignatureSuites,
            });
            const presentationResult = this.presentationFrom(presentationDefinition, evaluationResult.verifiableCredential, opts);
            const evaluationResults = this.evaluatePresentation(presentationDefinition, presentationResult.presentation, Object.assign({ limitDisclosureSignatureSuites }, (presentationResult.presentationSubmissionLocation === signing_1.PresentationSubmissionLocation.EXTERNAL && {
                presentationSubmission: presentationResult.presentationSubmission,
            })));
            if (!evaluationResults.value) {
                throw new Error('Could not get evaluation results from presentationResult');
            }
            const proof = {
                type: proofOptions === null || proofOptions === void 0 ? void 0 : proofOptions.type,
                verificationMethod: signatureOptions === null || signatureOptions === void 0 ? void 0 : signatureOptions.verificationMethod,
                created: (proofOptions === null || proofOptions === void 0 ? void 0 : proofOptions.created) ? proofOptions.created : new Date().toISOString(),
                proofPurpose: proofOptions === null || proofOptions === void 0 ? void 0 : proofOptions.proofPurpose,
                proofValue: signatureOptions === null || signatureOptions === void 0 ? void 0 : signatureOptions.proofValue,
                jws: signatureOptions === null || signatureOptions === void 0 ? void 0 : signatureOptions.jws,
                challenge: proofOptions === null || proofOptions === void 0 ? void 0 : proofOptions.challenge,
                nonce: proofOptions === null || proofOptions === void 0 ? void 0 : proofOptions.nonce,
                domain: proofOptions === null || proofOptions === void 0 ? void 0 : proofOptions.domain,
            };
            let presentation = presentationResult.presentation;
            if (ssi_types_1.CredentialMapper.isSdJwtDecodedCredential(presentationResult.presentation)) {
                if (!((_a = this.options) === null || _a === void 0 ? void 0 : _a.hasher)) {
                    throw new Error('Hasher must be provided when creating a presentation with an SD-JWT VC');
                }
                // extract sd_alg or default to sha-256
                const hashAlg = (_b = presentationResult.presentation.signedPayload._sd_alg) !== null && _b !== void 0 ? _b : 'sha-256';
                const sdHash = (0, utils_1.calculateSdHash)(presentationResult.presentation.compactSdJwtVc, hashAlg, this.options.hasher);
                const kbJwt = {
                    // alg MUST be set by the signer
                    header: {
                        typ: 'kb+jwt',
                    },
                    // aud MUST be set by the signer or provided by e.g. SIOP/OpenID4VP lib
                    payload: {
                        iat: new Date().getTime(),
                        nonce: proofOptions === null || proofOptions === void 0 ? void 0 : proofOptions.nonce,
                        _sd_hash: sdHash,
                    },
                };
                presentation = Object.assign(Object.assign({}, presentation), { kbJwt });
            }
            const callBackParams = {
                options: Object.assign(Object.assign({}, opts), { presentationSubmissionLocation: presentationResult.presentationSubmissionLocation }),
                presentation,
                presentationDefinition,
                selectedCredentials,
                proof,
                presentationSubmission: evaluationResults.value,
                evaluationResults,
            };
            const verifiablePresentation = yield signingCallBack(callBackParams);
            return {
                verifiablePresentation,
                presentationSubmissionLocation: presentationResult.presentationSubmissionLocation,
                presentationSubmission: evaluationResults.value,
            };
        });
    }
    static definitionVersionDiscovery(presentationDefinition) {
        return (0, utils_1.definitionVersionDiscovery)(presentationDefinition);
    }
}
exports.PEX = PEX;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUEVYLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL1BFWC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFDQSxtREFlNkI7QUFFN0IsdURBQTJDO0FBQzNDLDZDQUF5RjtBQUN6Rix1Q0FTbUI7QUFDbkIsbUNBQWtJO0FBQ2xJLG1DQUE2RjtBQUM3Riw2Q0FBNkk7QUFjN0k7O0dBRUc7QUFDSCxNQUFhLEdBQUc7SUFJZCxZQUFZLE9BQW9CO1FBQzlCLHdLQUF3SztRQUN4SyxJQUFJLENBQUMsd0JBQXdCLEdBQUcsSUFBSSxvQ0FBdUIsRUFBRSxDQUFDO1FBRTlELElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0lBQ3pCLENBQUM7SUFFRDs7Ozs7Ozs7OztPQVVHO0lBQ0ksb0JBQW9CLENBQ3pCLHNCQUErQyxFQUMvQyxZQUE0RCxFQUM1RCxJQU1DOztRQUVELE1BQU0sOEJBQThCLEdBQ2xDLENBQUEsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLDhCQUE4QixNQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLDhCQUE4QixDQUFDLENBQUMsQ0FBQyxDQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxzQkFBc0IsTUFBSyxTQUFTLENBQUM7UUFDeEksTUFBTSxFQUFFLEdBQW9DLHVCQUFlLENBQUMsZ0NBQWdDLENBQUMsc0JBQXNCLENBQUMsQ0FBQztRQUNySCxNQUFNLGdCQUFnQixHQUFtQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztRQUNsRyxNQUFNLG1CQUFtQixHQUFrQyx1QkFBZSxDQUFDLDRDQUE0QyxDQUNySCxnQkFBZ0IsRUFDaEIsTUFBQSxJQUFJLENBQUMsT0FBTywwQ0FBRSxNQUFNLENBQ3JCLENBQUM7UUFDRixNQUFNLHNCQUFzQixHQUFHLE1BQUEsSUFBSSxhQUFKLElBQUksdUJB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