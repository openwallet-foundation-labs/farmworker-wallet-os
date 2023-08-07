export type BaseName = 'base58btc';
export declare class MultiBaseEncoder {
    /**
     *
     * Encodes a buffer into a multibase
     *
     * @param buffer the buffer that has to be encoded
     * @param baseName the encoding algorithm
     */
    static encode(buffer: Uint8Array, baseName: BaseName): string;
    /**
     *
     * Decodes a multibase into a Uint8Array
     *
     * @param data the multibase that has to be decoded
     *
     * @returns decoded data and the multi base name
     */
    static decode(data: string): {
        data: Uint8Array;
        baseName: string;
    };
    static isValid(data: string): boolean;
}
