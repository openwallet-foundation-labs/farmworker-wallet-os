import type { AgentContext } from '../../../../agent';
import type { AgentMessage } from '../../../../agent/AgentMessage';
import type { FeatureRegistry } from '../../../../agent/FeatureRegistry';
import type { MessageHandlerInboundMessage } from '../../../../agent/MessageHandler';
import type { InboundMessageContext } from '../../../../agent/models/InboundMessageContext';
import type { DependencyManager } from '../../../../plugins';
import type { ProblemReportMessage } from '../../../problem-reports';
import type { CredentialFormat, CredentialFormatService, ExtractCredentialFormats } from '../../formats';
import type { CredentialProtocol } from '../CredentialProtocol';
import type { AcceptCredentialOptions, AcceptCredentialOfferOptions, AcceptCredentialProposalOptions, AcceptCredentialRequestOptions, CreateCredentialOfferOptions, CreateCredentialProposalOptions, CreateCredentialRequestOptions, CredentialProtocolMsgReturnType, CreateCredentialProblemReportOptions, GetCredentialFormatDataReturn, NegotiateCredentialOfferOptions, NegotiateCredentialProposalOptions } from '../CredentialProtocolOptions';
import { CredentialExchangeRecord } from '../../repository';
import { BaseCredentialProtocol } from '../BaseCredentialProtocol';
import { V2OfferCredentialHandler } from './handlers';
import { V2CredentialAckMessage, V2IssueCredentialMessage, V2OfferCredentialMessage, V2ProposeCredentialMessage, V2RequestCredentialMessage } from './messages';
export interface V2CredentialProtocolConfig<CredentialFormatServices extends CredentialFormatService[]> {
    credentialFormats: CredentialFormatServices;
}
export declare class V2CredentialProtocol<CFs extends CredentialFormatService[] = CredentialFormatService[]> extends BaseCredentialProtocol<CFs> implements CredentialProtocol<CFs> {
    private credentialFormatCoordinator;
    private credentialFormats;
    constructor({ credentialFormats }: V2CredentialProtocolConfig<CFs>);
    /**
     * The version of the issue credential protocol this service supports
     */
    readonly version: "v2";
    /**
     * Registers the protocol implementation (handlers, feature registry) on the agent.
     */
    register(dependencyManager: DependencyManager, featureRegistry: FeatureRegistry): void;
    /**
     * Create a {@link V2ProposeCredentialMessage} not bound to an existing credential exchange.
     *
     * @param proposal The ProposeCredentialOptions object containing the important fields for the credential message
     * @returns Object containing proposal message and associated credential record
     *
     */
    createProposal(agentContext: AgentContext, { connectionRecord, credentialFormats, comment, goal, goalCode, autoAcceptCredential, }: CreateCredentialProposalOptions<CFs>): Promise<CredentialProtocolMsgReturnType<AgentMessage>>;
    /**
     * Method called by {@link V2ProposeCredentialHandler} on reception of a propose credential message
     * We do the necessary processing here to accept the proposal and do the state change, emit event etc.
     * @param messageContext the inbound propose credential message
     * @returns credential record appropriate for this incoming message (once accepted)
     */
    processProposal(messageContext: InboundMessageContext<V2ProposeCredentialMessage>): Promise<CredentialExchangeRecord>;
    acceptProposal(agentContext: AgentContext, { credentialRecord, credentialFormats, autoAcceptCredential, comment, goal, goalCode, }: AcceptCredentialProposalOptions<CFs>): Promise<CredentialProtocolMsgReturnType<V2OfferCredentialMessage>>;
    /**
     * Negotiate a credential proposal as issuer (by sending a credential offer message) to the connection
     * associated with the credential record.
     *
     * @param options configuration for the offer see {@link NegotiateCredentialProposalOptions}
     * @returns Credential exchange record associated with the credential offer
     *
     */
    negotiateProposal(agentContext: AgentContext, { credentialRecord, credentialFormats, autoAcceptCredential, comment, goal, goalCode, }: NegotiateCredentialProposalOptions<CFs>): Promise<CredentialProtocolMsgReturnType<V2OfferCredentialMessage>>;
    /**
     * Create a {@link V2OfferCredentialMessage} as beginning of protocol process. If no connectionId is provided, the
     * exchange will be created without a connection for usage in oob and connection-less issuance.
     *
     * @param formatService {@link CredentialFormatService} the format service object containing format-specific logic
     * @param options attributes of the original offer
     * @returns Object containing offer message and associated credential record
     *
     */
    createOffer(agentContext: AgentContext, { credentialFormats, autoAcceptCredential, comment, goal, goalCode, connectionRecord, }: CreateCredentialOfferOptions<CFs>): Promise<CredentialProtocolMsgReturnType<V2OfferCredentialMessage>>;
    /**
     * Method called by {@link V2OfferCredentialHandler} on reception of a offer credential message
     * We do the necessary processing here to accept the offer and do the state change, emit event etc.
     * @param messageContext the inbound offer credential message
     * @returns credential record appropriate for this incoming message (once accepted)
     */
    processOffer(messageContext: MessageHandlerInboundMessage<V2OfferCredentialHandler>): Promise<CredentialExchangeRecord>;
    acceptOffer(agentContext: AgentContext, { credentialRecord, autoAcceptCredential, comment, goal, goalCode, credentialFormats, }: AcceptCredentialOfferOptions<CFs>): Promise<{
        credentialRecord: CredentialExchangeRecord;
        message: V2RequestCredentialMessage;
    }>;
    /**
     * Create a {@link ProposePresentationMessage} as response to a received credential offer.
     * To create a proposal not bound to an existing credential exchange, use {@link createProposal}.
     *
     * @param options configuration to use for the proposal
     * @returns Object containing proposal message and associated credential record
     *
     */
    negotiateOffer(agentContext: AgentContext, { credentialRecord, credentialFormats, autoAcceptCredential, comment, goal, goalCode, }: NegotiateCredentialOfferOptions<CFs>): Promise<CredentialProtocolMsgReturnType<V2ProposeCredentialMessage>>;
    /**
     * Create a {@link V2RequestCredentialMessage} as beginning of protocol process.
     * @returns Object containing offer message and associated credential record
     *
     */
    createRequest(agentContext: AgentContext, { credentialFormats, autoAcceptCredential, comment, goal, goalCode, connectionRecord, }: CreateCredentialRequestOptions<CFs>): Promise<CredentialProtocolMsgReturnType<V2RequestCredentialMessage>>;
    /**
     * Process a received {@link RequestCredentialMessage}. This will not accept the credential request
     * or send a credential. It will only update the existing credential record with
     * the information from the credential request message. Use {@link createCredential}
     * after calling this method to create a credential.
     *z
     * @param messageContext The message context containing a v2 credential request message
     * @returns credential record associated with the credential request message
     *
     */
    processRequest(messageContext: InboundMessageContext<V2RequestCredentialMessage>): Promise<CredentialExchangeRecord>;
    acceptRequest(agentContext: AgentContext, { credentialRecord, autoAcceptCredential, comment, goal, goalCode, credentialFormats, }: AcceptCredentialRequestOptions<CFs>): Promise<{
        credentialRecord: CredentialExchangeRecord;
        message: V2IssueCredentialMessage;
    }>;
    /**
     * Process a received {@link V2IssueCredentialMessage}. This will not accept the credential
     * or send a credential acknowledgement. It will only update the existing credential record with
     * the information from the issue credential message. Use {@link createAck}
     * after calling this method to create a credential acknowledgement.
     *
     * @param messageContext The message context containing an issue credential message
     *
     * @returns credential record associated with the issue credential message
     *
     */
    processCredential(messageContext: InboundMessageContext<V2IssueCredentialMessage>): Promise<CredentialExchangeRecord>;
    /**
     * Create a {@link V2CredentialAckMessage} as response to a received credential.
     *
     * @param credentialRecord The credential record for which to create the credential acknowledgement
     * @returns Object containing credential acknowledgement message and associated credential record
     *
     */
    acceptCredential(agentContext: AgentContext, { credentialRecord }: AcceptCredentialOptions): Promise<CredentialProtocolMsgReturnType<V2CredentialAckMessage>>;
    /**
     * Process a received {@link CredentialAckMessage}.
     *
     * @param messageContext The message context containing a credential acknowledgement message
     * @returns credential record associated with the credential acknowledgement message
     *
     */
    processAck(messageContext: InboundMessageContext<V2CredentialAckMessage>): Promise<CredentialExchangeRecord>;
    /**
     * Create a {@link V2CredentialProblemReportMessage} to be sent.
     *
     * @param message message to send
     * @returns a {@link V2CredentialProblemReportMessage}
     *
     */
    createProblemReport(_agentContext: AgentContext, { credentialRecord, description }: CreateCredentialProblemReportOptions): Promise<CredentialProtocolMsgReturnType<ProblemReportMessage>>;
    shouldAutoRespondToProposal(agentContext: AgentContext, options: {
        credentialRecord: CredentialExchangeRecord;
        proposalMessage: V2ProposeCredentialMessage;
    }): Promise<boolean>;
    shouldAutoRespondToOffer(agentContext: AgentContext, options: {
        credentialRecord: CredentialExchangeRecord;
        offerMessage: V2OfferCredentialMessage;
    }): Promise<boolean>;
    shouldAutoRespondToRequest(agentContext: AgentContext, options: {
        credentialRecord: CredentialExchangeRecord;
        requestMessage: V2RequestCredentialMessage;
    }): Promise<boolean>;
    shouldAutoRespondToCredential(agentContext: AgentContext, options: {
        credentialRecord: CredentialExchangeRecord;
        credentialMessage: V2IssueCredentialMessage;
    }): Promise<boolean>;
    findProposalMessage(agentContext: AgentContext, credentialExchangeId: string): Promise<V2ProposeCredentialMessage | null>;
    findOfferMessage(agentContext: AgentContext, credentialExchangeId: string): Promise<V2OfferCredentialMessage | null>;
    findRequestMessage(agentContext: AgentContext, credentialExchangeId: string): Promise<V2RequestCredentialMessage | null>;
    findCredentialMessage(agentContext: AgentContext, credentialExchangeId: string): Promise<V2IssueCredentialMessage | null>;
    getFormatData(agentContext: AgentContext, credentialExchangeId: string): Promise<GetCredentialFormatDataReturn<ExtractCredentialFormats<CFs>>>;
    /**
     * Get all the format service objects for a given credential format from an incoming message
     * @param messageFormats the format objects containing the format name (eg indy)
     * @return the credential format service objects in an array - derived from format object keys
     */
    private getFormatServicesFromMessage;
    /**
     * Get all the format service objects for a given credential format
     * @param credentialFormats the format object containing various optional parameters
     * @return the credential format service objects in an array - derived from format object keys
     */
    private getFormatServices;
    private getFormatServiceForFormatKey;
    private getFormatServiceForFormat;
    protected getFormatServiceForRecordType(credentialRecordType: string): CredentialFormatService<CredentialFormat>;
}
