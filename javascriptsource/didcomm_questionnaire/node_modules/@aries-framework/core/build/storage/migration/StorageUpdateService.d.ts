import type { UpdateToVersion } from './updates';
import type { AgentContext } from '../../agent';
import type { VersionString } from '../../utils/version';
import { Logger } from '../../logger';
import { StorageVersionRecord } from './repository/StorageVersionRecord';
import { StorageVersionRepository } from './repository/StorageVersionRepository';
export declare class StorageUpdateService {
    private static STORAGE_VERSION_RECORD_ID;
    private logger;
    private storageVersionRepository;
    constructor(logger: Logger, storageVersionRepository: StorageVersionRepository);
    isUpToDate(agentContext: AgentContext, updateToVersion?: UpdateToVersion): Promise<boolean>;
    getCurrentStorageVersion(agentContext: AgentContext): Promise<VersionString>;
    setCurrentStorageVersion(agentContext: AgentContext, storageVersion: VersionString): Promise<void>;
    /**
     * Retrieve the update record, creating it if it doesn't exist already.
     *
     * The storageVersion will be set to the INITIAL_STORAGE_VERSION if it doesn't exist yet,
     * as we can assume the wallet was created before the update record existed
     */
    getStorageVersionRecord(agentContext: AgentContext): Promise<StorageVersionRecord>;
}
