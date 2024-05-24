export interface DataIntegrityProofOptions {
    type: string;
    cryptosuite: string;
    verificationMethod: string;
    proofPurpose: string;
    domain?: string;
    challenge?: string;
    nonce?: string;
    created?: string;
    expires?: string;
    proofValue?: string;
    previousProof?: string;
}
/**
 * Linked Data Proof
 * @see https://w3c.github.io/vc-data-model/#proofs-signatures
 *
 * @class LinkedDataProof
 */
export declare class DataIntegrityProof {
    constructor(options: DataIntegrityProofOptions);
    type: string;
    cryptosuite: string;
    proofPurpose: string;
    verificationMethod: string;
    domain?: string;
    challenge?: string;
    nonce?: string;
    created?: string;
    expires?: string;
    proofValue?: string;
    previousProof?: string;
}
