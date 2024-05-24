export type HashName = 'sha-256';
export declare class Hasher {
    static hash(data: Uint8Array | string, hashName: HashName | string): Uint8Array;
}
