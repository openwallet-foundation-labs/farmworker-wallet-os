import type { JsonObject, JsonArray } from '../../../../types';
/**
 * Result for getting proofs from a JSON-LD document
 */
export interface GetProofsResult {
    /**
     * The JSON-LD document with the linked data proofs removed.
     */
    document: JsonObject;
    /**
     * The list of proofs that matched the requested type.
     */
    proofs: JsonArray;
}
