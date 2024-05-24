import type { VerificationMethod } from '../../../dids';
export interface LdKeyPairOptions {
    id: string;
    controller: string;
}
export declare abstract class LdKeyPair {
    readonly id: string;
    readonly controller: string;
    abstract type: string;
    constructor(options: LdKeyPairOptions);
    static generate(): Promise<LdKeyPair>;
    static from(verificationMethod: VerificationMethod): Promise<LdKeyPair>;
    export(publicKey?: boolean, privateKey?: boolean): {
        id: string;
        type: string;
        controller: string;
    };
    abstract fingerprint(): string;
    abstract verifyFingerprint(fingerprint: string): boolean;
    abstract signer(): {
        sign: (data: {
            data: Uint8Array | Uint8Array[];
        }) => Promise<Uint8Array | Array<Uint8Array>>;
    };
    abstract verifier(): {
        verify: (data: {
            data: Uint8Array | Uint8Array[];
            signature: Uint8Array;
        }) => Promise<boolean>;
    };
}
