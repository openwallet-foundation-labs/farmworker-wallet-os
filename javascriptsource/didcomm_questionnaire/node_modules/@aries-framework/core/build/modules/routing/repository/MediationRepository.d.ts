import type { AgentContext } from '../../../agent';
import { EventEmitter } from '../../../agent/EventEmitter';
import { Repository } from '../../../storage/Repository';
import { StorageService } from '../../../storage/StorageService';
import { MediationRecord } from './MediationRecord';
export declare class MediationRepository extends Repository<MediationRecord> {
    constructor(storageService: StorageService<MediationRecord>, eventEmitter: EventEmitter);
    getSingleByRecipientKey(agentContext: AgentContext, recipientKey: string): Promise<MediationRecord>;
    getByConnectionId(agentContext: AgentContext, connectionId: string): Promise<MediationRecord>;
}
