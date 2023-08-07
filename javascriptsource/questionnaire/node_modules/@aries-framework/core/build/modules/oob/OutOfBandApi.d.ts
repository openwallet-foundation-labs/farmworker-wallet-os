import type { AgentMessage } from '../../agent/AgentMessage';
import type { Attachment } from '../../decorators/attachment/Attachment';
import type { Query } from '../../storage/StorageService';
import type { ConnectionInvitationMessage, ConnectionRecord, Routing } from '../connections';
import { AgentContext } from '../../agent';
import { EventEmitter } from '../../agent/EventEmitter';
import { MessageHandlerRegistry } from '../../agent/MessageHandlerRegistry';
import { MessageSender } from '../../agent/MessageSender';
import { Logger } from '../../logger';
import { DidCommMessageRepository } from '../../storage';
import { ConnectionsApi, HandshakeProtocol } from '../connections';
import { DidCommDocumentService } from '../didcomm';
import { RoutingService } from '../routing/services/RoutingService';
import { OutOfBandService } from './OutOfBandService';
import { OutOfBandInvitation } from './messages';
import { OutOfBandRecord } from './repository/OutOfBandRecord';
export interface CreateOutOfBandInvitationConfig {
    label?: string;
    alias?: string;
    imageUrl?: string;
    goalCode?: string;
    goal?: string;
    handshake?: boolean;
    handshakeProtocols?: HandshakeProtocol[];
    messages?: AgentMessage[];
    multiUseInvitation?: boolean;
    autoAcceptConnection?: boolean;
    routing?: Routing;
    appendedAttachments?: Attachment[];
}
export interface CreateLegacyInvitationConfig {
    label?: string;
    alias?: string;
    imageUrl?: string;
    multiUseInvitation?: boolean;
    autoAcceptConnection?: boolean;
    routing?: Routing;
}
interface BaseReceiveOutOfBandInvitationConfig {
    label?: string;
    alias?: string;
    imageUrl?: string;
    autoAcceptInvitation?: boolean;
    autoAcceptConnection?: boolean;
    reuseConnection?: boolean;
    routing?: Routing;
    acceptInvitationTimeoutMs?: number;
    isImplicit?: boolean;
}
export type ReceiveOutOfBandInvitationConfig = Omit<BaseReceiveOutOfBandInvitationConfig, 'isImplicit'>;
export interface ReceiveOutOfBandImplicitInvitationConfig extends Omit<BaseReceiveOutOfBandInvitationConfig, 'isImplicit' | 'reuseConnection'> {
    did: string;
    handshakeProtocols?: HandshakeProtocol[];
}
export declare class OutOfBandApi {
    private outOfBandService;
    private routingService;
    private connectionsApi;
    private didCommMessageRepository;
    private messageHandlerRegistry;
    private didCommDocumentService;
    private messageSender;
    private eventEmitter;
    private agentContext;
    private logger;
    constructor(messageHandlerRegistry: MessageHandlerRegistry, didCommDocumentService: DidCommDocumentService, outOfBandService: OutOfBandService, routingService: RoutingService, connectionsApi: ConnectionsApi, didCommMessageRepository: DidCommMessageRepository, messageSender: MessageSender, eventEmitter: EventEmitter, logger: Logger, agentContext: AgentContext);
    /**
     * Creates an outbound out-of-band record containing out-of-band invitation message defined in
     * Aries RFC 0434: Out-of-Band Protocol 1.1.
     *
     * It automatically adds all supported handshake protocols by agent to `handshake_protocols`. You
     * can modify this by setting `handshakeProtocols` in `config` parameter. If you want to create
     * invitation without handshake, you can set `handshake` to `false`.
     *
     * If `config` parameter contains `messages` it adds them to `requests~attach` attribute.
     *
     * Agent role: sender (inviter)
     *
     * @param config configuration of how out-of-band invitation should be created
     * @returns out-of-band record
     */
    createInvitation(config?: CreateOutOfBandInvitationConfig): Promise<OutOfBandRecord>;
    /**
     * Creates an outbound out-of-band record in the same way how `createInvitation` method does it,
     * but it also converts out-of-band invitation message to an "legacy" invitation message defined
     * in RFC 0160: Connection Protocol and returns it together with out-of-band record.
     *
     * Agent role: sender (inviter)
     *
     * @param config configuration of how a connection invitation should be created
     * @returns out-of-band record and connection invitation
     */
    createLegacyInvitation(config?: CreateLegacyInvitationConfig): Promise<{
        outOfBandRecord: OutOfBandRecord;
        invitation: ConnectionInvitationMessage;
    }>;
    createLegacyConnectionlessInvitation<Message extends AgentMessage>(config: {
        recordId: string;
        message: Message;
        domain: string;
        routing?: Routing;
    }): Promise<{
        message: Message;
        invitationUrl: string;
    }>;
    /**
     * Parses URL, decodes invitation and calls `receiveMessage` with parsed invitation message.
     *
     * Agent role: receiver (invitee)
     *
     * @param invitationUrl url containing a base64 encoded invitation to receive
     * @param config configuration of how out-of-band invitation should be processed
     * @returns out-of-band record and connection record if one has been created
     */
    receiveInvitationFromUrl(invitationUrl: string, config?: ReceiveOutOfBandInvitationConfig): Promise<{
        outOfBandRecord: OutOfBandRecord;
        connectionRecord?: ConnectionRecord | undefined;
    }>;
    /**
     * Parses URL containing encoded invitation and returns invitation message.
     *
     * Will fetch the url if the url does not contain a base64 encoded invitation.
     *
     * @param invitationUrl URL containing encoded invitation
     *
     * @returns OutOfBandInvitation
     */
    parseInvitation(invitationUrl: string): Promise<OutOfBandInvitation>;
    /**
     * Creates inbound out-of-band record and assigns out-of-band invitation message to it if the
     * message is valid. It automatically passes out-of-band invitation for further processing to
     * `acceptInvitation` method. If you don't want to do that you can set `autoAcceptInvitation`
     * attribute in `config` parameter to `false` and accept the message later by calling
     * `acceptInvitation`.
     *
     * It supports both OOB (Aries RFC 0434: Out-of-Band Protocol 1.1) and Connection Invitation
     * (0160: Connection Protocol).
     *
     * Agent role: receiver (invitee)
     *
     * @param invitation either OutOfBandInvitation or ConnectionInvitationMessage
     * @param config config for handling of invitation
     *
     * @returns out-of-band record and connection record if one has been created.
     */
    receiveInvitation(invitation: OutOfBandInvitation | ConnectionInvitationMessage, config?: ReceiveOutOfBandInvitationConfig): Promise<{
        outOfBandRecord: OutOfBandRecord;
        connectionRecord?: ConnectionRecord;
    }>;
    /**
     * Creates inbound out-of-band record from an implicit invitation, given as a public DID the agent
     * should be capable of resolving. It automatically passes out-of-band invitation for further
     * processing to `acceptInvitation` method. If you don't want to do that you can set
     * `autoAcceptInvitation` attribute in `config` parameter to `false` and accept the message later by
     * calling `acceptInvitation`.
     *
     * It supports both OOB (Aries RFC 0434: Out-of-Band Protocol 1.1) and Connection Invitation
     * (0160: Connection Protocol). Handshake protocol to be used depends on handshakeProtocols
     * (DID Exchange by default)
     *
     * Agent role: receiver (invitee)
     *
     * @param config config for creating and handling invitation
     *
     * @returns out-of-band record and connection record if one has been created.
     */
    receiveImplicitInvitation(config: ReceiveOutOfBandImplicitInvitationConfig): Promise<{
        outOfBandRecord: OutOfBandRecord;
        connectionRecord?: ConnectionRecord | undefined;
    }>;
    /**
     * Internal receive invitation method, for both explicit and implicit OOB invitations
     */
    private _receiveInvitation;
    /**
     * Creates a connection if the out-of-band invitation message contains `handshake_protocols`
     * attribute, except for the case when connection already exists and `reuseConnection` is enabled.
     *
     * It passes first supported message from `requests~attach` attribute to the agent, except for the
     * case reuse of connection is applied when it just sends `handshake-reuse` message to existing
     * connection.
     *
     * Agent role: receiver (invitee)
     *
     * @param outOfBandId
     * @param config
     * @returns out-of-band record and connection record if one has been created.
     */
    acceptInvitation(outOfBandId: string, config: {
        autoAcceptConnection?: boolean;
        reuseConnection?: boolean;
        label?: string;
        alias?: string;
        imageUrl?: string;
        routing?: Routing;
        timeoutMs?: number;
    }): Promise<{
        outOfBandRecord: OutOfBandRecord;
        connectionRecord: ConnectionRecord;
    } | {
        outOfBandRecord: OutOfBandRecord;
        connectionRecord?: undefined;
    }>;
    findByReceivedInvitationId(receivedInvitationId: string): Promise<OutOfBandRecord | null>;
    findByCreatedInvitationId(createdInvitationId: string): Promise<OutOfBandRecord | null>;
    /**
     * Retrieve all out of bands records
     *
     * @returns List containing all  out of band records
     */
    getAll(): Promise<OutOfBandRecord[]>;
    /**
     * Retrieve all out of bands records by specified query param
     *
     * @returns List containing all out of band records matching specified query params
     */
    findAllByQuery(query: Query<OutOfBandRecord>): Promise<OutOfBandRecord[]>;
    /**
     * Retrieve a out of band record by id
     *
     * @param outOfBandId The  out of band record id
     * @throws {RecordNotFoundError} If no record is found
     * @return The out of band record
     *
     */
    getById(outOfBandId: string): Promise<OutOfBandRecord>;
    /**
     * Find an out of band record by id
     *
     * @param outOfBandId the  out of band record id
     * @returns The out of band record or null if not found
     */
    findById(outOfBandId: string): Promise<OutOfBandRecord | null>;
    /**
     * Delete an out of band record by id
     *
     * @param outOfBandId the out of band record id
     */
    deleteById(outOfBandId: string): Promise<void>;
    private assertHandshakeProtocols;
    private areHandshakeProtocolsSupported;
    private getSupportedHandshakeProtocols;
    private getFirstSupportedProtocol;
    private findExistingConnection;
    private emitWithConnection;
    private emitWithServices;
    private handleHandshakeReuse;
    private registerMessageHandlers;
}
export {};
