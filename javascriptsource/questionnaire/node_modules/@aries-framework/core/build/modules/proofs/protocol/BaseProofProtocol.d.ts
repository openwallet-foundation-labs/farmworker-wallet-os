import type { ProofProtocol } from './ProofProtocol';
import type { CreateProofProposalOptions, CreateProofRequestOptions, DeleteProofOptions, GetProofFormatDataReturn, CreateProofProblemReportOptions, ProofProtocolMsgReturnType, AcceptPresentationOptions, AcceptProofProposalOptions, AcceptProofRequestOptions, GetCredentialsForRequestOptions, GetCredentialsForRequestReturn, NegotiateProofProposalOptions, NegotiateProofRequestOptions, SelectCredentialsForRequestOptions, SelectCredentialsForRequestReturn } from './ProofProtocolOptions';
import type { AgentMessage } from '../../../agent/AgentMessage';
import type { FeatureRegistry } from '../../../agent/FeatureRegistry';
import type { AgentContext } from '../../../agent/context/AgentContext';
import type { InboundMessageContext } from '../../../agent/models/InboundMessageContext';
import type { DependencyManager } from '../../../plugins';
import type { Query } from '../../../storage/StorageService';
import type { ProblemReportMessage } from '../../problem-reports';
import type { ExtractProofFormats, ProofFormatService } from '../formats';
import type { ProofExchangeRecord } from '../repository';
import { ProofState } from '../models/ProofState';
export declare abstract class BaseProofProtocol<PFs extends ProofFormatService[] = ProofFormatService[]> implements ProofProtocol<PFs> {
    abstract readonly version: string;
    abstract register(dependencyManager: DependencyManager, featureRegistry: FeatureRegistry): void;
    abstract createProposal(agentContext: AgentContext, options: CreateProofProposalOptions<PFs>): Promise<ProofProtocolMsgReturnType<AgentMessage>>;
    abstract processProposal(messageContext: InboundMessageContext<AgentMessage>): Promise<ProofExchangeRecord>;
    abstract acceptProposal(agentContext: AgentContext, options: AcceptProofProposalOptions<PFs>): Promise<ProofProtocolMsgReturnType<AgentMessage>>;
    abstract negotiateProposal(agentContext: AgentContext, options: NegotiateProofProposalOptions<PFs>): Promise<ProofProtocolMsgReturnType<AgentMessage>>;
    abstract createRequest(agentContext: AgentContext, options: CreateProofRequestOptions<PFs>): Promise<ProofProtocolMsgReturnType<AgentMessage>>;
    abstract processRequest(messageContext: InboundMessageContext<AgentMessage>): Promise<ProofExchangeRecord>;
    abstract acceptRequest(agentContext: AgentContext, options: AcceptProofRequestOptions<PFs>): Promise<ProofProtocolMsgReturnType<AgentMessage>>;
    abstract negotiateRequest(agentContext: AgentContext, options: NegotiateProofRequestOptions<PFs>): Promise<ProofProtocolMsgReturnType<AgentMessage>>;
    abstract getCredentialsForRequest(agentContext: AgentContext, options: GetCredentialsForRequestOptions<PFs>): Promise<GetCredentialsForRequestReturn<PFs>>;
    abstract selectCredentialsForRequest(agentContext: AgentContext, options: SelectCredentialsForRequestOptions<PFs>): Promise<SelectCredentialsForRequestReturn<PFs>>;
    abstract processPresentation(messageContext: InboundMessageContext<AgentMessage>): Promise<ProofExchangeRecord>;
    abstract acceptPresentation(agentContext: AgentContext, options: AcceptPresentationOptions): Promise<ProofProtocolMsgReturnType<AgentMessage>>;
    abstract processAck(messageContext: InboundMessageContext<AgentMessage>): Promise<ProofExchangeRecord>;
    abstract createProblemReport(agentContext: AgentContext, options: CreateProofProblemReportOptions): Promise<ProofProtocolMsgReturnType<ProblemReportMessage>>;
    abstract findProposalMessage(agentContext: AgentContext, proofExchangeId: string): Promise<AgentMessage | null>;
    abstract findRequestMessage(agentContext: AgentContext, proofExchangeId: string): Promise<AgentMessage | null>;
    abstract findPresentationMessage(agentContext: AgentContext, proofExchangeId: string): Promise<AgentMessage | null>;
    abstract getFormatData(agentContext: AgentContext, proofExchangeId: string): Promise<GetProofFormatDataReturn<ExtractProofFormats<PFs>>>;
    processProblemReport(messageContext: InboundMessageContext<ProblemReportMessage>): Promise<ProofExchangeRecord>;
    /**
     * Update the record to a new state and emit an state changed event. Also updates the record
     * in storage.
     *
     * @param proofRecord The proof record to update the state for
     * @param newState The state to update to
     *
     */
    updateState(agentContext: AgentContext, proofRecord: ProofExchangeRecord, newState: ProofState): Promise<void>;
    protected emitStateChangedEvent(agentContext: AgentContext, proofRecord: ProofExchangeRecord, previousState: ProofState | null): void;
    /**
     * Retrieve a proof record by id
     *
     * @param proofRecordId The proof record id
     * @throws {RecordNotFoundError} If no record is found
     * @return The proof record
     *
     */
    getById(agentContext: AgentContext, proofRecordId: string): Promise<ProofExchangeRecord>;
    /**
     * Retrieve all proof records
     *
     * @returns List containing all proof records
     */
    getAll(agentContext: AgentContext): Promise<ProofExchangeRecord[]>;
    findAllByQuery(agentContext: AgentContext, query: Query<ProofExchangeRecord>): Promise<ProofExchangeRecord[]>;
    /**
     * Find a proof record by id
     *
     * @param proofRecordId the proof record id
     * @returns The proof record or null if not found
     */
    findById(agentContext: AgentContext, proofRecordId: string): Promise<ProofExchangeRecord | null>;
    delete(agentContext: AgentContext, proofRecord: ProofExchangeRecord, options?: DeleteProofOptions): Promise<void>;
    /**
     * Retrieve a proof record by connection id and thread id
     *
     * @param connectionId The connection id
     * @param threadId The thread id
     * @throws {RecordNotFoundError} If no record is found
     * @throws {RecordDuplicateError} If multiple records are found
     * @returns The proof record
     */
    getByThreadAndConnectionId(agentContext: AgentContext, threadId: string, connectionId?: string): Promise<ProofExchangeRecord>;
    /**
     * Find a proof record by connection id and thread id, returns null if not found
     *
     * @param connectionId The connection id
     * @param threadId The thread id
     * @returns The proof record
     */
    findByThreadAndConnectionId(agentContext: AgentContext, threadId: string, connectionId?: string): Promise<ProofExchangeRecord | null>;
    update(agentContext: AgentContext, proofRecord: ProofExchangeRecord): Promise<void>;
}
