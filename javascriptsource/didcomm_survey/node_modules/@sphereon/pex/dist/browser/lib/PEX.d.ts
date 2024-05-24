import { Format, PresentationSubmission } from '@sphereon/pex-models';
import { CompactSdJwtVc, Hasher, IPresentation, OriginalVerifiableCredential, OriginalVerifiablePresentation, OrPromise, W3CVerifiablePresentation } from '@sphereon/ssi-types';
import { EvaluationClientWrapper, EvaluationResults, SelectResults } from './evaluation';
import { PresentationFromOpts, PresentationResult, PresentationSignCallBackParams, PresentationSubmissionLocation, SdJwtDecodedVerifiableCredentialWithKbJwtInput, VerifiablePresentationFromOpts, VerifiablePresentationResult } from './signing';
import { DiscoveredVersion, IPresentationDefinition } from './types';
import { Validated } from './validation';
export interface PEXOptions {
    /**
     * Hasher implementation, can be used for tasks such as decoding a compact SD-JWT VC to it's encoded variant.
     * When decoding SD-JWT credentials the hasher must be provided. The hasher implementation must be sync. When using
     * an async hasher implementation, you must manually decode the credential or presentation first according to the
     * `SdJwtDecodedVerifiableCredential` interface. You can use the `CredentialMapper.decodeSdJwtAsync` method for
     *  this from the `@sphereon/ssi-types` package. NOTE that this is only needed when using an async hasher, and
     * that for sync hashers providing it here is enough for the decoding to be done automatically.
     */
    hasher?: Hasher;
}
/**
 * This is the main interfacing class to be used by developers using the PEX library.
 */
export declare class PEX {
    protected _evaluationClientWrapper: EvaluationClientWrapper;
    protected options?: PEXOptions;
    constructor(options?: PEXOptions);
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
    evaluatePresentation(presentationDefinition: IPresentationDefinition, presentation: OriginalVerifiablePresentation | IPresentation, opts?: {
        limitDisclosureSignatureSuites?: string[];
        restrictToFormats?: Format;
        restrictToDIDMethods?: string[];
        presentationSubmission?: PresentationSubmission;
        generatePresentationSubmission?: boolean;
    }): EvaluationResults;
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
    evaluateCredentials(presentationDefinition: IPresentationDefinition, verifiableCredentials: OriginalVerifiableCredential[], opts?: {
        holderDIDs?: string[];
        limitDisclosureSignatureSuites?: string[];
        restrictToFormats?: Format;
        restrictToDIDMethods?: string[];
    }): EvaluationResults;
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
    selectFrom(presentationDefinition: IPresentationDefinition, verifiableCredentials: OriginalVerifiableCredential[], opts?: {
        holderDIDs?: string[];
        limitDisclosureSignatureSuites?: string[];
        restrictToFormats?: Format;
        restrictToDIDMethods?: string[];
    }): SelectResults;
    presentationSubmissionFrom(presentationDefinition: IPresentationDefinition, selectedCredentials: OriginalVerifiableCredential[], opts?: {
        /**
         * The presentation submission data location.
         *
         * Can be External, which means it is only returned and not embedded into the VP,
         * or Presentation, which means it will become part of the VP
         */
        presentationSubmissionLocation?: PresentationSubmissionLocation;
    }): PresentationSubmission;
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
    presentationFrom(presentationDefinition: IPresentationDefinition, selectedCredentials: OriginalVerifiableCredential[], opts?: PresentationFromOpts): PresentationResult;
    static constructPresentation(selectedCredentials: OriginalVerifiableCredential | OriginalVerifiableCredential[], opts?: {
        presentationSubmission?: PresentationSubmission;
        holderDID?: string;
        basePresentationPayload?: IPresentation;
        /**
         * Hasher to use when decoding an SD-JWT credential.
         */
        hasher?: Hasher;
    }): IPresentation | SdJwtDecodedVerifiableCredentialWithKbJwtInput;
    /**
     * This method validates whether an object is usable as a presentation definition or not.
     *
     * @param presentationDefinition presentationDefinition of V1 or v2 to be validated.
     *
     * @return the validation results to reveal what is acceptable/unacceptable about the passed object to be considered a valid presentation definition
     */
    static validateDefinition(presentationDefinition: IPresentationDefinition): Validated;
    /**
     * This method validates whether an object is usable as a presentation submission or not.
     *
     * @param presentationSubmission the object to be validated.
     *
     * @return the validation results to reveal what is acceptable/unacceptable about the passed object to be considered a valid presentation submission
     */
    static validateSubmission(presentationSubmission: PresentationSubmission): Validated;
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
    verifiablePresentationFrom(presentationDefinition: IPresentationDefinition, selectedCredentials: OriginalVerifiableCredential[], signingCallBack: (callBackParams: PresentationSignCallBackParams) => OrPromise<W3CVerifiablePresentation | CompactSdJwtVc>, opts: VerifiablePresentationFromOpts): Promise<VerifiablePresentationResult>;
    static definitionVersionDiscovery(presentationDefinition: IPresentationDefinition): DiscoveredVersion;
}
