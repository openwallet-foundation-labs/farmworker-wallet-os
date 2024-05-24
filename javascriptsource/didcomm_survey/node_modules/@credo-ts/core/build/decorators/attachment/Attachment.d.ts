import type { JwsDetachedFormat, JwsFlattenedDetachedFormat } from '../../crypto/JwsTypes';
import { JsonValue } from '../../types';
export interface AttachmentOptions {
    id?: string;
    description?: string;
    filename?: string;
    mimeType?: string;
    lastmodTime?: Date;
    byteCount?: number;
    data: AttachmentDataOptions;
}
export interface AttachmentDataOptions {
    base64?: string;
    json?: JsonValue;
    links?: string[];
    jws?: JwsDetachedFormat | JwsFlattenedDetachedFormat;
    sha256?: string;
}
/**
 * A JSON object that gives access to the actual content of the attachment
 */
export declare class AttachmentData {
    /**
     * Base64-encoded data, when representing arbitrary content inline instead of via links. Optional.
     */
    base64?: string;
    /**
     *  Directly embedded JSON data, when representing content inline instead of via links, and when the content is natively conveyable as JSON. Optional.
     */
    json?: JsonValue;
    /**
     * A list of zero or more locations at which the content may be fetched. Optional.
     */
    links?: string[];
    /**
     * A JSON Web Signature over the content of the attachment. Optional.
     */
    jws?: JwsDetachedFormat | JwsFlattenedDetachedFormat;
    /**
     * The hash of the content. Optional.
     */
    sha256?: string;
    constructor(options: AttachmentDataOptions);
}
/**
 * Represents DIDComm attachment
 * https://github.com/hyperledger/aries-rfcs/blob/master/concepts/0017-attachments/README.md
 */
export declare class Attachment {
    constructor(options: AttachmentOptions);
    id: string;
    /**
     * An optional human-readable description of the content.
     */
    description?: string;
    /**
     * A hint about the name that might be used if this attachment is persisted as a file. It is not required, and need not be unique. If this field is present and mime-type is not, the extension on the filename may be used to infer a MIME type.
     */
    filename?: string;
    /**
     * Describes the MIME type of the attached content. Optional but recommended.
     */
    mimeType?: string;
    /**
     * A hint about when the content in this attachment was last modified.
     */
    lastmodTime?: Date;
    /**
     * Optional, and mostly relevant when content is included by reference instead of by value. Lets the receiver guess how expensive it will be, in time, bandwidth, and storage, to fully fetch the attachment.
     */
    byteCount?: number;
    data: AttachmentData;
    getDataAsJson<T>(): T;
    addJws(jws: JwsDetachedFormat): void;
}
