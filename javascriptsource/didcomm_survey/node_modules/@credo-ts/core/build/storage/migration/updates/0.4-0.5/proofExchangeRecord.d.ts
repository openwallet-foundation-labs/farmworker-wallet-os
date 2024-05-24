import type { BaseAgent } from '../../../../agent/BaseAgent';
import type { ProofExchangeRecord } from '../../../../modules/proofs';
import { ProofRole } from '../../../../modules/proofs';
/**
 * Migrates the {@link ProofExchangeExchangeRecord} to 0.5 compatible format. It fetches all proof exchange records from
 *  storage and applies the needed updates to the records. After a record has been transformed, it is updated
 * in storage and the next record will be transformed.
 *
 * The following transformations are applied:
 *  - {@link migrateRole}
 */
export declare function migrateProofExchangeRecordToV0_5<Agent extends BaseAgent>(agent: Agent): Promise<void>;
export declare function getProofRole(agent: BaseAgent, proofRecord: ProofExchangeRecord): Promise<ProofRole>;
/**
 * Add a role to the proof record.
 */
export declare function migrateRole<Agent extends BaseAgent>(agent: Agent, proofRecord: ProofExchangeRecord): Promise<void>;
