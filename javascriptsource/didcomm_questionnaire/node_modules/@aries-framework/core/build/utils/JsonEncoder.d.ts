import { Buffer } from './buffer';
export declare class JsonEncoder {
    /**
     * Encode json object into base64 string.
     *
     * @param json the json object to encode into base64 string
     */
    static toBase64(json: unknown): string;
    /**
     * Encode json object into base64url string.
     *
     * @param json the json object to encode into base64url string
     */
    static toBase64URL(json: unknown): string;
    /**
     * Decode base64 string into json object. Also supports base64url
     *
     * @param base64 the base64 or base64url string to decode into json
     */
    static fromBase64(base64: string): any;
    /**
     * Encode json object into string
     *
     * @param json the json object to encode into string
     */
    static toString(json: unknown): string;
    /**
     * Decode string into json object
     *
     * @param string the string to decode into json
     */
    static fromString(string: string): any;
    /**
     * Encode json object into buffer
     *
     * @param json the json object to encode into buffer format
     */
    static toBuffer(json: unknown): Buffer;
    /**
     * Decode buffer into json object
     *
     * @param buffer the buffer to decode into json
     */
    static fromBuffer(buffer: Buffer | Uint8Array): any;
}
