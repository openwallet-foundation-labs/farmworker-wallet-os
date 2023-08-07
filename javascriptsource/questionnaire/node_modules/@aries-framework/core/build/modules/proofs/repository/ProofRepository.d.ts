import type { AgentContext } from '../../../agent/context';
import { EventEmitter } from '../../../agent/EventEmitter';
import { Repository } from '../../../storage/Repository';
import { StorageService } from '../../../storage/StorageService';
import { ProofExchangeRecord } from './ProofExchangeRecord';
export declare class ProofRepository extends Repository<ProofExchangeRecord> {
    constructor(storageService: StorageService<ProofExchangeRecord>, eventEmitter: EventEmitter);
    /**
     * Retrieve a proof record by connection id and thread id
     *
     * @param connectionId The connection id
     * @param threadId The thread id
     * @throws {RecordNotFoundError} If no record is found
     * @throws {RecordDuplicateError} If multiple records are found
     * @returns The proof record
     */
    getByThreadAndConnectionId(agentContext: AgentContext, threadId: string, connectionId?: string): Promise<ProofExchangeRecord>;
    /**
     * Retrieve proof records by connection id and parent thread id
     *
     * @param connectionId The connection id
     * @param parentThreadId The parent thread id
     * @returns List containing all proof records matching the given query
     */
    getByParentThreadAndConnectionId(agentContext: AgentContext, parentThreadId: string, connectionId?: string): Promise<ProofExchangeRecord[]>;
}
