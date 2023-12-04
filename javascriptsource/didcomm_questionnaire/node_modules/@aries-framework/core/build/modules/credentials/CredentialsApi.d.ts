import type { AcceptCredentialOptions, AcceptCredentialOfferOptions, AcceptCredentialProposalOptions, AcceptCredentialRequestOptions, CreateCredentialOfferOptions, FindCredentialMessageReturn, FindCredentialOfferMessageReturn, FindCredentialProposalMessageReturn, FindCredentialRequestMessageReturn, GetCredentialFormatDataReturn, NegotiateCredentialOfferOptions, NegotiateCredentialProposalOptions, OfferCredentialOptions, ProposeCredentialOptions, SendCredentialProblemReportOptions, DeleteCredentialOptions } from './CredentialsApiOptions';
import type { CredentialProtocol } from './protocol/CredentialProtocol';
import type { CredentialFormatsFromProtocols } from './protocol/CredentialProtocolOptions';
import type { CredentialExchangeRecord } from './repository/CredentialExchangeRecord';
import type { AgentMessage } from '../../agent/AgentMessage';
import type { Query } from '../../storage/StorageService';
import { AgentContext } from '../../agent';
import { MessageSender } from '../../agent/MessageSender';
import { Logger } from '../../logger';
import { DidCommMessageRepository } from '../../storage/didcomm/DidCommMessageRepository';
import { ConnectionService } from '../connections/services';
import { RoutingService } from '../routing/services/RoutingService';
import { CredentialsModuleConfig } from './CredentialsModuleConfig';
import { RevocationNotificationService } from './protocol/revocation-notification/services';
import { CredentialRepository } from './repository/CredentialRepository';
export interface CredentialsApi<CPs extends CredentialProtocol[]> {
    proposeCredential(options: ProposeCredentialOptions<CPs>): Promise<CredentialExchangeRecord>;
    acceptProposal(options: AcceptCredentialProposalOptions<CPs>): Promise<CredentialExchangeRecord>;
    negotiateProposal(options: NegotiateCredentialProposalOptions<CPs>): Promise<CredentialExchangeRecord>;
    offerCredential(options: OfferCredentialOptions<CPs>): Promise<CredentialExchangeRecord>;
    acceptOffer(options: AcceptCredentialOfferOptions<CPs>): Promise<CredentialExchangeRecord>;
    declineOffer(credentialRecordId: string): Promise<CredentialExchangeRecord>;
    negotiateOffer(options: NegotiateCredentialOfferOptions<CPs>): Promise<CredentialExchangeRecord>;
    acceptRequest(options: AcceptCredentialRequestOptions<CPs>): Promise<CredentialExchangeRecord>;
    acceptCredential(options: AcceptCredentialOptions): Promise<CredentialExchangeRecord>;
    createOffer(options: CreateCredentialOfferOptions<CPs>): Promise<{
        message: AgentMessage;
        credentialRecord: CredentialExchangeRecord;
    }>;
    sendProblemReport(options: SendCredentialProblemReportOptions): Promise<CredentialExchangeRecord>;
    getAll(): Promise<CredentialExchangeRecord[]>;
    findAllByQuery(query: Query<CredentialExchangeRecord>): Promise<CredentialExchangeRecord[]>;
    getById(credentialRecordId: string): Promise<CredentialExchangeRecord>;
    findById(credentialRecordId: string): Promise<CredentialExchangeRecord | null>;
    deleteById(credentialRecordId: string, options?: DeleteCredentialOptions): Promise<void>;
    update(credentialRecord: CredentialExchangeRecord): Promise<void>;
    getFormatData(credentialRecordId: string): Promise<GetCredentialFormatDataReturn<CredentialFormatsFromProtocols<CPs>>>;
    findProposalMessage(credentialExchangeId: string): Promise<FindCredentialProposalMessageReturn<CPs>>;
    findOfferMessage(credentialExchangeId: string): Promise<FindCredentialOfferMessageReturn<CPs>>;
    findRequestMessage(credentialExchangeId: string): Promise<FindCredentialRequestMessageReturn<CPs>>;
    findCredentialMessage(credentialExchangeId: string): Promise<FindCredentialMessageReturn<CPs>>;
}
export declare class CredentialsApi<CPs extends CredentialProtocol[]> implements CredentialsApi<CPs> {
    /**
     * Configuration for the credentials module
     */
    readonly config: CredentialsModuleConfig<CPs>;
    private connectionService;
    private messageSender;
    private credentialRepository;
    private agentContext;
    private didCommMessageRepository;
    private routingService;
    private logger;
    constructor(messageSender: MessageSender, connectionService: ConnectionService, agentContext: AgentContext, logger: Logger, credentialRepository: CredentialRepository, mediationRecipientService: RoutingService, didCommMessageRepository: DidCommMessageRepository, _revocationNotificationService: RevocationNotificationService, config: CredentialsModuleConfig<CPs>);
    private getProtocol;
    private getServiceForCredentialExchangeId;
}
