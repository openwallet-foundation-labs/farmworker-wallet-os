import type { AgentContext } from '../../../../agent';
import type { AgentMessage } from '../../../../agent/AgentMessage';
import type { FeatureRegistry } from '../../../../agent/FeatureRegistry';
import type { InboundMessageContext } from '../../../../agent/models/InboundMessageContext';
import type { DependencyManager } from '../../../../plugins';
import type { ProblemReportMessage } from '../../../problem-reports';
import type { ProofFormatService } from '../../formats/ProofFormatService';
import type { ProofProtocol } from '../ProofProtocol';
import type { AcceptPresentationOptions, AcceptProofProposalOptions, AcceptProofRequestOptions, CreateProofProblemReportOptions, CreateProofProposalOptions, CreateProofRequestOptions, GetCredentialsForRequestOptions, GetCredentialsForRequestReturn, GetProofFormatDataReturn, NegotiateProofProposalOptions, NegotiateProofRequestOptions, ProofProtocolMsgReturnType, SelectCredentialsForRequestOptions, SelectCredentialsForRequestReturn } from '../ProofProtocolOptions';
import { ProofExchangeRecord } from '../../repository';
import { BaseProofProtocol } from '../BaseProofProtocol';
import { V2PresentationAckMessage, V2RequestPresentationMessage } from './messages';
import { V2PresentationMessage } from './messages/V2PresentationMessage';
import { V2ProposePresentationMessage } from './messages/V2ProposePresentationMessage';
export interface V2ProofProtocolConfig<ProofFormatServices extends ProofFormatService[]> {
    proofFormats: ProofFormatServices;
}
export declare class V2ProofProtocol<PFs extends ProofFormatService[] = ProofFormatService[]> extends BaseProofProtocol implements ProofProtocol<PFs> {
    private proofFormatCoordinator;
    private proofFormats;
    constructor({ proofFormats }: V2ProofProtocolConfig<PFs>);
    /**
     * The version of the present proof protocol this service supports
     */
    readonly version: "v2";
    register(dependencyManager: DependencyManager, featureRegistry: FeatureRegistry): void;
    createProposal(agentContext: AgentContext, { connectionRecord, proofFormats, comment, autoAcceptProof, goalCode, goal, parentThreadId, }: CreateProofProposalOptions<PFs>): Promise<{
        proofRecord: ProofExchangeRecord;
        message: AgentMessage;
    }>;
    /**
     * Method called by {@link V2ProposeCredentialHandler} on reception of a propose presentation message
     * We do the necessary processing here to accept the proposal and do the state change, emit event etc.
     * @param messageContext the inbound propose presentation message
     * @returns proof record appropriate for this incoming message (once accepted)
     */
    processProposal(messageContext: InboundMessageContext<V2ProposePresentationMessage>): Promise<ProofExchangeRecord>;
    acceptProposal(agentContext: AgentContext, { proofRecord, proofFormats, autoAcceptProof, comment, goalCode, goal, willConfirm, }: AcceptProofProposalOptions<PFs>): Promise<ProofProtocolMsgReturnType<V2RequestPresentationMessage>>;
    /**
     * Negotiate a proof proposal as verifier (by sending a proof request message) to the connection
     * associated with the proof record.
     *
     * @param options configuration for the request see {@link NegotiateProofProposalOptions}
     * @returns Proof exchange record associated with the proof request
     *
     */
    negotiateProposal(agentContext: AgentContext, { proofRecord, proofFormats, autoAcceptProof, comment, goalCode, goal, willConfirm, }: NegotiateProofProposalOptions<PFs>): Promise<ProofProtocolMsgReturnType<V2RequestPresentationMessage>>;
    /**
     * Create a {@link V2RequestPresentationMessage} as beginning of protocol process.
     * @returns Object containing request message and associated credential record
     *
     */
    createRequest(agentContext: AgentContext, { proofFormats, autoAcceptProof, comment, connectionRecord, parentThreadId, goalCode, goal, willConfirm, }: CreateProofRequestOptions<PFs>): Promise<ProofProtocolMsgReturnType<V2RequestPresentationMessage>>;
    /**
     * Process a received {@link V2RequestPresentationMessage}. This will not accept the proof request
     * or send a proof. It will only update the existing proof record with
     * the information from the proof request message. Use {@link createCredential}
     * after calling this method to create a proof.
     *z
     * @param messageContext The message context containing a v2 proof request message
     * @returns proof record associated with the proof request message
     *
     */
    processRequest(messageContext: InboundMessageContext<V2RequestPresentationMessage>): Promise<ProofExchangeRecord>;
    acceptRequest(agentContext: AgentContext, { proofRecord, autoAcceptProof, comment, proofFormats, goalCode, goal }: AcceptProofRequestOptions<PFs>): Promise<{
        proofRecord: ProofExchangeRecord;
        message: V2PresentationMessage;
    }>;
    /**
     * Create a {@link V2ProposePresentationMessage} as response to a received credential request.
     * To create a proposal not bound to an existing proof exchange, use {@link createProposal}.
     *
     * @param options configuration to use for the proposal
     * @returns Object containing proposal message and associated proof record
     *
     */
    negotiateRequest(agentContext: AgentContext, { proofRecord, proofFormats, autoAcceptProof, comment, goalCode, goal }: NegotiateProofRequestOptions<PFs>): Promise<ProofProtocolMsgReturnType<V2ProposePresentationMessage>>;
    getCredentialsForRequest(agentContext: AgentContext, { proofRecord, proofFormats }: GetCredentialsForRequestOptions<PFs>): Promise<GetCredentialsForRequestReturn<PFs>>;
    selectCredentialsForRequest(agentContext: AgentContext, { proofRecord, proofFormats }: SelectCredentialsForRequestOptions<PFs>): Promise<SelectCredentialsForRequestReturn<PFs>>;
    processPresentation(messageContext: InboundMessageContext<V2PresentationMessage>): Promise<ProofExchangeRecord>;
    acceptPresentation(agentContext: AgentContext, { proofRecord }: AcceptPresentationOptions): Promise<ProofProtocolMsgReturnType<V2PresentationAckMessage>>;
    processAck(messageContext: InboundMessageContext<V2PresentationAckMessage>): Promise<ProofExchangeRecord>;
    createProblemReport(_agentContext: AgentContext, { description, proofRecord }: CreateProofProblemReportOptions): Promise<ProofProtocolMsgReturnType<ProblemReportMessage>>;
    shouldAutoRespondToProposal(agentContext: AgentContext, options: {
        proofRecord: ProofExchangeRecord;
        proposalMessage: V2ProposePresentationMessage;
    }): Promise<boolean>;
    shouldAutoRespondToRequest(agentContext: AgentContext, options: {
        proofRecord: ProofExchangeRecord;
        requestMessage: V2RequestPresentationMessage;
    }): Promise<boolean>;
    shouldAutoRespondToPresentation(agentContext: AgentContext, options: {
        proofRecord: ProofExchangeRecord;
        presentationMessage: V2PresentationMessage;
    }): Promise<boolean>;
    findRequestMessage(agentContext: AgentContext, proofRecordId: string): Promise<V2RequestPresentationMessage | null>;
    findPresentationMessage(agentContext: AgentContext, proofRecordId: string): Promise<V2PresentationMessage | null>;
    findProposalMessage(agentContext: AgentContext, proofRecordId: string): Promise<V2ProposePresentationMessage | null>;
    getFormatData(agentContext: AgentContext, proofRecordId: string): Promise<GetProofFormatDataReturn>;
    /**
     * Get all the format service objects for a given proof format from an incoming message
     * @param messageFormats the format objects containing the format name (eg indy)
     * @return the proof format service objects in an array - derived from format object keys
     */
    private getFormatServicesFromMessage;
    /**
     * Get all the format service objects for a given proof format
     * @param proofFormats the format object containing various optional parameters
     * @return the proof format service objects in an array - derived from format object keys
     */
    private getFormatServices;
    private getFormatServiceForFormatKey;
    private getFormatServiceForFormat;
}
