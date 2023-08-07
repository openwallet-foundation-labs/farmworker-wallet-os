import type { BaseName } from './MultiBaseEncoder';
import type { Attachment } from '../decorators/attachment/Attachment';
/**
 * Encodes an attachment based on the `data` property
 *
 * @param attachment The attachment that needs to be encoded
 * @param hashAlgorithm The hashing algorithm that is going to be used
 * @param baseName The base encoding name that is going to be used
 * @returns A hashlink based on the attachment data
 */
export declare function encodeAttachment(attachment: Attachment, hashAlgorithm?: 'sha2-256', baseName?: BaseName): string;
/**
 * Checks if an attachment is a linked Attachment
 *
 * @param attachment the attachment that has to be validated
 * @returns a boolean whether the attachment is a linkedAttachment
 */
export declare function isLinkedAttachment(attachment: Attachment): boolean;
