import type { JsonObject } from '../../../../types';
import type { DocumentLoader } from '../jsonldUtil';
/**
 * Options for getting a proof from a JSON-LD document
 */
export interface GetProofsOptions {
    /**
     * The JSON-LD document to extract the proofs from.
     */
    readonly document: JsonObject;
    /**
     * Optional the proof type(s) to filter the returned proofs by
     */
    readonly proofType?: string | readonly string[];
    /**
     * Optional custom document loader
     */
    documentLoader?(): DocumentLoader;
    /**
     * Optional property to indicate whether to skip compacting the resulting proof
     */
    readonly skipProofCompaction?: boolean;
}
