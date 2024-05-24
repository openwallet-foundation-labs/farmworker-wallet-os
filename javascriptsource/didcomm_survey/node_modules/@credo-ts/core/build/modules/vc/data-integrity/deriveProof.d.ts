import type { JsonObject } from '../../../types';
import { W3cJsonLdVerifiableCredential } from './models/W3cJsonLdVerifiableCredential';
export interface W3cJsonLdDeriveProofOptions {
    credential: W3cJsonLdVerifiableCredential;
    revealDocument: JsonObject;
    verificationMethod: string;
}
/**
 * Derives a proof from a document featuring a supported linked data proof
 *
 * NOTE - This is a temporary API extending JSON-LD signatures
 *
 * @param proofDocument A document featuring a linked data proof capable of proof derivation
 * @param revealDocument A document of the form of a JSON-LD frame describing the terms to selectively derive from the proof document
 * @param options Options for proof derivation
 */
export declare const deriveProof: (proofDocument: JsonObject, revealDocument: JsonObject, { suite, skipProofCompaction, documentLoader, nonce }: any) => Promise<W3cJsonLdVerifiableCredential>;
