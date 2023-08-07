export type HashName = 'sha2-256';
export declare class Hasher {
    static hash(data: Uint8Array, hashName: HashName): Uint8Array;
}
