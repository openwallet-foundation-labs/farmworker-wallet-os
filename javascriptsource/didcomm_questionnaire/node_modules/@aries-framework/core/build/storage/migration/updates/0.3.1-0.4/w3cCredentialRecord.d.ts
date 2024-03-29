import type { BaseAgent } from '../../../../agent/BaseAgent';
/**
 * Re-saves the w3c credential records to add the new claimFormat tag.
 */
export declare function migrateW3cCredentialRecordToV0_4<Agent extends BaseAgent>(agent: Agent): Promise<void>;
