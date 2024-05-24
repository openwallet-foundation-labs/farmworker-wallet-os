"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PEXv2 = void 0;
const ssi_types_1 = require("@sphereon/ssi-types");
const PEX_1 = require("./PEX");
const evaluation_1 = require("./evaluation");
const signing_1 = require("./signing");
const types_1 = require("./types");
const validation_1 = require("./validation");
/**
 * This is the main interfacing class to be used from outside the library to use the functionality provided by the library.
 */
class PEXv2 extends PEX_1.PEX {
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
        types_1.SSITypesBuilder.modelEntityInternalPresentationDefinitionV2(presentationDefinition); // only doing validation
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
        types_1.SSITypesBuilder.modelEntityInternalPresentationDefinitionV2(presentationDefinition); // only doing validation
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
        this._evaluationClientWrapper = new evaluation_1.EvaluationClientWrapper();
        return this._evaluationClientWrapper.selectFrom(types_1.SSITypesBuilder.modelEntityInternalPresentationDefinitionV2(presentationDefinition), types_1.SSITypesBuilder.mapExternalVerifiableCredentialsToWrappedVcs(verifiableCredentials), opts);
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
        var _a;
        const presentationSubmission = this._evaluationClientWrapper.submissionFrom(types_1.SSITypesBuilder.modelEntityInternalPresentationDefinitionV2(presentationDefinition), types_1.SSITypesBuilder.mapExternalVerifiableCredentialsToWrappedVcs(selectedCredentials), opts);
        const hasSdJwtCredentials = selectedCredentials.some((c) => ssi_types_1.CredentialMapper.isSdJwtDecodedCredential(c) || ssi_types_1.CredentialMapper.isSdJwtEncoded(c));
        // We could include it in the KB-JWT? Not sure if we want that
        if ((opts === null || opts === void 0 ? void 0 : opts.presentationSubmissionLocation) === signing_1.PresentationSubmissionLocation.PRESENTATION && hasSdJwtCredentials) {
            throw new Error('Presentation submission location cannot be set to presentation when creating a presentation with an SD-JWT VC');
        }
        const presentationSubmissionLocation = (_a = opts === null || opts === void 0 ? void 0 : opts.presentationSubmissionLocation) !== null && _a !== void 0 ? _a : (hasSdJwtCredentials ? signing_1.PresentationSubmissionLocation.EXTERNAL : signing_1.PresentationSubmissionLocation.PRESENTATION);
        const presentation = PEX_1.PEX.constructPresentation(selectedCredentials, Object.assign(Object.assign({}, opts), { presentationSubmission: presentationSubmissionLocation === signing_1.PresentationSubmissionLocation.PRESENTATION ? presentationSubmission : undefined }));
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
        const pd = types_1.SSITypesBuilder.modelEntityInternalPresentationDefinitionV2(presentationDefinitionV2);
        return new validation_1.ValidationEngine().validate([
            {
                bundler: new validation_1.PresentationDefinitionV2VB('root'),
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
        return PEX_1.PEX.validateSubmission(presentationSubmission);
    }
}
exports.PEXv2 = PEXv2;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUEVYdjIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvUEVYdjIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsbURBQW9JO0FBRXBJLCtCQUE0QjtBQUM1Qiw2Q0FBeUY7QUFDekYsdUNBQXFHO0FBQ3JHLG1DQUEwQztBQUMxQyw2Q0FBdUY7QUFFdkY7O0dBRUc7QUFDSCxNQUFhLEtBQU0sU0FBUSxTQUFHO0lBQzVCOzs7Ozs7Ozs7T0FTRztJQUNJLG9CQUFvQixDQUN6QixzQkFBZ0QsRUFDaEQsWUFBNEQsRUFDNUQsSUFJQztRQUVELHVCQUFlLENBQUMsMkNBQTJDLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLHdCQUF3QjtRQUM3RyxPQUFPLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxzQkFBc0IsRUFBRSxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDaEYsQ0FBQztJQUVEOzs7Ozs7Ozs7O09BVUc7SUFDSSxtQkFBbUIsQ0FDeEIsc0JBQWdELEVBQ2hELHFCQUFxRCxFQUNyRCxJQUtDO1FBRUQsdUJBQWUsQ0FBQywyQ0FBMkMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsd0JBQXdCO1FBQzdHLE9BQU8sS0FBSyxDQUFDLG1CQUFtQixDQUFDLHNCQUFzQixFQUFFLHFCQUFxQixFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3hGLENBQUM7SUFFRDs7Ozs7Ozs7OztPQVVHO0lBQ0ksVUFBVSxDQUNmLHNCQUFnRCxFQUNoRCxxQkFBcUQsRUFDckQsSUFLQztRQUVELElBQUksQ0FBQyx3QkFBd0IsR0FBRyxJQUFJLG9DQUF1QixFQUFFLENBQUM7UUFDOUQsT0FBTyxJQUFJLENBQUMsd0JBQXdCLENBQUMsVUFBVSxDQUM3Qyx1QkFBZSxDQUFDLDJDQUEyQyxDQUFDLHNCQUFzQixDQUFDLEVBQ25GLHVCQUFlLENBQUMsNENBQTRDLENBQUMscUJBQXFCLENBQUMsRUFDbkYsSUFBSSxDQUNMLENBQUM7SUFDSixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7T0FVRztJQUNJLGdCQUFnQixDQUNyQixzQkFBZ0QsRUFDaEQsbUJBQW1ELEVBQ25ELElBQTJCOztRQUUzQixNQUFNLHNCQUFzQixHQUFHLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxjQUFjLENBQ3pFLHVCQUFlLENBQUMsMkNBQTJDLENBQUMsc0JBQXNCLENBQUMsRUFDbkYsdUJBQWUsQ0FBQyw0Q0FBNEMsQ0FBQyxtQkFBbUIsQ0FBQyxFQUNqRixJQUFJLENBQ0wsQ0FBQztRQUNGLE1BQU0sbUJBQW1CLEdBQUcsbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyw0QkFBZ0IsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLENBQUMsSUFBSSw0QkFBZ0IsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVoSiw4REFBOEQ7UUFDOUQsSUFBSSxDQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSw4QkFBOEIsTUFBSyx3Q0FBOEIsQ0FBQyxZQUFZLElBQUksbUJBQW1CLEVBQUUsQ0FBQztZQUNoSCxNQUFNLElBQUksS0FBSyxDQUFDLCtHQUErRyxDQUFDLENBQUM7UUFDbkksQ0FBQztRQUVELE1BQU0sOEJBQThCLEdBQ2xDLE1BQUEsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLDhCQUE4QixtQ0FDcEMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsd0NBQThCLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyx3Q0FBOEIsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUVoSCxNQUFNLFlBQVksR0FBRyxTQUFHLENBQUMscUJBQXFCLENBQUMsbUJBQW1CLGtDQUM3RCxJQUFJLEtBQ1Asc0JBQXNCLEVBQUUsOEJBQThCLEtBQUssd0NBQThCLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsU0FBUyxJQUMzSSxDQUFDO1FBRUgsT0FBTztZQUNMLFlBQVk7WUFDWiw4QkFBOEI7WUFDOUIsc0JBQXNCO1NBQ3ZCLENBQUM7SUFDSixDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0ksTUFBTSxDQUFDLGtCQUFrQixDQUFDLHdCQUFrRDtRQUNqRixNQUFNLEVBQUUsR0FBRyx1QkFBZSxDQUFDLDJDQUEyQyxDQUFDLHdCQUF3QixDQUFDLENBQUM7UUFDakcsT0FBTyxJQUFJLDZCQUFnQixFQUFFLENBQUMsUUFBUSxDQUFDO1lBQ3JDO2dCQUNFLE9BQU8sRUFBRSxJQUFJLHVDQUEwQixDQUFDLE1BQU0sQ0FBQztnQkFDL0MsTUFBTSxFQUFFLEVBQUU7YUFDWDtTQUNGLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSSxNQUFNLENBQUMsa0JBQWtCLENBQUMsc0JBQThDO1FBQzdFLE9BQU8sU0FBRyxDQUFDLGtCQUFrQixDQUFDLHNCQUFzQixDQUFDLENBQUM7SUFDeEQsQ0FBQztDQUNGO0FBckpELHNCQXFKQyJ9