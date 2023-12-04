import type { DidCommMessageRole } from './DidCommMessageRole';
import type { AgentContext } from '../../agent';
import type { AgentMessage, ConstructableAgentMessage } from '../../agent/AgentMessage';
import { EventEmitter } from '../../agent/EventEmitter';
import { Repository } from '../Repository';
import { StorageService } from '../StorageService';
import { DidCommMessageRecord } from './DidCommMessageRecord';
export declare class DidCommMessageRepository extends Repository<DidCommMessageRecord> {
    constructor(storageService: StorageService<DidCommMessageRecord>, eventEmitter: EventEmitter);
    saveAgentMessage(agentContext: AgentContext, { role, agentMessage, associatedRecordId }: SaveAgentMessageOptions): Promise<void>;
    saveOrUpdateAgentMessage(agentContext: AgentContext, options: SaveAgentMessageOptions): Promise<void>;
    getAgentMessage<MessageClass extends ConstructableAgentMessage = ConstructableAgentMessage>(agentContext: AgentContext, { associatedRecordId, messageClass }: GetAgentMessageOptions<MessageClass>): Promise<InstanceType<MessageClass>>;
    findAgentMessage<MessageClass extends ConstructableAgentMessage = ConstructableAgentMessage>(agentContext: AgentContext, { associatedRecordId, messageClass }: GetAgentMessageOptions<MessageClass>): Promise<InstanceType<MessageClass> | null>;
}
export interface SaveAgentMessageOptions {
    role: DidCommMessageRole;
    agentMessage: AgentMessage;
    associatedRecordId: string;
}
export interface GetAgentMessageOptions<MessageClass extends typeof AgentMessage> {
    associatedRecordId: string;
    messageClass: MessageClass;
}
