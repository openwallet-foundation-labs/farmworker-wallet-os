import type { DifPexCredentialsForRequest, DifPexInputDescriptorToCredentials, DifPresentationExchangeDefinition, DifPresentationExchangeSubmission, VerifiablePresentation } from './models';
import type { AgentContext } from '../../agent';
import { W3cCredentialService } from '../vc';
import { DifPresentationExchangeSubmissionLocation } from './models';
/**
 * @todo create a public api for using dif presentation exchange
 */
export declare class DifPresentationExchangeService {
    private w3cCredentialService;
    private pex;
    constructor(w3cCredentialService: W3cCredentialService);
    getCredentialsForRequest(agentContext: AgentContext, presentationDefinition: DifPresentationExchangeDefinition): Promise<DifPexCredentialsForRequest>;
    /**
     * Selects the credentials to use based on the output from `getCredentialsForRequest`
     * Use this method if you don't want to manually select the credentials yourself.
     */
    selectCredentialsForRequest(credentialsForRequest: DifPexCredentialsForRequest): DifPexInputDescriptorToCredentials;
    validatePresentationDefinition(presentationDefinition: DifPresentationExchangeDefinition): void;
    validatePresentationSubmission(presentationSubmission: DifPresentationExchangeSubmission): void;
    validatePresentation(presentationDefinition: DifPresentationExchangeDefinition, presentation: VerifiablePresentation): void;
    private formatValidated;
    createPresentation(agentContext: AgentContext, options: {
        credentialsForInputDescriptor: DifPexInputDescriptorToCredentials;
        presentationDefinition: DifPresentationExchangeDefinition;
        /**
         * Defaults to {@link DifPresentationExchangeSubmissionLocation.PRESENTATION}
         */
        presentationSubmissionLocation?: DifPresentationExchangeSubmissionLocation;
        challenge: string;
        domain?: string;
    }): Promise<{
        verifiablePresentations: (import("../vc").W3cJsonLdVerifiablePresentation | import("../vc").W3cJwtVerifiablePresentation | import("../sd-jwt-vc").SdJwtVc<import("../sd-jwt-vc").SdJwtVcHeader, import("../sd-jwt-vc").SdJwtVcPayload>)[];
        presentationSubmission: import("@sphereon/pex-models").PresentationSubmission;
        presentationSubmissionLocation: DifPresentationExchangeSubmissionLocation;
    }>;
    private getSigningAlgorithmFromVerificationMethod;
    private getSigningAlgorithmsForPresentationDefinitionAndInputDescriptors;
    private getSigningAlgorithmForJwtVc;
    private getProofTypeForLdpVc;
    /**
     * if all submission descriptors have a format of di | ldp,
     * and all credentials have an ANONCREDS_DATA_INTEGRITY proof we default to
     * signing the presentation using the ANONCREDS_DATA_INTEGRITY_CRYPTOSUITE
     */
    private shouldSignUsingAnonCredsDataIntegrity;
    private getPresentationSignCallback;
    private getVerificationMethodForSubjectId;
    /**
     * Queries the wallet for credentials that match the given presentation definition. This only does an initial query based on the
     * schema of the input descriptors. It does not do any further filtering based on the constraints in the input descriptors.
     */
    private queryCredentialForPresentationDefinition;
    private getSdJwtVcApi;
}
