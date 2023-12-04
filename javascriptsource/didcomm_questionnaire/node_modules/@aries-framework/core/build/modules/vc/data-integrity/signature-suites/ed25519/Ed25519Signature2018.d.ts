import type { DocumentLoader, JsonLdDoc, Proof, VerificationMethod } from '../../jsonldUtil';
import type { JwsLinkedDataSignatureOptions } from '../JwsLinkedDataSignature';
import { JwsLinkedDataSignature } from '../JwsLinkedDataSignature';
type Ed25519Signature2018Options = Pick<JwsLinkedDataSignatureOptions, 'key' | 'proof' | 'date' | 'useNativeCanonize' | 'LDKeyClass'>;
export declare class Ed25519Signature2018 extends JwsLinkedDataSignature {
    static CONTEXT_URL: string;
    static CONTEXT: any;
    /**
     * @param {object} options - Options hashmap.
     *
     * Either a `key` OR at least one of `signer`/`verifier` is required.
     *
     * @param {object} [options.key] - An optional key object (containing an
     *   `id` property, and either `signer` or `verifier`, depending on the
     *   intended operation. Useful for when the application is managing keys
     *   itself (when using a KMS, you never have access to the private key,
     *   and so should use the `signer` param instead).
     * @param {Function} [options.signer] - Signer function that returns an
     *   object with an async sign() method. This is useful when interfacing
     *   with a KMS (since you don't get access to the private key and its
     *   `signer()`, the KMS client gives you only the signer function to use).
     * @param {Function} [options.verifier] - Verifier function that returns
     *   an object with an async `verify()` method. Useful when working with a
     *   KMS-provided verifier function.
     *
     * Advanced optional parameters and overrides.
     *
     * @param {object} [options.proof] - A JSON-LD document with options to use
     *   for the `proof` node. Any other custom fields can be provided here
     *   using a context different from security-v2).
     * @param {string|Date} [options.date] - Signing date to use if not passed.
     * @param {boolean} [options.useNativeCanonize] - Whether to use a native
     *   canonize algorithm.
     */
    constructor(options: Ed25519Signature2018Options);
    assertVerificationMethod(document: JsonLdDoc): Promise<void>;
    getVerificationMethod(options: {
        proof: Proof;
        documentLoader?: DocumentLoader;
    }): Promise<any>;
    /**
     * Ensures the document to be signed contains the required signature suite
     * specific `@context`, by either adding it (if `addSuiteContext` is true),
     * or throwing an error if it's missing.
     *
     * @override
     *
     * @param {object} options - Options hashmap.
     * @param {object} options.document - JSON-LD document to be signed.
     * @param {boolean} options.addSuiteContext - Add suite context?
     */
    ensureSuiteContext(options: {
        document: JsonLdDoc;
        addSuiteContext: boolean;
    }): void;
    /**
     * Checks whether a given proof exists in the document.
     *
     * @override
     *
     * @param {object} options - Options hashmap.
     * @param {object} options.proof - A proof.
     * @param {object} options.document - A JSON-LD document.
     * @param {object} options.purpose - A jsonld-signatures ProofPurpose
     *  instance (e.g. AssertionProofPurpose, AuthenticationProofPurpose, etc).
     * @param {Function} options.documentLoader  - A secure document loader (it is
     *   recommended to use one that provides static known documents, instead of
     *   fetching from the web) for returning contexts, controller documents,
     *   keys, and other relevant URLs needed for the proof.
     * @param {Function} [options.expansionMap] - A custom expansion map that is
     *   passed to the JSON-LD processor; by default a function that will throw
     *   an error when unmapped properties are detected in the input, use `false`
     *   to turn this off and allow unmapped properties to be dropped or use a
     *   custom function.
     *
     * @returns {Promise<boolean>} Whether a match for the proof was found.
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
