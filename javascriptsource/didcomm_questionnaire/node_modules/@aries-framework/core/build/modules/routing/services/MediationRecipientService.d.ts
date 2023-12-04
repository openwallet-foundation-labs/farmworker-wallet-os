import type { GetRoutingOptions, RemoveRoutingOptions } from './RoutingService';
import type { AgentContext } from '../../../agent';
import type { AgentMessage } from '../../../agent/AgentMessage';
import type { InboundMessageContext } from '../../../agent/models/InboundMessageContext';
import type { Query } from '../../../storage/StorageService';
import type { ConnectionRecord } from '../../connections';
import type { Routing } from '../../connections/services/ConnectionService';
import type { MediationDenyMessage } from '../messages';
import { EventEmitter } from '../../../agent/EventEmitter';
import { MessageSender } from '../../../agent/MessageSender';
import { Key } from '../../../crypto';
import { ConnectionService } from '../../connections/services/ConnectionService';
import { KeylistUpdateAction, KeylistUpdateResponseMessage, MediationRequestMessage, MediationGrantMessage } from '../messages';
import { KeylistUpdate, KeylistUpdateMessage } from '../messages/KeylistUpdateMessage';
import { MediationRecord } from '../repository/MediationRecord';
import { MediationRepository } from '../repository/MediationRepository';
export declare class MediationRecipientService {
    private mediationRepository;
    private eventEmitter;
    private connectionService;
    private messageSender;
    constructor(connectionService: ConnectionService, messageSender: MessageSender, mediatorRepository: MediationRepository, eventEmitter: EventEmitter);
    createRequest(agentContext: AgentContext, connection: ConnectionRecord): Promise<MediationProtocolMsgReturnType<MediationRequestMessage>>;
    processMediationGrant(messageContext: InboundMessageContext<MediationGrantMessage>): Promise<MediationRecord>;
    processKeylistUpdateResults(messageContext: InboundMessageContext<KeylistUpdateResponseMessage>): Promise<void>;
    keylistUpdateAndAwait(agentContext: AgentContext, mediationRecord: MediationRecord, updates: {
        recipientKey: Key;
        action: KeylistUpdateAction;
    }[], timeoutMs?: number): Promise<MediationRecord>;
    createKeylistUpdateMessage(updates: KeylistUpdate[]): KeylistUpdateMessage;
    addMediationRouting(agentContext: AgentContext, routing: Routing, { mediatorId, useDefaultMediator }?: GetRoutingOptions): Promise<Routing>;
    removeMediationRouting(agentContext: AgentContext, { recipientKeys, mediatorId }: RemoveRoutingOptions): Promise<void>;
    processMediationDeny(messageContext: InboundMessageContext<MediationDenyMessage>): Promise<MediationRecord>;
    /**
     * Update the record to a new state and emit an state changed event. Also updates the record
     * in storage.
     *
     * @param MediationRecord The proof record to update the state for
     * @param newState The state to update to
     *
     */
    private updateState;
    private emitStateChangedEvent;
    getById(agentContext: AgentContext, id: string): Promise<MediationRecord>;
    findByConnectionId(agentContext: AgentContext, connectionId: string): Promise<MediationRecord | null>;
    getMediators(agentContext: AgentContext): Promise<MediationRecord[]>;
    findAllMediatorsByQuery(agentContext: AgentContext, query: Query<MediationRecord>): Promise<MediationRecord[]>;
    findDefaultMediator(agentContext: AgentContext): Promise<MediationRecord | null>;
    discoverMediation(agentContext: AgentContext, mediatorId?: string): Promise<MediationRecord | undefined>;
    setDefaultMediator(agentContext: AgentContext, mediator: MediationRecord): Promise<void>;
    clearDefaultMediator(agentContext: AgentContext): Promise<void>;
    private updateUseDidKeysFlag;
}
export interface MediationProtocolMsgReturnType<MessageType extends AgentMessage> {
    message: MessageType;
    mediationRecord: MediationRecord;
}
