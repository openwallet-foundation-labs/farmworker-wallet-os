import type { BaseRecord } from './BaseRecord';
import type { BaseRecordConstructor, Query, StorageService } from './StorageService';
import type { AgentContext } from '../agent';
import type { EventEmitter } from '../agent/EventEmitter';
export declare class Repository<T extends BaseRecord<any, any, any>> {
    private storageService;
    private recordClass;
    private eventEmitter;
    constructor(recordClass: BaseRecordConstructor<T>, storageService: StorageService<T>, eventEmitter: EventEmitter);
    /** @inheritDoc {StorageService#save} */
    save(agentContext: AgentContext, record: T): Promise<void>;
    /** @inheritDoc {StorageService#update} */
    update(agentContext: AgentContext, record: T): Promise<void>;
    /** @inheritDoc {StorageService#delete} */
    delete(agentContext: AgentContext, record: T): Promise<void>;
    /**
     * Delete record by id. Throws {RecordNotFoundError} if no record is found
     * @param id the id of the record to delete
     * @returns
     */
    deleteById(agentContext: AgentContext, id: string): Promise<void>;
    /** @inheritDoc {StorageService#getById} */
    getById(agentContext: AgentContext, id: string): Promise<T>;
    /**
     * Find record by id. Returns null if no record is found
     * @param id the id of the record to retrieve
     * @returns
     */
    findById(agentContext: AgentContext, id: string): Promise<T | null>;
    /** @inheritDoc {StorageService#getAll} */
    getAll(agentContext: AgentContext): Promise<T[]>;
    /** @inheritDoc {StorageService#findByQuery} */
    findByQuery(agentContext: AgentContext, query: Query<T>): Promise<T[]>;
    /**
     * Find a single record by query. Returns null if not found.
     * @param query the query
     * @returns the record, or null if not found
     * @throws {RecordDuplicateError} if multiple records are found for the given query
     */
    findSingleByQuery(agentContext: AgentContext, query: Query<T>): Promise<T | null>;
    /**
     * Find a single record by query. Throws if not found
     * @param query the query
     * @returns the record
     * @throws {RecordDuplicateError} if multiple records are found for the given query
     * @throws {RecordNotFoundError} if no record is found for the given query
     */
    getSingleByQuery(agentContext: AgentContext, query: Query<T>): Promise<T>;
}
