import type { BaseAgent } from '../../../../agent/BaseAgent';
import type { CredentialExchangeRecord } from '../../../../modules/credentials';
import { CredentialRole } from '../../../../modules/credentials';
/**
 * Migrates the {@link CredentialExchangeRecord} to 0.5 compatible format. It fetches all credential exchange records from
 *  storage and applies the needed updates to the records. After a record has been transformed, it is updated
 * in storage and the next record will be transformed.
 *
 * The following transformations are applied:
 *  - {@link migrateRole}
 */
export declare function migrateCredentialExchangeRecordToV0_5<Agent extends BaseAgent>(agent: Agent): Promise<void>;
export declare function getCredentialRole(agent: BaseAgent, credentialRecord: CredentialExchangeRecord): Promise<CredentialRole>;
/**
 * Add a role to the credential record.
 */
export declare function migrateRole<Agent extends BaseAgent>(agent: Agent, credentialRecord: CredentialExchangeRecord): Promise<void>;
