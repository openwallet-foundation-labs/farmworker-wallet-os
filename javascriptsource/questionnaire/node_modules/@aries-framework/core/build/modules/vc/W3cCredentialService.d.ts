import type { StoreCredentialOptions, W3cCreatePresentationOptions, W3cSignCredentialOptions, W3cSignPresentationOptions, W3cVerifyCredentialOptions, W3cVerifyPresentationOptions } from './W3cCredentialServiceOptions';
import type { W3cVerifiableCredential, W3cVerifiablePresentation, W3cVerifyCredentialResult, W3cVerifyPresentationResult } from './models';
import type { AgentContext } from '../../agent/context';
import type { Query } from '../../storage/StorageService';
import { W3cJsonLdCredentialService } from './data-integrity/W3cJsonLdCredentialService';
import { W3cJwtCredentialService } from './jwt-vc/W3cJwtCredentialService';
import { W3cPresentation } from './models/presentation/W3cPresentation';
import { W3cCredentialRecord, W3cCredentialRepository } from './repository';
export declare class W3cCredentialService {
    private w3cCredentialRepository;
    private w3cJsonLdCredentialService;
    private w3cJwtCredentialService;
    constructor(w3cCredentialRepository: W3cCredentialRepository, w3cJsonLdCredentialService: W3cJsonLdCredentialService, w3cJwtCredentialService: W3cJwtCredentialService);
    /**
     * Signs a credential
     *
     * @param credential the credential to be signed
     * @returns the signed credential
     */
    signCredential(agentContext: AgentContext, options: W3cSignCredentialOptions): Promise<W3cVerifiableCredential<W3cSignCredentialOptions['format']>>;
    /**
     * Verifies the signature(s) of a credential
     */
    verifyCredential(agentContext: AgentContext, options: W3cVerifyCredentialOptions): Promise<W3cVerifyCredentialResult>;
    /**
     * Utility method that creates a {@link W3cPresentation} from one or more {@link W3cJsonLdVerifiableCredential}s.
     *
     * **NOTE: the presentation that is returned is unsigned.**
     *
     * @returns An instance of {@link W3cPresentation}
     */
    createPresentation(options: W3cCreatePresentationOptions): Promise<W3cPresentation>;
    /**
     * Signs a presentation including the credentials it includes
     *
     * @param presentation the presentation to be signed
     * @returns the signed presentation
     */
    signPresentation(agentContext: AgentContext, options: W3cSignPresentationOptions): Promise<W3cVerifiablePresentation<W3cSignPresentationOptions['format']>>;
    /**
     * Verifies a presentation including the credentials it includes
     *
     * @param presentation the presentation to be verified
     * @returns the verification result
     */
    verifyPresentation(agentContext: AgentContext, options: W3cVerifyPresentationOptions): Promise<W3cVerifyPresentationResult>;
    /**
     * Writes a credential to storage
     *
     * @param record the credential to be stored
     * @returns the credential record that was written to storage
     */
    storeCredential(agentContext: AgentContext, options: StoreCredentialOptions): Promise<W3cCredentialRecord>;
    removeCredentialRecord(agentContext: AgentContext, id: string): Promise<void>;
    getAllCredentialRecords(agentContext: AgentContext): Promise<W3cCredentialRecord[]>;
    getCredentialRecordById(agentContext: AgentContext, id: string): Promise<W3cCredentialRecord>;
    findCredentialsByQuery(agentContext: AgentContext, query: Query<W3cCredentialRecord>): Promise<W3cVerifiableCredential[]>;
    findCredentialRecordByQuery(agentContext: AgentContext, query: Query<W3cCredentialRecord>): Promise<W3cVerifiableCredential | undefined>;
}
