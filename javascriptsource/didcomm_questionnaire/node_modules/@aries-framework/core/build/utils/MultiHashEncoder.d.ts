import { Buffer } from './buffer';
export declare class MultiHashEncoder {
    /**
     *
     * Encodes a buffer into a hash
     *
     * @param buffer the buffer that has to be encoded
     * @param hashName the hashing algorithm, 'sha2-256'
     *
     * @returns a multihash
     */
    static encode(data: Uint8Array, hashName: 'sha2-256'): Buffer;
    /**
     *
     * Decodes the multihash
     *
     * @param data the multihash that has to be decoded
     *
     * @returns object with the data and the hashing algorithm
     */
    static decode(data: Uint8Array): {
        data: Buffer;
        hashName: string;
    };
    /**
     *
     * Validates if it is a valid mulithash
     *
     * @param data the multihash that needs to be validated
     *
     * @returns a boolean whether the multihash is valid
     */
    static isValid(data: Uint8Array): boolean;
}
