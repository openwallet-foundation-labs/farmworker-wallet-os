import { Format, PresentationDefinitionV2, PresentationSubmission } from '@sphereon/pex-models';
import { IPresentation, OriginalVerifiableCredential, OriginalVerifiablePresentation } from '@sphereon/ssi-types';
import { PEX } from './PEX';
import { EvaluationResults, SelectResults } from './evaluation';
import { PresentationFromOpts, PresentationResult } from './signing';
import { Validated } from './validation';
/**
 * This is the main interfacing class to be used from outside the library to use the functionality provided by the library.
 */
export declare class PEXv2 extends PEX {
    /***
     * The evaluatePresentationV2 compares what is expected from a presentation with a presentationDefinitionV2.
     *
     * @param presentationDefinition the definition of what is expected in the presentation.
     * @param presentation the presentation which has to be evaluated in comparison of the definition.
     * @param opts - limitDisclosureSignatureSuites the credential signature suites that support limit disclosure
     *
     * @return the evaluation results specify what was expected and was fulfilled and also specifies which requirements described in the input descriptors
     * were not fulfilled by the presentation.
     */
    evaluatePresentation(presentationDefinition: PresentationDefinitionV2, presentation: OriginalVerifiablePresentation | IPresentation, opts?: {
        limitDisclosureSignatureSuites?: string[];
        restrictToFormats?: Format;
        restrictToDIDMethods?: string[];
    }): EvaluationResults;
    /***
     * The evaluateCredentialsV2 compares what is expected from a verifiableCredentials with the presentationDefinitionV2.
     *
     * @param presentationDefinition the v2 definition of what is expected in the presentation.
     * @param verifiableCredentials the verifiable credentials which are candidates to fulfill requirements defined in the presentationDefinition param.
     * @param opts - holderDIDs the list of the DIDs that the wallet holders controlls.
     *              limitDisclosureSignatureSuites the credential signature suites that support limit disclosure
     *
     * @return the evaluation results specify what was expected and was fulfilled and also specifies which requirements described in the input descriptors
     * were not fulfilled by the verifiable credentials.
     */
    evaluateCredentials(presentationDefinition: PresentationDefinitionV2, verifiableCredentials: OriginalVerifiableCredential[], opts?: {
        holderDIDs?: string[];
        limitDisclosureSignatureSuites?: string[];
        restrictToFormats?: Format;
        restrictToDIDMethods?: string[];
    }): EvaluationResults;
    /**
     * The selectFromV2 method is a helper function that helps filter out the verifiable credentials which can not be selected and returns
     * the selectable credentials.
     *
     * @param presentationDefinition the v2 definition of what is expected in the presentation.
     * @param verifiableCredentials verifiable credentials are the credentials from wallet provided to the library to find selectable credentials.
     * @param opts - holderDIDs the decentralized identity of the wallet holderDID. This is used to identify the credentials issued to the holderDID of wallet.
     *                limitDisclosureSignatureSuites the credential signature suites that support limit disclosure
     *
     * @return the selectable credentials.
     */
    selectFrom(presentationDefinition: PresentationDefinitionV2, verifiableCredentials: OriginalVerifiableCredential[], opts?: {
        holderDIDs?: string[];
        limitDisclosureSignatureSuites?: string[];
        restrictToFormats?: Format;
        restrictToDIDMethods?: string[];
    }): SelectResults;
    /**
     * This method helps create a Presentation. A Presentation after signing becomes a Verifiable Presentation and can be sent to
     * a verifier.
     *
     * @param presentationDefinition the v2 definition of what is expected in the presentation.
     * @param selectedCredentials the credentials which were declared selectable by getSelectableCredentials and then chosen by the intelligent-user
     * (e.g. human).
     * @param opts? - holderDID optional; the decentralized identifier of the Credential subject. This is used to identify the holderDID of the presentation.
     *
     * @return the presentation.
     */
    presentationFrom(presentationDefinition: PresentationDefinitionV2, selectedCredentials: OriginalVerifiableCredential[], opts?: PresentationFromOpts): PresentationResult;
    /**
     * This method validates whether an object is usable as a presentation definition or not.
     *
     * @param presentationDefinitionV2 the object to be validated.
     *
     * @return the validation results to reveal what is acceptable/unacceptable about the passed object to be considered a valid presentation definition
     */
    static validateDefinition(presentationDefinitionV2: PresentationDefinitionV2): Validated;
    /**
     * This method validates whether an object is usable as a presentation submission or not.
     *
     * @param presentationSubmission the object to be validated.
     *
     * @return the validation results to reveal what is acceptable/unacceptable about the passed object to be considered a valid presentation submission
     */
    static validateSubmission(presentationSubmission: PresentationSubmission): Validated;
}
