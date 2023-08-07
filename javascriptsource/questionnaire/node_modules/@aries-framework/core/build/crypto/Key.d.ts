import type { KeyType } from './KeyType';
import { Buffer } from '../utils';
export declare class Key {
    readonly publicKey: Buffer;
    readonly keyType: KeyType;
    constructor(publicKey: Uint8Array, keyType: KeyType);
    static fromPublicKey(publicKey: Uint8Array, keyType: KeyType): Key;
    static fromPublicKeyBase58(publicKey: string, keyType: KeyType): Key;
    static fromFingerprint(fingerprint: string): Key;
    get prefixedPublicKey(): Buffer;
    get fingerprint(): string;
    get publicKeyBase58(): string;
    get supportsEncrypting(): boolean;
    get supportsSigning(): boolean;
}
