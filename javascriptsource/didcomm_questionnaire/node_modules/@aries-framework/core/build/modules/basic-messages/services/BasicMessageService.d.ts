import type { AgentContext } from '../../../agent';
import type { InboundMessageContext } from '../../../agent/models/InboundMessageContext';
import type { Query } from '../../../storage/StorageService';
import type { ConnectionRecord } from '../../connections/repository/ConnectionRecord';
import { EventEmitter } from '../../../agent/EventEmitter';
import { BasicMessage } from '../messages';
import { BasicMessageRecord, BasicMessageRepository } from '../repository';
export declare class BasicMessageService {
    private basicMessageRepository;
    private eventEmitter;
    constructor(basicMessageRepository: BasicMessageRepository, eventEmitter: EventEmitter);
    createMessage(agentContext: AgentContext, message: string, connectionRecord: ConnectionRecord, parentThreadId?: string): Promise<{
        message: BasicMessage;
        record: BasicMessageRecord;
    }>;
    /**
     * @todo use connection from message context
     */
    save({ message, agentContext }: InboundMessageContext<BasicMessage>, connection: ConnectionRecord): Promise<void>;
    private emitStateChangedEvent;
    findAllByQuery(agentContext: AgentContext, query: Query<BasicMessageRecord>): Promise<BasicMessageRecord[]>;
    getById(agentContext: AgentContext, basicMessageRecordId: string): Promise<BasicMessageRecord>;
    getByThreadId(agentContext: AgentContext, threadId: string): Promise<BasicMessageRecord>;
    findAllByParentThreadId(agentContext: AgentContext, parentThreadId: string): Promise<BasicMessageRecord[]>;
    deleteById(agentContext: AgentContext, basicMessageRecordId: string): Promise<void>;
}
