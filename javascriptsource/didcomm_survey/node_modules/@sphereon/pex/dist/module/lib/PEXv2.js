import { CredentialMapper } from '@sphereon/ssi-types';
import { PEX } from './PEX';
import { EvaluationClientWrapper } from './evaluation';
import { PresentationSubmissionLocation } from './signing';
import { SSITypesBuilder } from './types';
import { PresentationDefinitionV2VB, ValidationEngine } from './validation';
/**
 * This is the main interfacing class to be used from outside the library to use the functionality provided by the library.
 */
export class PEXv2 extends PEX {
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
    evaluatePresentation(presentationDefinition, presentation, opts) {
        SSITypesBuilder.modelEntityInternalPresentationDefinitionV2(presentationDefinition); // only doing validation
        return super.evaluatePresentation(presentationDefinition, presentation, opts);
    }
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
    evaluateCredentials(presentationDefinition, verifiableCredentials, opts) {
        SSITypesBuilder.modelEntityInternalPresentationDefinitionV2(presentationDefinition); // only doing validation
        return super.evaluateCredentials(presentationDefinition, verifiableCredentials, opts);
    }
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
    selectFrom(presentationDefinition, verifiableCredentials, opts) {
        this._evaluationClientWrapper = new EvaluationClientWrapper();
        return this._evaluationClientWrapper.selectFrom(SSITypesBuilder.modelEntityInternalPresentationDefinitionV2(presentationDefinition), SSITypesBuilder.mapExternalVerifiableCredentialsToWrappedVcs(verifiableCredentials), opts);
    }
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
    presentationFrom(presentationDefinition, selectedCredentials, opts) {
        const presentationSubmission = this._evaluationClientWrapper.submissionFrom(SSITypesBuilder.modelEntityInternalPresentationDefinitionV2(presentationDefinition), SSITypesBuilder.mapExternalVerifiableCredentialsToWrappedVcs(selectedCredentials), opts);
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
     * @param presentationDefinitionV2 the object to be validated.
     *
     * @return the validation results to reveal what is acceptable/unacceptable about the passed object to be considered a valid presentation definition
     */
    static validateDefinition(presentationDefinitionV2) {
        const pd = SSITypesBuilder.modelEntityInternalPresentationDefinitionV2(presentationDefinitionV2);
        return new ValidationEngine().validate([
            {
                bundler: new PresentationDefinitionV2VB('root'),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUEVYdjIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvUEVYdjIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLGdCQUFnQixFQUErRSxNQUFNLHFCQUFxQixDQUFDO0FBRXBJLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFDNUIsT0FBTyxFQUFFLHVCQUF1QixFQUFvQyxNQUFNLGNBQWMsQ0FBQztBQUN6RixPQUFPLEVBQTRDLDhCQUE4QixFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQ3JHLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDMUMsT0FBTyxFQUFFLDBCQUEwQixFQUFhLGdCQUFnQixFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRXZGOztHQUVHO0FBQ0gsTUFBTSxPQUFPLEtBQU0sU0FBUSxHQUFHO0lBQzVCOzs7Ozs7Ozs7T0FTRztJQUNJLG9CQUFvQixDQUN6QixzQkFBZ0QsRUFDaEQsWUFBNEQsRUFDNUQsSUFJQztRQUVELGVBQWUsQ0FBQywyQ0FBMkMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsd0JBQXdCO1FBQzdHLE9BQU8sS0FBSyxDQUFDLG9CQUFvQixDQUFDLHNCQUFzQixFQUFFLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNoRixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7T0FVRztJQUNJLG1CQUFtQixDQUN4QixzQkFBZ0QsRUFDaEQscUJBQXFELEVBQ3JELElBS0M7UUFFRCxlQUFlLENBQUMsMkNBQTJDLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLHdCQUF3QjtRQUM3RyxPQUFPLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxzQkFBc0IsRUFBRSxxQkFBcUIsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN4RixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7T0FVRztJQUNJLFVBQVUsQ0FDZixzQkFBZ0QsRUFDaEQscUJBQXFELEVBQ3JELElBS0M7UUFFRCxJQUFJLENBQUMsd0JBQXdCLEdBQUcsSUFBSSx1QkFBdUIsRUFBRSxDQUFDO1FBQzlELE9BQU8sSUFBSSxDQUFDLHdCQUF3QixDQUFDLFVBQVUsQ0FDN0MsZUFBZSxDQUFDLDJDQUEyQyxDQUFDLHNCQUFzQixDQUFDLEVBQ25GLGVBQWUsQ0FBQyw0Q0FBNEMsQ0FBQyxxQkFBcUIsQ0FBQyxFQUNuRixJQUFJLENBQ0wsQ0FBQztJQUNKLENBQUM7SUFFRDs7Ozs7Ozs7OztPQVVHO0lBQ0ksZ0JBQWdCLENBQ3JCLHNCQUFnRCxFQUNoRCxtQkFBbUQsRUFDbkQsSUFBMkI7UUFFM0IsTUFBTSxzQkFBc0IsR0FBRyxJQUFJLENBQUMsd0JBQXdCLENBQUMsY0FBYyxDQUN6RSxlQUFlLENBQUMsMkNBQTJDLENBQUMsc0JBQXNCLENBQUMsRUFDbkYsZUFBZSxDQUFDLDRDQUE0QyxDQUFDLG1CQUFtQixDQUFDLEVBQ2pGLElBQUksQ0FDTCxDQUFDO1FBQ0YsTUFBTSxtQkFBbUIsR0FBRyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLGdCQUFnQixDQUFDLHdCQUF3QixDQUFDLENBQUMsQ0FBQyxJQUFJLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRWhKLDhEQUE4RDtRQUM5RCxJQUFJLElBQUksRUFBRSw4QkFBOEIsS0FBSyw4QkFBOEIsQ0FBQyxZQUFZLElBQUksbUJBQW1CLEVBQUUsQ0FBQztZQUNoSCxNQUFNLElBQUksS0FBSyxDQUFDLCtHQUErRyxDQUFDLENBQUM7UUFDbkksQ0FBQztRQUVELE1BQU0sOEJBQThCLEdBQ2xDLElBQUksRUFBRSw4QkFBOEI7WUFDcEMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsOEJBQThCLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyw4QkFBOEIsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUVoSCxNQUFNLFlBQVksR0FBRyxHQUFHLENBQUMscUJBQXFCLENBQUMsbUJBQW1CLEVBQUU7WUFDbEUsR0FBRyxJQUFJO1lBQ1Asc0JBQXNCLEVBQUUsOEJBQThCLEtBQUssOEJBQThCLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsU0FBUztTQUM1SSxDQUFDLENBQUM7UUFFSCxPQUFPO1lBQ0wsWUFBWTtZQUNaLDhCQUE4QjtZQUM5QixzQkFBc0I7U0FDdkIsQ0FBQztJQUNKLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSSxNQUFNLENBQUMsa0JBQWtCLENBQUMsd0JBQWtEO1FBQ2pGLE1BQU0sRUFBRSxHQUFHLGVBQWUsQ0FBQywyQ0FBMkMsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1FBQ2pHLE9BQU8sSUFBSSxnQkFBZ0IsRUFBRSxDQUFDLFFBQVEsQ0FBQztZQUNyQztnQkFDRSxPQUFPLEVBQUUsSUFBSSwwQkFBMEIsQ0FBQyxNQUFNLENBQUM7Z0JBQy9DLE1BQU0sRUFBRSxFQUFFO2FBQ1g7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0ksTUFBTSxDQUFDLGtCQUFrQixDQUFDLHNCQUE4QztRQUM3RSxPQUFPLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0lBQ3hELENBQUM7Q0FDRiJ9