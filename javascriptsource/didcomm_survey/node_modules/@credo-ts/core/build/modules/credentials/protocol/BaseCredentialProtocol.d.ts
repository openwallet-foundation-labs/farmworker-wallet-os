import type { CredentialProtocol } from './CredentialProtocol';
import type { CreateCredentialProposalOptions, CredentialProtocolMsgReturnType, DeleteCredentialOptions, AcceptCredentialProposalOptions, NegotiateCredentialProposalOptions, CreateCredentialOfferOptions, NegotiateCredentialOfferOptions, CreateCredentialRequestOptions, AcceptCredentialOfferOptions, AcceptCredentialRequestOptions, AcceptCredentialOptions, GetCredentialFormatDataReturn, CreateCredentialProblemReportOptions } from './CredentialProtocolOptions';
import type { AgentContext } from '../../../agent';
import type { AgentMessage } from '../../../agent/AgentMessage';
import type { FeatureRegistry } from '../../../agent/FeatureRegistry';
import type { InboundMessageContext } from '../../../agent/models/InboundMessageContext';
import type { DependencyManager } from '../../../plugins';
import type { Query } from '../../../storage/StorageService';
import type { ProblemReportMessage } from '../../problem-reports';
import type { CredentialFormatService, ExtractCredentialFormats } from '../formats';
import type { CredentialRole } from '../models';
import type { CredentialExchangeRecord } from '../repository';
import { CredentialState } from '../models/CredentialState';
/**
 * Base implementation of the CredentialProtocol that can be used as a foundation for implementing
 * the CredentialProtocol interface.
 */
