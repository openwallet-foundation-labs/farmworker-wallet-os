/**
 * Based on https://github.com/transmute-industries/verifiable-data/blob/main/packages/web-crypto-key-pair/src/compression/ec-compression.ts
 */
export declare function compress(publicKey: Uint8Array): Uint8Array;
export declare function expand(publicKey: Uint8Array, curve: 'P-256' | 'P-384' | 'P-521'): Uint8Array;
