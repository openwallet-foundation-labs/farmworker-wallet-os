import type { BaseAgent } from '../../../../agent/BaseAgent';
import type { CredentialExchangeRecord } from '../../../../modules/credentials';
/**
 * Migrates the {@link CredentialRecord} to 0.2 compatible format. It fetches all records from storage
 * and applies the needed updates to the records. After a record has been transformed, it is updated
 * in storage and the next record will be transformed.
 *
 * The following transformations are applied:
 *  - {@link updateIndyMetadata}
 */
export declare function migrateCredentialRecordToV0_2<Agent extends BaseAgent>(agent: Agent): Promise<void>;
export declare enum CredentialRole {
    Issuer = 0,
    Holder = 1
}
export declare function getCredentialRole(credentialRecord: CredentialExchangeRecord): CredentialRole;
/**
 * The credential record had a custom `metadata` property in pre-0.1.0 storage that contained the `requestMetadata`, `schemaId` and `credentialDefinition`
 * properties. Later a generic metadata API was added that only allows objects to be stored. Therefore the properties were moved into a different structure.
 *
 * This migration method updates the top level properties to the new nested metadata structure.
 *
 * The following pre-0.1.0 structure:
 *
 * ```json
 * {
 *   "requestMetadata": "<value of requestMetadata>",
 *   "schemaId": "<value of schemaId>",
 *   "credentialDefinitionId": "<value of credential definition id>"
 * }
 * ```
 *
 * Will be transformed into the following 0.2.0 structure:
 *
 * ```json
 * {
 *   "_internal/indyRequest": <value of requestMetadata>,
 *   "_internal/indyCredential": {
 *     "schemaId": "<value of schemaId>",
 *     "credentialDefinitionId": "<value of credential definition id>"
 *   }
 * }
 * ```
 */
export declare function updateIndyMetadata<Agent extends BaseAgent>(agent: Agent, credentialRecord: CredentialExchangeRecord): Promise<void>;
/**
 * With the addition of support for different protocol versions the credential record now stores the protocol version.
 * With the addition of issue credential v2 support, other credential formats than indy can be used, and multiple credentials can be issued at once. To
 * account for this the `credentialId` has been replaced by the `credentials` array. This is an array of objects containing the `credentialRecordId` and
 * the `credentialRecordType`. For all current credentials the `credentialRecordType` will always be `indy`.
 *
 * The following 0.1.0 credential record structure (unrelated keys omitted):
 *
 * ```json
 * {
 *   "credentialId": "09e46da9-a575-4909-b016-040e96c3c539"
 * }
 * ```
 *
 * Will be transformed into the following 0.2.0 structure (unrelated keys omitted):
 *
 * ```json
 * {
 *  "protocolVersion: "v1",
 *  "credentials": [
 *    {
 *      "credentialRecordId": "09e46da9-a575-4909-b016-040e96c3c539",
 *      "credentialRecordType": "anoncreds"
 *    }
 *  ]
 * }
 * ```
 */
export declare function migrateInternalCredentialRecordProperties<Agent extends BaseAgent>(agent: Agent, credentialRecord: CredentialExchangeRecord): Promise<void>;
/**
 * In 0.2.0 the v1 didcomm messages have been moved out of the credential record into separate record using the DidCommMessageRepository.
 * This migration scripts extracts all message (proposalMessage, offerMessage, requestMessage, credentialMessage) and moves
 * them into the DidCommMessageRepository.
 */
export declare function moveDidCommMessages<Agent extends BaseAgent>(agent: Agent, credentialRecord: CredentialExchangeRecord): Promise<void>;
