import type { AgentContext } from '../../../agent';
import type { Query } from '../../../storage/StorageService';
import type { SaveGenericRecordOption } from '../repository/GenericRecord';
import { GenericRecord } from '../repository/GenericRecord';
import { GenericRecordsRepository } from '../repository/GenericRecordsRepository';
export declare class GenericRecordService {
    private genericRecordsRepository;
    constructor(genericRecordsRepository: GenericRecordsRepository);
    save(agentContext: AgentContext, { content, tags, id }: SaveGenericRecordOption): Promise<GenericRecord>;
    delete(agentContext: AgentContext, record: GenericRecord): Promise<void>;
    deleteById(agentContext: AgentContext, id: string): Promise<void>;
    update(agentContext: AgentContext, record: GenericRecord): Promise<void>;
    findAllByQuery(agentContext: AgentContext, query: Query<GenericRecord>): Promise<GenericRecord[]>;
    findById(agentContext: AgentContext, id: string): Promise<GenericRecord | null>;
    getAll(agentContext: AgentContext): Promise<GenericRecord[]>;
}
