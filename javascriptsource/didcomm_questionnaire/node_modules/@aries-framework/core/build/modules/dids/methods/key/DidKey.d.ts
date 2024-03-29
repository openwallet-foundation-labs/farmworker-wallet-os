import { Key } from '../../../../crypto/Key';
export declare class DidKey {
    readonly key: Key;
    constructor(key: Key);
    static fromDid(did: string): DidKey;
    get did(): string;
    get didDocument(): import("../..").DidDocument;
}