export declare abstract class BaseCredentialProtocol<CFs extends CredentialFormatService[] = CredentialFormatService[]> implements CredentialProtocol<CFs> {
    abstract readonly version: string;
    protected abstract getFormatServiceForRecordType(credentialRecordType: string): CFs[number];
    abstract createProposal(agentContext: AgentContext, options: CreateCredentialProposalOptions<CFs>): Promise<CredentialProtocolMsgReturnType<AgentMessage>>;
    abstract processProposal(messageContext: InboundMessageContext<AgentMessage>): Promise<CredentialExchangeRecord>;
    abstract acceptProposal(agentContext: AgentContext, options: AcceptCredentialProposalOptions<CFs>): Promise<CredentialProtocolMsgReturnType<AgentMessage>>;
    abstract negotiateProposal(agentContext: AgentContext, options: NegotiateCredentialProposalOptions<CFs>): Promise<CredentialProtocolMsgReturnType<AgentMessage>>;
    abstract createOffer(agentContext: AgentContext, options: CreateCredentialOfferOptions<CFs>): Promise<CredentialProtocolMsgReturnType<AgentMessage>>;
    abstract processOffer(messageContext: InboundMessageContext<AgentMessage>): Promise<CredentialExchangeRecord>;
    abstract acceptOffer(agentContext: AgentContext, options: AcceptCredentialOfferOptions<CFs>): Promise<CredentialProtocolMsgReturnType<AgentMessage>>;
    abstract negotiateOffer(agentContext: AgentContext, options: NegotiateCredentialOfferOptions<CFs>): Promise<CredentialProtocolMsgReturnType<AgentMessage>>;
    abstract createRequest(agentContext: AgentContext, options: CreateCredentialRequestOptions<CFs>): Promise<CredentialProtocolMsgReturnType<AgentMessage>>;
    abstract processRequest(messageContext: InboundMessageContext<AgentMessage>): Promise<CredentialExchangeRecord>;
    abstract acceptRequest(agentContext: AgentContext, options: AcceptCredentialRequestOptions<CFs>): Promise<CredentialProtocolMsgReturnType<AgentMessage>>;
    abstract processCredential(messageContext: InboundMessageContext<AgentMessage>): Promise<CredentialExchangeRecord>;
    abstract acceptCredential(agentContext: AgentContext, options: AcceptCredentialOptions): Promise<CredentialProtocolMsgReturnType<AgentMessage>>;
    abstract processAck(messageContext: InboundMessageContext<AgentMessage>): Promise<CredentialExchangeRecord>;
    abstract createProblemReport(agentContext: AgentContext, options: CreateCredentialProblemReportOptions): Promise<CredentialProtocolMsgReturnType<ProblemReportMessage>>;
    abstract findProposalMessage(agentContext: AgentContext, credentialExchangeId: string): Promise<AgentMessage | null>;
    abstract findOfferMessage(agentContext: AgentContext, credentialExchangeId: string): Promise<AgentMessage | null>;
    abstract findRequestMessage(agentContext: AgentContext, credentialExchangeId: string): Promise<AgentMessage | null>;
    abstract findCredentialMessage(agentContext: AgentContext, credentialExchangeId: string): Promise<AgentMessage | null>;
    abstract getFormatData(agentContext: AgentContext, credentialExchangeId: string): Promise<GetCredentialFormatDataReturn<ExtractCredentialFormats<CFs>>>;
    abstract register(dependencyManager: DependencyManager, featureRegistry: FeatureRegistry): void;
    /**
     * Process a received credential {@link ProblemReportMessage}.
     *
     * @param messageContext The message context containing a credential problem report message
     * @returns credential record associated with the credential problem report message
     */
    processProblemReport(messageContext: InboundMessageContext<ProblemReportMessage>): Promise<CredentialExchangeRecord>;
    /**
     * Update the record to a new state and emit an state changed event. Also updates the record
     * in storage.
     *
     * @param credentialRecord The credential record to update the state for
     * @param newState The state to update to
     *
     */
    updateState(agentContext: AgentContext, credentialRecord: CredentialExchangeRecord, newState: CredentialState): Promise<void>;
    protected emitStateChangedEvent(agentContext: AgentContext, credentialRecord: CredentialExchangeRecord, previousState: CredentialState | null): void;
    /**
     * Retrieve a credential record by id
     *
     * @param credentialRecordId The credential record id
     * @throws {RecordNotFoundError} If no record is found
     * @return The credential record
     *
     */
    getById(agentContext: AgentContext, credentialRecordId: string): Promise<CredentialExchangeRecord>;
    /**
     * Retrieve all credential records
     *
     * @returns List containing all credential records
     */
    getAll(agentContext: AgentContext): Promise<CredentialExchangeRecord[]>;
    findAllByQuery(agentContext: AgentContext, query: Query<CredentialExchangeRecord>): Promise<CredentialExchangeRecord[]>;
    /**
     * Find a credential record by id
     *
     * @param credentialRecordId the credential record id
     * @returns The credential record or null if not found
     */
    findById(agentContext: AgentContext, proofRecordId: string): Promise<CredentialExchangeRecord | null>;
    delete(agentContext: AgentContext, credentialRecord: CredentialExchangeRecord, options?: DeleteCredentialOptions): Promise<void>;
    /**
     * Retrieve a credential record by connection id and thread id
     *
     * @param properties Properties to query by
     *
     * @throws {RecordNotFoundError} If no record is found
     * @throws {RecordDuplicateError} If multiple records are found
     * @returns The credential record
     */
    getByProperties(agentContext: AgentContext, properties: {
        threadId: string;
        role?: CredentialRole;
        connectionId?: string;
    }): Promise<CredentialExchangeRecord>;
    /**
     * Find a credential record by connection id and thread id, returns null if not found
     *
     * @param threadId The thread id
     * @param role The role of the record, i.e. holder or issuer
     * @param connectionId The connection id
     *
     * @returns The credential record
     */
    findByProperties(agentContext: AgentContext, properties: {
        threadId: string;
        role?: CredentialRole;
        connectionId?: string;
    }): Promise<CredentialExchangeRecord | null>;
    update(agentContext: AgentContext, credentialRecord: CredentialExchangeRecord): Promise<void>;
}
