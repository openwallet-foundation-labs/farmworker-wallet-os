import type { BaseAgent } from '../../../../agent/BaseAgent';
import type { ConnectionRecord } from '../../../../modules/connections';
/**
 * Migrate the {@link ConnectionRecord} to a 0.3 compatible format.
 *
 * @param agent
 */
export declare function migrateConnectionRecordToV0_3<Agent extends BaseAgent>(agent: Agent): Promise<void>;
/**
 *
 * @param agent
 * @param connectionRecord
 */
export declare function migrateConnectionRecordTags<Agent extends BaseAgent>(agent: Agent, connectionRecord: ConnectionRecord, mediatorConnectionIds?: Set<string>): Promise<void>;
