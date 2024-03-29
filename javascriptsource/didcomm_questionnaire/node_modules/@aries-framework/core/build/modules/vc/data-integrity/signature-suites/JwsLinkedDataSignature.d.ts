/*!
 * Copyright (c) 2020-2021 Digital Bazaar, Inc. All rights reserved.
 */
import type { DocumentLoader, Proof, VerificationMethod } from '../jsonldUtil';
import type { LdKeyPair } from '../models/LdKeyPair';
declare const LinkedDataSignature: any;
export interface JwsLinkedDataSignatureOptions {
    type: string;
    algorithm: string;
    LDKeyClass: typeof LdKeyPair;
    key?: LdKeyPair;
    proof: Proof;
    date: string;
    contextUrl: string;
    useNativeCanonize: boolean;
}
export declare class JwsLinkedDataSignature extends LinkedDataSignature {
    /**
     * @param options - Options hashmap.
     * @param options.type - Provided by subclass.
     * @param options.alg - JWS alg provided by subclass.
     * @param [options.LDKeyClass] - Provided by subclass or subclass
     *   overrides `getVerificationMethod`.
     *
     * Either a `key` OR at least one of `signer`/`verifier` is required.
     *
     * @param [options.key] - An optional key object (containing an
     *   `id` property, and either `signer` or `verifier`, depending on the
     *   intended operation. Useful for when the application is managing keys
     *   itself (when using a KMS, you never have access to the private key,
     *   and so should use the `signer` param instead).
     *
     * Advanced optional parameters and overrides.
     *
     * @param [options.proof] - A JSON-LD document with options to use
     *   for the `proof` node. Any other custom fields can be provided here
     *   using a context different from `security-v2`.
     * @param [options.date] - Signing date to use if not passed.
     * @param options.contextUrl - JSON-LD context url that corresponds
     *   to this signature suite. Used for enforcing suite context during the
     *   `sign()` operation.
     * @param [options.useNativeCanonize] - Whether to use a native
     *   canonize algorithm.
     */
    constructor(options: JwsLinkedDataSignatureOptions);
    /**
     * @param options - Options hashmap.
     * @param options.verifyData - The data to sign.
     * @param options.proof - A JSON-LD document with options to use
     *   for the `proof` node. Any other custom fields can be provided here
     *   using a context different from `security-v2`.
     *
     * @returns The proof containing the signature value.
     */
    sign(options: {
        verifyData: Uint8Array;
        proof: Proof;
    }): Promise<Proof>;
    /**
     * @param options - Options hashmap.
     * @param options.verifyData - The data to verify.
     * @param options.verificationMethod - A verification method.
     * @param options.proof - The proof to be verified.
     *
     * @returns Resolves with the verification result.
     */
    verifySignature(options: {
        verifyData: Uint8Array;
        verificationMethod: VerificationMethod;
        proof: Proof;
    }): Promise<any>;
    getVerificationMethod(options: {
        proof: Proof;
        documentLoader?: DocumentLoader;
    }): Promise<any>;
    /**
     * Checks whether a given proof exists in the document.
     *
     * @param options - Options hashmap.
     * @param options.proof - A proof.
     * @param options.document - A JSON-LD document.
     * @param options.purpose - A jsonld-signatures ProofPurpose
     *  instance (e.g. AssertionProofPurpose, AuthenticationProofPurpose, etc).
     * @param options.documentLoader  - A secure document loader (it is
     *   recommended to use one that provides static known documents, instead of
     *   fetching from the web) for returning contexts, controller documents,
     *   keys, and other relevant URLs needed for the proof.
     * @param [options.expansionMap] - A custom expansion map that is
     *   passed to the JSON-LD processor; by default a function that will throw
     *   an error when unmapped properties are detected in the input, use `false`
     *   to turn this off and allow unmapped properties to be dropped or use a
     *   custom function.
     *
     * @returns Whether a match for the proof was found.
     */
    matchProof(options: {
        proof: Proof;
        document: VerificationMethod;
        purpose: any;
        documentLoader?: DocumentLoader;
        expansionMap?: () => void;
    }): Promise<boolean>;
}
export {};
