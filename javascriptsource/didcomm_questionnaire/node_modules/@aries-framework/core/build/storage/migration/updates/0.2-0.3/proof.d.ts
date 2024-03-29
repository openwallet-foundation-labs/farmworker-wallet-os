import type { BaseAgent } from '../../../../agent/BaseAgent';
import type { ProofExchangeRecord } from '../../../../modules/proofs';
/**
 * Migrates the {@link ProofExchangeRecord} to 0.3 compatible format. It fetches all records from storage
 * and applies the needed updates to the records. After a record has been transformed, it is updated
 * in storage and the next record will be transformed.
 *
 * The following transformations are applied:
 *  - {@link migrateInternalProofExchangeRecordProperties}
 *  - {@link moveDidCommMessages}
 */
export declare function migrateProofExchangeRecordToV0_3<Agent extends BaseAgent>(agent: Agent): Promise<void>;
export declare enum ProofRole {
    Verifier = 0,
    Prover = 1
}
export declare function getProofRole(proofRecord: ProofExchangeRecord): ProofRole;
/**
 * With the addition of support for different protocol versions the proof record now stores the protocol version.
 *
 * The following 0.2.0 proof record structure (unrelated keys omitted):
 *
 * ```json
 * {
 * }
 * ```
 *
 * Will be transformed into the following 0.3.0 structure (unrelated keys omitted):
 *
 * ```json
 * {
 *  "protocolVersion: "v1"
 * }
 * ```
 */
export declare function migrateInternalProofExchangeRecordProperties<Agent extends BaseAgent>(agent: Agent, proofRecord: ProofExchangeRecord): Promise<void>;
/**
 * In 0.3.0 the v1 didcomm messages have been moved out of the proof record into separate record using the DidCommMessageRepository.
 * This migration scripts extracts all message (proposalMessage, requestMessage, presentationMessage) and moves
 * them into the DidCommMessageRepository.
 */
export declare function moveDidCommMessages<Agent extends BaseAgent>(agent: Agent, proofRecord: ProofExchangeRecord): Promise<void>;
