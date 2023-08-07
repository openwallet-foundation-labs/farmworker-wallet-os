import type { CredentialPreviewOptions } from '../../../models/CredentialPreviewAttribute';
import { CredentialPreviewAttribute } from '../../../models/CredentialPreviewAttribute';
/**
 * Credential preview inner message class.
 *
 * This is not a message but an inner object for other messages in this protocol. It is used construct a preview of the data for the credential.
 *
 * @see https://github.com/hyperledger/aries-rfcs/tree/main/features/0453-issue-credential-v2#preview-credential
 */
export declare class V2CredentialPreview {
    constructor(options: CredentialPreviewOptions);
    readonly type: string;
    static readonly type: import("../../../../../utils/messageType").ParsedMessageType;
    attributes: CredentialPreviewAttribute[];
    toJSON(): Record<string, unknown>;
    /**
     * Create a credential preview from a record with name and value entries.
     *
     * @example
     * const preview = CredentialPreview.fromRecord({
     *   name: "Bob",
     *   age: "20"
     * })
     */
    static fromRecord(record: Record<string, string>): V2CredentialPreview;
}
