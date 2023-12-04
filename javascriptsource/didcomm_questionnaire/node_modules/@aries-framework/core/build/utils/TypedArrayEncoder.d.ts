import { Buffer } from './buffer';
export declare class TypedArrayEncoder {
    /**
     * Encode buffer into base64 string.
     *
     * @param buffer the buffer to encode into base64 string
     */
    static toBase64(buffer: Buffer | Uint8Array): string;
    /**
     * Encode buffer into base64url string.
     *
     * @param buffer the buffer to encode into base64url string
     */
    static toBase64URL(buffer: Buffer | Uint8Array): string;
    /**
     * Encode buffer into base58 string.
     *
     * @param buffer the buffer to encode into base58 string
     */
    static toBase58(buffer: Buffer | Uint8Array): string;
    /**
     * Decode base64 string into buffer. Also supports base64url
     *
     * @param base64 the base64 or base64url string to decode into buffer format
     */
    static fromBase64(base64: string): Buffer;
    /**
     * Decode base58 string into buffer
     *
     * @param base58 the base58 string to decode into buffer format
     */
    static fromBase58(base58: string): Buffer;
    /**
     * Encode buffer into base64 string.
     *
     * @param buffer the buffer to encode into base64 string
     */
    static toHex(buffer: Buffer | Uint8Array): string;
    /**
     * Decode hex string into buffer
     *
     * @param hex the hex string to decode into buffer format
     */
    static fromHex(hex: string): Buffer;
    /**
     * Decode string into buffer.
     *
     * @param str the string to decode into buffer format
     */
    static fromString(str: string): Buffer;
    static toUtf8String(buffer: Buffer | Uint8Array): string;
    /**
     * Check whether an array is byte, or typed, array
     *
     * @param array unknown The array that has to be checked
     *
     * @returns A boolean if the array is a byte array
     */
    static isTypedArray(array: unknown): boolean;
}
