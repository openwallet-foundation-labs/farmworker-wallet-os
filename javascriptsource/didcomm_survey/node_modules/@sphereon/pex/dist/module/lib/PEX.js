import { CredentialMapper, } from '@sphereon/ssi-types';
import { Status } from './ConstraintUtils';
import { EvaluationClientWrapper } from './evaluation';
import { PresentationSubmissionLocation, } from './signing';
import { PEVersion, SSITypesBuilder } from './types';
import { calculateSdHash, definitionVersionDiscovery, getSubjectIdsAsString } from './utils';
import { PresentationDefinitionV1VB, PresentationDefinitionV2VB, PresentationSubmissionVB, ValidationEngine } from './validation';
/**
 * This is the main interfacing class to be used by developers using the PEX library.
 */
export class PEX {
    _evaluationClientWrapper;
    options;
    constructor(options) {
        // TODO:  So we have state in the form of this property which is set in the constructor, but we are overwriting it elsewhere. We need to retrhink how to instantiate PEX
        this._evaluationClientWrapper = new EvaluationClientWrapper();
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
        const generatePresentationSubmission = opts?.generatePresentationSubmission !== undefined ? opts.generatePresentationSubmission : opts?.presentationSubmission === undefined;
        const pd = SSITypesBuilder.toInternalPresentationDefinition(presentationDefinition);
        const presentationCopy = JSON.parse(JSON.stringify(presentation));
        const wrappedPresentation = SSITypesBuilder.mapExternalVerifiablePresentationToWrappedVP(presentationCopy, this.options?.hasher);
        const presentationSubmission = opts?.presentationSubmission ?? wrappedPresentation.decoded.presentation_submission;
        if (!presentationSubmission && !generatePresentationSubmission) {
            throw Error(`Either a presentation submission as part of the VP or provided separately was expected`);
        }
        // TODO: we should probably add support for holder dids in the kb-jwt of an SD-JWT. We can extract this from the
        // `wrappedPresentation.original.compactKbJwt`, but as HAIP doesn't use dids, we'll leave it for now.
        const holderDIDs = CredentialMapper.isW3cPresentation(wrappedPresentation.presentation) && wrappedPresentation.presentation.holder
            ? [wrappedPresentation.presentation.holder]
            : [];
        const updatedOpts = {
            ...opts,
            holderDIDs,
            presentationSubmission,
            generatePresentationSubmission,
        };
        const result = this._evaluationClientWrapper.evaluate(pd, wrappedPresentation.vcs, updatedOpts);
        if (result.value?.descriptor_map.length) {
            const selectFromClientWrapper = new EvaluationClientWrapper();
            const selectResults = selectFromClientWrapper.selectFrom(pd, wrappedPresentation.vcs, updatedOpts);
            if (selectResults.areRequiredCredentialsPresent !== Status.ERROR) {
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
        const wrappedVerifiableCredentials = SSITypesBuilder.mapExternalVerifiableCredentialsToWrappedVcs(verifiableCredentials, this.options?.hasher);
        // TODO:  So we have state in the form of this property which is set in the constructor, but we are overwriting it here. We need to retrhink how to instantiate PEX
        this._evaluationClientWrapper = new EvaluationClientWrapper();
        const pd = SSITypesBuilder.toInternalPresentationDefinition(presentationDefinition);
        const result = this._evaluationClientWrapper.evaluate(pd, wrappedVerifiableCredentials, opts);
        if (result.value && result.value.descriptor_map.length) {
            const selectFromClientWrapper = new EvaluationClientWrapper();
            const selectResults = selectFromClientWrapper.selectFrom(pd, wrappedVerifiableCredentials, opts);
            result.areRequiredCredentialsPresent = selectResults.areRequiredCredentialsPresent;
            result.errors = selectResults.errors;
        }
        else {
            result.areRequiredCredentialsPresent = Status.ERROR;
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
        const verifiableCredentialCopy = JSON.parse(JSON.stringify(verifiableCredentials));
        const pd = SSITypesBuilder.toInternalPresentationDefinition(presentationDefinition);
        // TODO:  So we have state in the form of this property which is set in the constructor, but we are overwriting it here. We need to retrhink how to instantiate PEX
        this._evaluationClientWrapper = new EvaluationClientWrapper();
        return this._evaluationClientWrapper.selectFrom(pd, SSITypesBuilder.mapExternalVerifiableCredentialsToWrappedVcs(verifiableCredentialCopy, this.options?.hasher), opts);
    }
    presentationSubmissionFrom(presentationDefinition, selectedCredentials, opts) {
        const pd = SSITypesBuilder.toInternalPresentationDefinition(presentationDefinition);
        return this._evaluationClientWrapper.submissionFrom(pd, SSITypesBuilder.mapExternalVerifiableCredentialsToWrappedVcs(selectedCredentials, this.options?.hasher), opts);
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
        const presentationSubmission = this.presentationSubmissionFrom(presentationDefinition, selectedCredentials, opts);
        const hasSdJwtCredentials = selectedCredentials.some((c) => CredentialMapper.isSdJwtDecodedCredential(c) || CredentialMapper.isSdJwtEncoded(c));
        // We could include it in the KB-JWT? Not sure if we want that
        if (opts?.presentationSubmissionLocation === PresentationSubmissionLocation.PRESENTATION && hasSdJwtCredentials) {
            throw new Error('Presentation submission location cannot be set to presentation when creating a presentation with an SD-JWT VC');
        }
        const presentationSubmissionLocation = opts?.presentationSubmissionLocation ??
            (hasSdJwtCredentials ? PresentationSubmissionLocation.EXTERNAL : PresentationSubmissionLocation.PRESENTATION);
        const presentation = PEX.constructPresentation(selectedCredentials, {
            ...opts,
            // We only pass in the submission in case it needs to be included in the presentation
            presentationSubmission: presentationSubmissionLocation === PresentationSubmissionLocation.PRESENTATION ? presentationSubmission : undefined,
            hasher: this.options?.hasher,
        });
        return {
            presentation,
            presentationSubmissionLocation,
            presentationSubmission,
        };
    }
    static constructPresentation(selectedCredentials, opts) {
        const credentials = Array.isArray(selectedCredentials) ? selectedCredentials : [selectedCredentials];
        // for SD-JWT we want to return the SD-JWT with only the needed disclosures (so filter disclosures array, and update the compactSdJwt)
        // in addition we want to create the KB-JWT payload as well.
        // FIXME: include the KB-JWT payload?
        if (credentials.some((c) => CredentialMapper.isSdJwtDecodedCredential(c) || CredentialMapper.isSdJwtEncoded(c))) {
            if (credentials.length > 1) {
                // Until there's some consensus around the following issue, we'll only support a single
                // SD-JWT credential in a presentation
                // https://github.com/decentralized-identity/presentation-exchange/issues/462
                throw new Error('Only a single credential is supported when creating a presentation with an SD-JWT VC');
            }
            if (opts?.presentationSubmission) {
                throw new Error('Presentation submission cannot be included in the presentation when creating a presentation with an SD-JWT VC');
            }
            if (opts?.basePresentationPayload) {
                throw new Error('Base presentation payload cannot be when creating a presentation from an SD-JWT VC');
            }
            // NOTE: we assume the credential already has selective disclosure applied, even if it is encoded. Is
            // that a valid assumption? It seems to be this way for BBS SD as well
            const decoded = (CredentialMapper.isSdJwtEncoded(credentials[0]) ? CredentialMapper.decodeVerifiableCredential(credentials[0], opts?.hasher) : credentials[0]);
            if (!opts?.hasher) {
                throw new Error('Hasher must be provided when creating a presentation with an SD-JWT VC');
            }
            // extract sd_alg or default to sha-256
            const hashAlg = decoded.signedPayload._sd_alg ?? 'sha-256';
            const sdHash = calculateSdHash(decoded.compactSdJwtVc, hashAlg, opts.hasher);
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
            return {
                ...decoded,
                kbJwt,
            };
        }
        else {
            if (!selectedCredentials) {
                throw Error(`At least a verifiable credential needs to be passed in to create a presentation`);
            }
            const verifiableCredential = (Array.isArray(selectedCredentials) ? selectedCredentials : [selectedCredentials]);
            const wVCs = verifiableCredential.map((vc) => CredentialMapper.toWrappedVerifiableCredential(vc));
            const holders = Array.from(new Set(wVCs.flatMap((wvc) => getSubjectIdsAsString(wvc.credential))));
            if (holders.length !== 1 && !opts?.holderDID) {
                console.log(`We deduced ${holders.length} subject from ${wVCs.length} Verifiable Credentials, and no holder property was given. This might lead to undesired results`);
            }
            const holder = opts?.holderDID ?? (holders.length === 1 ? holders[0] : undefined);
            const type = opts?.basePresentationPayload?.type
                ? Array.isArray(opts.basePresentationPayload.type)
                    ? opts.basePresentationPayload.type
                    : [opts.basePresentationPayload.type]
                : [];
            if (!type.includes('VerifiablePresentation')) {
                type.push('VerifiablePresentation');
            }
            const context = opts?.basePresentationPayload?.['@context']
                ? Array.isArray(opts.basePresentationPayload['@context'])
                    ? opts.basePresentationPayload['@context']
                    : [opts.basePresentationPayload['@context']]
                : [];
            if (!context.includes('https://www.w3.org/2018/credentials/v1')) {
                context.push('https://www.w3.org/2018/credentials/v1');
            }
            if (opts?.presentationSubmission) {
                if (!type.includes('PresentationSubmission')) {
                    type.push('PresentationSubmission');
                }
                if (!context.includes('https://identity.foundation/presentation-exchange/submission/v1')) {
                    context.push('https://identity.foundation/presentation-exchange/submission/v1');
                }
            }
            return {
                ...opts?.basePresentationPayload,
                '@context': context,
                type,
                holder,
                ...(!!opts?.presentationSubmission && { presentation_submission: opts.presentationSubmission }),
                verifiableCredential,
            };
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
        const result = definitionVersionDiscovery(presentationDefinition);
        if (result.error) {
            throw new Error(result.error);
        }
        const validators = [];
        result.version === PEVersion.v1
            ? validators.push({
                bundler: new PresentationDefinitionV1VB('root'),
                target: SSITypesBuilder.modelEntityToInternalPresentationDefinitionV1(presentationDefinition),
            })
            : validators.push({
                bundler: new PresentationDefinitionV2VB('root'),
                target: SSITypesBuilder.modelEntityInternalPresentationDefinitionV2(presentationDefinition),
            });
        return new ValidationEngine().validate(validators);
    }
    /**
     * This method validates whether an object is usable as a presentation submission or not.
     *
     * @param presentationSubmission the object to be validated.
     *
     * @return the validation results to reveal what is acceptable/unacceptable about the passed object to be considered a valid presentation submission
     */
    static validateSubmission(presentationSubmission) {
        return new ValidationEngine().validate([
            {
                bundler: new PresentationSubmissionVB('root'),
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
    async verifiablePresentationFrom(presentationDefinition, selectedCredentials, signingCallBack, opts) {
        const { holderDID, signatureOptions, proofOptions } = opts;
        function limitedDisclosureSuites() {
            let limitDisclosureSignatureSuites = [];
            if (proofOptions?.typeSupportsSelectiveDisclosure) {
                if (!proofOptions?.type) {
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
        const evaluationResults = this.evaluatePresentation(presentationDefinition, presentationResult.presentation, {
            limitDisclosureSignatureSuites,
            ...(presentationResult.presentationSubmissionLocation === PresentationSubmissionLocation.EXTERNAL && {
                presentationSubmission: presentationResult.presentationSubmission,
            }),
        });
        if (!evaluationResults.value) {
            throw new Error('Could not get evaluation results from presentationResult');
        }
        const proof = {
            type: proofOptions?.type,
            verificationMethod: signatureOptions?.verificationMethod,
            created: proofOptions?.created ? proofOptions.created : new Date().toISOString(),
            proofPurpose: proofOptions?.proofPurpose,
            proofValue: signatureOptions?.proofValue,
            jws: signatureOptions?.jws,
            challenge: proofOptions?.challenge,
            nonce: proofOptions?.nonce,
            domain: proofOptions?.domain,
        };
        let presentation = presentationResult.presentation;
        if (CredentialMapper.isSdJwtDecodedCredential(presentationResult.presentation)) {
            if (!this.options?.hasher) {
                throw new Error('Hasher must be provided when creating a presentation with an SD-JWT VC');
            }
            // extract sd_alg or default to sha-256
            const hashAlg = presentationResult.presentation.signedPayload._sd_alg ?? 'sha-256';
            const sdHash = calculateSdHash(presentationResult.presentation.compactSdJwtVc, hashAlg, this.options.hasher);
            const kbJwt = {
                // alg MUST be set by the signer
                header: {
                    typ: 'kb+jwt',
                },
                // aud MUST be set by the signer or provided by e.g. SIOP/OpenID4VP lib
                payload: {
                    iat: new Date().getTime(),
                    nonce: proofOptions?.nonce,
                    _sd_hash: sdHash,
                },
            };
            presentation = {
                ...presentation,
                kbJwt,
            };
        }
        const callBackParams = {
            options: {
                ...opts,
                presentationSubmissionLocation: presentationResult.presentationSubmissionLocation,
            },
            presentation,
            presentationDefinition,
            selectedCredentials,
            proof,
            presentationSubmission: evaluationResults.value,
            evaluationResults,
        };
        const verifiablePresentation = await signingCallBack(callBackParams);
        return {
            verifiablePresentation,
            presentationSubmissionLocation: presentationResult.presentationSubmissionLocation,
            presentationSubmission: evaluationResults.value,
        };
    }
    static definitionVersionDiscovery(presentationDefinition) {
        return definitionVersionDiscovery(presentationDefinition);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUEVYLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL1BFWC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBRUwsZ0JBQWdCLEdBYWpCLE1BQU0scUJBQXFCLENBQUM7QUFFN0IsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzNDLE9BQU8sRUFBRSx1QkFBdUIsRUFBb0MsTUFBTSxjQUFjLENBQUM7QUFDekYsT0FBTyxFQUlMLDhCQUE4QixHQUsvQixNQUFNLFdBQVcsQ0FBQztBQUNuQixPQUFPLEVBQStFLFNBQVMsRUFBRSxlQUFlLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDbEksT0FBTyxFQUFFLGVBQWUsRUFBRSwwQkFBMEIsRUFBRSxxQkFBcUIsRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUM3RixPQUFPLEVBQUUsMEJBQTBCLEVBQUUsMEJBQTBCLEVBQUUsd0JBQXdCLEVBQWEsZ0JBQWdCLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFjN0k7O0dBRUc7QUFDSCxNQUFNLE9BQU8sR0FBRztJQUNKLHdCQUF3QixDQUEwQjtJQUNsRCxPQUFPLENBQWM7SUFFL0IsWUFBWSxPQUFvQjtRQUM5Qix3S0FBd0s7UUFDeEssSUFBSSxDQUFDLHdCQUF3QixHQUFHLElBQUksdUJBQXVCLEVBQUUsQ0FBQztRQUU5RCxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUN6QixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7T0FVRztJQUNJLG9CQUFvQixDQUN6QixzQkFBK0MsRUFDL0MsWUFBNEQsRUFDNUQsSUFNQztRQUVELE1BQU0sOEJBQThCLEdBQ2xDLElBQUksRUFBRSw4QkFBOEIsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLHNCQUFzQixLQUFLLFNBQVMsQ0FBQztRQUN4SSxNQUFNLEVBQUUsR0FBb0MsZUFBZSxDQUFDLGdDQUFn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