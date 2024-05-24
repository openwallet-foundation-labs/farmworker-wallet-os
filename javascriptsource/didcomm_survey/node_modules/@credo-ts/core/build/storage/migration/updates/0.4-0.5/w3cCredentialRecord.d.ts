import type { BaseAgent } from '../../../../agent/BaseAgent';
import type { W3cCredentialRecord } from '../../../../modules/vc/repository';
/**
 * Re-saves the w3c credential records to add the new 'types' tag.
 */
export declare function migrateW3cCredentialRecordToV0_5<Agent extends BaseAgent>(agent: Agent): Promise<void>;
/**
 * Up until 0.5.0 the AskarStorageService contained a bug where a non-computed (so manually set on record) array tag values that contained a : in the value
 * would be incorrectly parsed back from an askar tag to a tag on a record. This would only cause problems for the storage if the record was re-saved and not
 * computed. The following would happen:
 * - Create record with non-computed tag, e.g. expandedTypes that contains a value with a : in it
 * - Save record. The tag is correctly set in Askar as `expandedTypes:https://example.com'
 * - Read record. The tag is correctly read from Askar as `expandedTypes:https://example.com'. However the transformation would result in the tag value on the record being set to `https'.
 * - Save record. The non-computed (important, as otherwise the correct computed value would overwrite the incorrect value before storing) tag value is now set to `https' instead of `https://example.com'
 *
 * This function checks if any of the values for expandedTypes is `https` and if so, re-calculates the correct value and sets it on the record.
 *
 * NOTE: This function needs to resolve the context of a W3cCredentialRecord to be able to correctly calculate the expanded types.
 * To not brick a wallet that has no internet when updating, the storage update will allow the resolving of the expanded types to fail.
 * If this is the case, at a later point the expanded types will need to be recalculated and set on the record.
 *
 * If w3c credential records are never re-saved this shouldn't be a problem though. By default w3c credential records are not re-saved,
 * and so it only applies if you have implemented a custom flow that re-saves w3c credential records (e.g. if you add metadata).
 */
export declare function fixIncorrectExpandedTypesWithAskarStorage<Agent extends BaseAgent>(agent: Agent, w3cCredentialRecord: W3cCredentialRecord): Promise<void>;
