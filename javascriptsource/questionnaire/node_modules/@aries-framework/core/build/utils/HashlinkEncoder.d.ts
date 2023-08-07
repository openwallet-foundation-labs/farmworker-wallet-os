import type { HashName } from './Hasher';
import type { BaseName } from './MultiBaseEncoder';
import type { Buffer } from './buffer';
type Metadata = {
    urls?: string[];
    contentType?: string;
};
export type HashlinkData = {
    checksum: string;
    metadata?: Metadata;
};
export declare class HashlinkEncoder {
    /**
     * Encodes a buffer, with optional metadata, into a hashlink
     *
     * @param buffer the buffer to encode into a hashlink
     * @param hashAlgorithm the name of the hashing algorithm 'sha2-256'
     * @param baseEncoding the name of the base encoding algorithm 'base58btc'
     * @param metadata the optional metadata in the hashlink
     *
     * @returns hashlink hashlink with optional metadata
     */
    static encode(buffer: Buffer | Uint8Array, hashAlgorithm: HashName, baseEncoding?: BaseName, metadata?: Metadata): string;
    /**
     * Decodes a hashlink into HashlinkData object
     *
     * @param hashlink the hashlink that needs decoding
     *
     * @returns object the decoded hashlink
     */
    static decode(hashlink: string): HashlinkData;
    /**
     * Validates a hashlink
     *
     * @param hashlink the hashlink that needs validating
     *
     * @returns a boolean whether the hashlink is valid
     *
     * */
    static isValid(hashlink: string): boolean;
    private static encodeMultiHash;
    private static encodeMetadata;
    private static decodeMetadata;
}
export {};
