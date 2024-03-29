import type { Jwk } from '../../../../crypto';
export declare class DidJwk {
    readonly did: string;
    private constructor();
    get allowsEncrypting(): boolean;
    get allowsSigning(): boolean;
    static fromDid(did: string): DidJwk;
    /**
     * A did:jwk DID can only have one verification method, and the verification method
     * id will always be `<did>#0`.
     */
    get verificationMethodId(): string;
    static fromJwk(jwk: Jwk): DidJwk;
    get key(): import("../../../../crypto").Key;
    get jwk(): Jwk;
    get jwkJson(): any;
    get didDocument(): import("../..").DidDocument;
}
