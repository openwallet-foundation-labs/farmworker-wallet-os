import type { AgentContext } from '../../agent';
import type { InboundMessageContext } from '../../agent/models/InboundMessageContext';
import type { Key } from '../../crypto';
import type { Query } from '../../storage/StorageService';
import type { ConnectionRecord } from '../connections';
import type { HandshakeProtocol } from '../connections/models';
import { EventEmitter } from '../../agent/EventEmitter';
import { OutOfBandState } from './domain/OutOfBandState';
import { HandshakeReuseMessage } from './messages';
import { HandshakeReuseAcceptedMessage } from './messages/HandshakeReuseAcceptedMessage';
import { OutOfBandRecord, OutOfBandRepository } from './repository';
export interface CreateFromImplicitInvitationConfig {
    did: string;
    threadId: string;
    handshakeProtocols: HandshakeProtocol[];
    autoAcceptConnection?: boolean;
    recipientKey: Key;
}
export declare class OutOfBandService {
    private outOfBandRepository;
    private eventEmitter;
    constructor(outOfBandRepository: OutOfBandRepository, eventEmitter: EventEmitter);
    /**
     * Creates an Out of Band record from a Connection/DIDExchange request started by using
     * a publicly resolvable DID this agent can control
     */
    createFromImplicitInvitation(agentContext: AgentContext, config: CreateFromImplicitInvitationConfig): Promise<OutOfBandRecord>;
    processHandshakeReuse(messageContext: InboundMessageContext<HandshakeReuseMessage>): Promise<HandshakeReuseAcceptedMessage>;
    processHandshakeReuseAccepted(messageContext: InboundMessageContext<HandshakeReuseAcceptedMessage>): Promise<void>;
    createHandShakeReuse(agentContext: AgentContext, outOfBandRecord: OutOfBandRecord, connectionRecord: ConnectionRecord): Promise<HandshakeReuseMessage>;
    save(agentContext: AgentContext, outOfBandRecord: OutOfBandRecord): Promise<void>;
    updateState(agentContext: AgentContext, outOfBandRecord: OutOfBandRecord, newState: OutOfBandState): Promise<void>;
    emitStateChangedEvent(agentContext: AgentContext, outOfBandRecord: OutOfBandRecord, previousState: OutOfBandState | null): void;
    findById(agentContext: AgentContext, outOfBandRecordId: string): Promise<OutOfBandRecord | null>;
    getById(agentContext: AgentContext, outOfBandRecordId: string): Promise<OutOfBandRecord>;
    findByReceivedInvitationId(agentContext: AgentContext, receivedInvitationId: string): Promise<OutOfBandRecord | null>;
    findByCreatedInvitationId(agentContext: AgentContext, createdInvitationId: string, threadId?: string): Promise<OutOfBandRecord | null>;
    findCreatedByRecipientKey(agentContext: AgentContext, recipientKey: Key): Promise<OutOfBandRecord | null>;
    getAll(agentContext: AgentContext): Promise<OutOfBandRecord[]>;
    findAllByQuery(agentContext: AgentContext, query: Query<OutOfBandRecord>): Promise<OutOfBandRecord[]>;
    deleteById(agentContext: AgentContext, outOfBandId: string): Promise<void>;
}
