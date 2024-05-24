import type { AgentContext } from '../../../agent';
import type { DidExchangeRole } from '../models';
import { EventEmitter } from '../../../agent/EventEmitter';
import { Repository } from '../../../storage/Repository';
import { StorageService } from '../../../storage/StorageService';
import { ConnectionRecord } from './ConnectionRecord';
export declare class ConnectionRepository extends Repository<ConnectionRecord> {
    constructor(storageService: StorageService<ConnectionRecord>, eventEmitter: EventEmitter);
    findByDids(agentContext: AgentContext, { ourDid, theirDid }: {
        ourDid: string;
        theirDid: string;
    }): Promise<ConnectionRecord | null>;
    getByThreadId(agentContext: AgentContext, threadId: string): Promise<ConnectionRecord>;
    getByRoleAndThreadId(agentContext: AgentContext, role: DidExchangeRole, threadId: string): Promise<ConnectionRecord>;
}
