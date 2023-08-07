import type { BaseAgent } from '../../../../agent/BaseAgent';
/**
 * Migrates the {@link DidRecord} to 0.3 compatible format. It fetches all records from storage
 * and applies the needed updates to the records. After a record has been transformed, it is updated
 * in storage and the next record will be transformed.
 *
 * The following transformations are applied:
 *  - {@link extractDidAsSeparateProperty}
 */
export declare function migrateDidRecordToV0_3_1<Agent extends BaseAgent>(agent: Agent): Promise<void>;
