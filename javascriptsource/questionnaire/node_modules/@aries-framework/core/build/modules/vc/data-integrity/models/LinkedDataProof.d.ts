export interface LinkedDataProofOptions {
    type: string;
    proofPurpose: string;
    verificationMethod: string;
    created: string;
    domain?: string;
    challenge?: string;
    jws?: string;
    proofValue?: string;
    nonce?: string;
}
/**
 * Linked Data Proof
 * @see https://w3c.github.io/vc-data-model/#proofs-signatures
 *
 * @class LinkedDataProof
 */
export declare class LinkedDataProof {
    constructor(options: LinkedDataProofOptions);
    type: string;
    proofPurpose: string;
    verificationMethod: string;
    created: string;
    domain?: string;
    challenge?: string;
    jws?: string;
    proofValue?: string;
    nonce?: string;
}
export declare function LinkedDataProofTransformer(): PropertyDecorator;
