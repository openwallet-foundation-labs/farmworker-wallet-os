import type { V0_1ToV0_2UpdateConfig } from './index';
import type { BaseAgent } from '../../../../agent/BaseAgent';
import type { MediationRecord } from '../../../../modules/routing';
/**
 * Migrates the {@link MediationRecord} to 0.2 compatible format. It fetches all records from storage
 * and applies the needed updates to the records. After a record has been transformed, it is updated
 * in storage and the next record will be transformed.
 *
 * The following transformations are applied:
 *  - {@link updateMediationRole}
 */
export declare function migrateMediationRecordToV0_2<Agent extends BaseAgent>(agent: Agent, upgradeConfig: V0_1ToV0_2UpdateConfig): Promise<void>;
/**
 * The role in the mediation record was always being set to {@link MediationRole.Mediator} for both mediators and recipients. This didn't cause any issues, but would return the wrong role for recipients.
 *
 * In 0.2 a check is added to make sure the role of a mediation record matches with actions (e.g. a recipient can't grant mediation), which means it will throw an error if the role is not set correctly.
 *
 * Because it's not always possible detect whether the role should actually be mediator or recipient, a number of configuration options are provided on how the role should be updated:
 *
 * - `allMediator`: The role is set to {@link MediationRole.Mediator} for both mediators and recipients
 * - `allRecipient`: The role is set to {@link MediationRole.Recipient} for both mediators and recipients
 * - `recipientIfEndpoint`: The role is set to {@link MediationRole.Recipient} if their is an `endpoint` configured on the record otherwise it is set to {@link MediationRole.Mediator}.
 *      The endpoint is not set when running as a mediator, so in theory this allows to determine the role of the record.
 *      There is one case where this could be problematic when the role should be recipient, if the mediation grant hasn't actually occurred (meaning the endpoint is not set).
 * - `doNotChange`: The role is not changed
 *
 * Most agents only act as either the role of mediator or recipient, in which case the `allMediator` or `allRecipient` configuration is the most appropriate. If your agent acts as both a recipient and mediator, the `recipientIfEndpoint` configuration is the most appropriate. The `doNotChange` options is not recommended and can lead to errors if the role is not set correctly.
 *
 */
export declare function updateMediationRole<Agent extends BaseAgent>(agent: Agent, mediationRecord: MediationRecord, { mediationRoleUpdateStrategy }: V0_1ToV0_2UpdateConfig): Promise<void>;
