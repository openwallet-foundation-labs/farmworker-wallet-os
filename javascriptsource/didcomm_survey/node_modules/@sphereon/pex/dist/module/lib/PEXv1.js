import { CredentialMapper } from '@sphereon/ssi-types';
import { PEX } from './PEX';
import { EvaluationClientWrapper } from './evaluation';
import { PresentationSubmissionLocation } from './signing';
import { SSITypesBuilder } from './types';
import { PresentationDefinitionV1VB, ValidationEngine } from './validation';
/**
 * This is the main interfacing class for using this library for v1 of presentation exchange
 */
export class PEXv1 extends PEX {
    /***
     * The evaluatePresentationV1 compares what is expected from a presentation with a presentationDefinitionV1.
     *
     * @param presentationDefinition the definition of what is expected in the presentation.
     * @param presentation the presentation which has to be evaluated in comparison of the definition.
     * @param opts - limitDisclosureSignatureSuites the credential signature suites that support limit disclosure
     *
     * @return the evaluation results specify what was expected and was fulfilled and also specifies which requirements described in the input descriptors
     * were not fulfilled by the presentation.
     */
    evaluatePresentation(presentationDefinition, presentation, opts) {
        SSITypesBuilder.modelEntityToInternalPresentationDefinitionV1(presentationDefinition); // only doing validation
        return super.evaluatePresentation(presentationDefinition, presentation, opts);
    }
    /***
     * To evaluate compares what is expected from a verifiableCredentials with the presentationDefinition.
     *
     * @param presentationDefinition the v1 definition of what is expected in the presentation.
     * @param verifiableCredentials the verifiable credentials which are candidates to fulfill requirements defined in the presentationDefinition param.
     * @param opts - holderDIDs the list of the DIDs that the wallet holders controlls.
     *                limitDisclosureSignatureSuites the credential signature suites that support limit disclosure
     *
     * @return the evaluation results specify what was expected and was fulfilled and also specifies which requirements described in the input descriptors
     * were not fulfilled by the verifiable credentials.
     */
    evaluateCredentials(presentationDefinition, verifiableCredentials, opts) {
        SSITypesBuilder.modelEntityToInternalPresentationDefinitionV1(presentationDefinition); // only doing validation
        return super.evaluateCredentials(presentationDefinition, verifiableCredentials, opts);
    }
    /**
     * The selectFrom method is a helper function that helps filter out the verifiable credentials which can not be selected and returns
     * the selectable credentials.
     *
     * @param presentationDefinition the v1 definition of what is expected in the presentation.
     * @param verifiableCredentials verifiable credentials are the credentials from wallet provided to the library to find selectable credentials.
     * @param opts - holderDIDs the decentralized identity of the wallet holderDID. This is used to identify the credentials issued to the holderDID of wallet.
     *               limitDisclosureSignatureSuites the credential signature suites that support limit disclosure
     *
     * @return the selectable credentials.
     */
    selectFrom(presentationDefinition, verifiableCredentials, opts) {
        const verifiableCredentialCopy = JSON.parse(JSON.stringify(verifiableCredentials));
        this._evaluationClientWrapper = new EvaluationClientWrapper();
        return this._evaluationClientWrapper.selectFrom(SSITypesBuilder.modelEntityToInternalPresentationDefinitionV1(presentationDefinition), SSITypesBuilder.mapExternalVerifiableCredentialsToWrappedVcs(verifiableCredentialCopy), opts);
    }
    /**
     * This method helps create a submittablePresentation. A submittablePresentation after signing becomes a Presentation. And can be sent to
     * the verifier after signing it.
     *
     * IMPORTANT NOTE: this method creates a presentation object based on the SELECTED verifiable credentials. You can get the selected verifiable credentials using selectFrom method
     *
     * @param presentationDefinition the v1 definition of what is expected in the presentation.
     * @param selectedCredentials the credentials which were declared selectable by getSelectableCredentials and then chosen by the intelligent-user
     * (e.g. human).
     * @param opts - holderDID optional; the decentralized identity of the wallet holderDID. This is used to identify the holderDID of the presentation.
     *
     * @return the presentation.
     */
    presentationFrom(presentationDefinition, selectedCredentials, opts) {
        const presentationSubmission = this._evaluationClientWrapper.submissionFrom(SSITypesBuilder.modelEntityToInternalPresentationDefinitionV1(presentationDefinition), SSITypesBuilder.mapExternalVerifiableCredentialsToWrappedVcs(selectedCredentials), opts);
        const hasSdJwtCredentials = selectedCredentials.some((c) => CredentialMapper.isSdJwtDecodedCredential(c) || CredentialMapper.isSdJwtEncoded(c));
        // We could include it in the KB-JWT? Not sure if we want that
        if (opts?.presentationSubmissionLocation === PresentationSubmissionLocation.PRESENTATION && hasSdJwtCredentials) {
            throw new Error('Presentation submission location cannot be set to presentation when creating a presentation with an SD-JWT VC');
        }
        const presentationSubmissionLocation = opts?.presentationSubmissionLocation ??
            (hasSdJwtCredentials ? PresentationSubmissionLocation.EXTERNAL : PresentationSubmissionLocation.PRESENTATION);
        const presentation = PEX.constructPresentation(selectedCredentials, {
            ...opts,
            presentationSubmission: presentationSubmissionLocation === PresentationSubmissionLocation.PRESENTATION ? presentationSubmission : undefined,
        });
        return {
            presentation,
            presentationSubmissionLocation,
            presentationSubmission,
        };
    }
    /**
     * This method validates whether an object is usable as a presentation definition or not.
     *
     * @param presentationDefinitionV1 the object to be validated.
     *
     * @return the validation results to reveal what is acceptable/unacceptable about the passed object to be considered a valid presentation definition
     */
    static validateDefinition(presentationDefinitionV1) {
        const pd = SSITypesBuilder.modelEntityToInternalPresentationDefinitionV1(presentationDefinitionV1);
        return new ValidationEngine().validate([
            {
                bundler: new PresentationDefinitionV1VB('root'),
                target: pd,
            },
        ]);
    }
    /**
     * This method validates whether an object is usable as a presentation submission or not.
     *
     * @param presentationSubmission the object to be validated.
     *
     * @return the validation results to reveal what is acceptable/unacceptable about the passed object to be considered a valid presentation submission
     */
    static validateSubmission(presentationSubmission) {
        return PEX.validateSubmission(presentationSubmission);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUEVYdjEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvUEVYdjEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLGdCQUFnQixFQUErRSxNQUFNLHFCQUFxQixDQUFDO0FBRXBJLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFDNUIsT0FBTyxFQUFFLHVCQUF1QixFQUFvQyxNQUFNLGNBQWMsQ0FBQztBQUN6RixPQUFPLEVBQTRDLDhCQUE4QixFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQ3JHLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDMUMsT0FBTyxFQUFFLDBCQUEwQixFQUFhLGdCQUFnQixFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRXZGOztHQUVHO0FBQ0gsTUFBTSxPQUFPLEtBQU0sU0FBUSxHQUFHO0lBQzVCOzs7Ozs7Ozs7T0FTRztJQUNJLG9CQUFvQixDQUN6QixzQkFBZ0QsRUFDaEQsWUFBNEQsRUFDNUQsSUFJQztRQUVELGVBQWUsQ0FBQyw2Q0FBNkMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsd0JBQXdCO1FBQy9HLE9BQU8sS0FBSyxDQUFDLG9CQUFvQixDQUFDLHNCQUFzQixFQUFFLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNoRixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7T0FVRztJQUNJLG1CQUFtQixDQUN4QixzQkFBZ0QsRUFDaEQscUJBQXFELEVBQ3JELElBS0M7UUFFRCxlQUFlLENBQUMsNkNBQTZDLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLHdCQUF3QjtRQUMvRyxPQUFPLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxzQkFBc0IsRUFBRSxxQkFBcUIsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN4RixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7T0FVRztJQUNJLFVBQVUsQ0FDZixzQkFBZ0QsRUFDaEQscUJBQXFELEVBQ3JELElBS0M7UUFFRCxN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