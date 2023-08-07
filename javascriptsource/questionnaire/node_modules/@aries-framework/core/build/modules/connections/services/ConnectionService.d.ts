import type { AgentContext } from '../../../agent';
import type { AgentMessage } from '../../../agent/AgentMessage';
import type { InboundMessageContext } from '../../../agent/models/InboundMessageContext';
import type { Query } from '../../../storage/StorageService';
import type { AckMessage } from '../../common';
import type { OutOfBandRecord } from '../../oob/repository';
import type { ConnectionProblemReportMessage } from '../messages';
import type { ConnectionType } from '../models';
import type { ConnectionRecordProps } from '../repository/ConnectionRecord';
import { EventEmitter } from '../../../agent/EventEmitter';
import { Key } from '../../../crypto';
import { Logger } from '../../../logger';
import { DidRegistrarService } from '../../dids';
import { DidRepository } from '../../dids/repository';
import { ConnectionRequestMessage, ConnectionResponseMessage, TrustPingMessage } from '../messages';
import { DidExchangeRole, DidExchangeState } from '../models';
import { ConnectionRecord } from '../repository/ConnectionRecord';
import { ConnectionRepository } from '../repository/ConnectionRepository';
export interface ConnectionRequestParams {
    label?: string;
    imageUrl?: string;
    alias?: string;
    routing: Routing;
    autoAcceptConnection?: boolean;
}
export declare class ConnectionService {
    private connectionRepository;
    private didRepository;
    private didRegistrarService;
    private eventEmitter;
    private logger;
    constructor(logger: Logger, connectionRepository: ConnectionRepository, didRepository: DidRepository, didRegistrarService: DidRegistrarService, eventEmitter: EventEmitter);
    /**
     * Create a connection request message for a given out-of-band.
     *
     * @param outOfBandRecord out-of-band record for which to create a connection request
     * @param config config for creation of connection request
     * @returns outbound message containing connection request
     */
    createRequest(agentContext: AgentContext, outOfBandRecord: OutOfBandRecord, config: ConnectionRequestParams): Promise<ConnectionProtocolMsgReturnType<ConnectionRequestMessage>>;
    processRequest(messageContext: InboundMessageContext<ConnectionRequestMessage>, outOfBandRecord: OutOfBandRecord): Promise<ConnectionRecord>;
    /**
     * Create a connection response message for the connection with the specified connection id.
     *
     * @param connectionRecord the connection for which to create a connection response
     * @returns outbound message containing connection response
     */
    createResponse(agentContext: AgentContext, connectionRecord: ConnectionRecord, outOfBandRecord: OutOfBandRecord, routing?: Routing): Promise<ConnectionProtocolMsgReturnType<ConnectionResponseMessage>>;
    /**
     * Process a received connection response message. This will not accept the connection request
     * or send a connection acknowledgement message. It will only update the existing connection record
     * with all the new information from the connection response message. Use {@link ConnectionService.createTrustPing}
     * after calling this function to create a trust ping message.
     *
     * @param messageContext the message context containing a connection response message
     * @returns updated connection record
     */
    processResponse(messageContext: InboundMessageContext<ConnectionResponseMessage>, outOfBandRecord: OutOfBandRecord): Promise<ConnectionRecord>;
    /**
     * Create a trust ping message for the connection with the specified connection id.
     *
     * By default a trust ping message should elicit a response. If this is not desired the
     * `config.responseRequested` property can be set to `false`.
     *
     * @param connectionRecord the connection for which to create a trust ping message
     * @param config the config for the trust ping message
     * @returns outbound message containing trust ping message
     */
    createTrustPing(agentContext: AgentContext, connectionRecord: ConnectionRecord, config?: {
        responseRequested?: boolean;
        comment?: string;
    }): Promise<ConnectionProtocolMsgReturnType<TrustPingMessage>>;
    /**
     * Process a received ack message. This will update the state of the connection
     * to Completed if this is not already the case.
     *
     * @param messageContext the message context containing an ack message
     * @returns updated connection record
     */
    processAck(messageContext: InboundMessageContext<AckMessage>): Promise<ConnectionRecord>;
    /**
     * Process a received {@link ProblemReportMessage}.
     *
     * @param messageContext The message context containing a connection problem report message
     * @returns connection record associated with the connection problem report message
     *
     */
    processProblemReport(messageContext: InboundMessageContext<ConnectionProblemReportMessage>): Promise<ConnectionRecord>;
    /**
     * Assert that an inbound message either has a connection associated with it,
     * or has everything correctly set up for connection-less exchange.
     *
     * @param messageContext - the inbound message context
     * @param previousRespondence - previous sent and received message to determine if a valid service decorator is present
     */
    assertConnectionOrServiceDecorator(messageContext: InboundMessageContext, { previousSentMessage, previousReceivedMessage, }?: {
        previousSentMessage?: AgentMessage | null;
        previousReceivedMessage?: AgentMessage | null;
    }): void;
    updateState(agentContext: AgentContext, connectionRecord: ConnectionRecord, newState: DidExchangeState): Promise<void>;
    private emitStateChangedEvent;
    update(agentContext: AgentContext, connectionRecord: ConnectionRecord): Promise<void>;
    /**
     * Retrieve all connections records
     *
     * @returns List containing all connection records
     */
    getAll(agentContext: AgentContext): Promise<ConnectionRecord[]>;
    /**
     * Retrieve a connection record by id
     *
     * @param connectionId The connection record id
     * @throws {RecordNotFoundError} If no record is found
     * @return The connection record
     *
     */
    getById(agentContext: AgentContext, connectionId: string): Promise<ConnectionRecord>;
    /**
     * Find a connection record by id
     *
     * @param connectionId the connection record id
     * @returns The connection record or null if not found
     */
    findById(agentContext: AgentContext, connectionId: string): Promise<ConnectionRecord | null>;
    /**
     * Delete a connection record by id
     *
     * @param connectionId the connection record id
     */
    deleteById(agentContext: AgentContext, connectionId: string): Promise<void>;
    findByDids(agentContext: AgentContext, query: {
        ourDid: string;
        theirDid: string;
    }): Promise<ConnectionRecord | null>;
    /**
     * Retrieve a connection record by thread id
     *
     * @param threadId The thread id
     * @throws {RecordNotFoundError} If no record is found
     * @throws {RecordDuplicateError} If multiple records are found
     * @returns The connection record
     */
    getByThreadId(agentContext: AgentContext, threadId: string): Promise<ConnectionRecord>;
    getByRoleAndThreadId(agentContext: AgentContext, role: DidExchangeRole, threadId: string): Promise<ConnectionRecord>;
    findByTheirDid(agentContext: AgentContext, theirDid: string): Promise<ConnectionRecord | null>;
    findByOurDid(agentContext: AgentContext, ourDid: string): Promise<ConnectionRecord | null>;
    findAllByOutOfBandId(agentContext: AgentContext, outOfBandId: string): Promise<ConnectionRecord[]>;
    findAllByConnectionTypes(agentContext: AgentContext, connectionTypes: Array<ConnectionType | string>): Promise<ConnectionRecord[]>;
    findByInvitationDid(agentContext: AgentContext, invitationDid: string): Promise<ConnectionRecord[]>;
    findByKeys(agentContext: AgentContext, { senderKey, recipientKey }: {
        senderKey: Key;
        recipientKey: Key;
    }): Promise<ConnectionRecord | null>;
    findAllByQuery(agentContext: AgentContext, query: Query<ConnectionRecord>): Promise<ConnectionRecord[]>;
    createConnection(agentContext: AgentContext, options: ConnectionRecordProps): Promise<ConnectionRecord>;
    addConnectionType(agentContext: AgentContext, connectionRecord: ConnectionRecord, type: string): Promise<void>;
    removeConnectionType(agentContext: AgentContext, connectionRecord: ConnectionRecord, type: string): Promise<void>;
    getConnectionTypes(connectionRecord: ConnectionRecord): Promise<string[]>;
    private createDid;
    private createDidDoc;
    private createDidDocFromOutOfBandDidCommServices;
    returnWhenIsConnected(agentContext: AgentContext, connectionId: string, timeoutMs?: number): Promise<ConnectionRecord>;
}
export interface Routing {
    endpoints: string[];
    recipientKey: Key;
    routingKeys: Key[];
    mediatorId?: string;
}
export interface ConnectionProtocolMsgReturnType<MessageType extends AgentMessage> {
    message: MessageType;
    connectionRecord: ConnectionRecord;
}
