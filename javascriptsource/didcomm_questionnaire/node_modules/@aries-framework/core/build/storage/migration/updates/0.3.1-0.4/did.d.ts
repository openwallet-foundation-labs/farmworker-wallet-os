import type { BaseAgent } from '../../../../agent/BaseAgent';
import type { DidRecord } from '../../../../modules/dids';
/**
 * Migrates the {@link DidRecord} to 0.4 compatible format. It fetches all did records from storage
 * with method sov and applies the needed updates to the records. After a record has been transformed, it is updated
 * in storage and the next record will be transformed.
 *
 * The following transformations are applied:
 *  - {@link migrateSovDidToIndyDid}
 */
export declare function migrateDidRecordToV0_4<Agent extends BaseAgent>(agent: Agent): Promise<void>;
export declare function migrateSovDidToIndyDid<Agent extends BaseAgent>(agent: Agent, didRecord: DidRecord): void;
