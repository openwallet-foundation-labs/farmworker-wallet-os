import type { GetProofsOptions } from './models/GetProofsOptions';
import type { GetProofsResult } from './models/GetProofsResult';
import type { GetTypeOptions } from './models/GetTypeOptions';
import type { JsonObject, JsonValue } from '../../../types';
import { W3cJsonLdVerifiableCredential } from './models/W3cJsonLdVerifiableCredential';
export type JsonLdDoc = Record<string, unknown>;
export interface VerificationMethod extends JsonObject {
    id: string;
    [key: string]: JsonValue;
}
export interface Proof extends JsonObject {
    verificationMethod: string | VerificationMethod;
    [key: string]: JsonValue;
}
export interface DocumentLoaderResult {
    contextUrl?: string | null;
    documentUrl: string;
    document: Record<string, unknown>;
}
export type DocumentLoader = (url: string) => Promise<DocumentLoaderResult>;
export declare const _includesContext: (options: {
    document: JsonLdDoc;
    contextUrl: string;
}) => boolean;
export declare function assertOnlyW3cJsonLdVerifiableCredentials(credentials: unknown[]): asserts credentials is W3cJsonLdVerifiableCredential[];
/**
 * Gets a supported linked data proof from a JSON-LD Document
 * Note - unless instructed not to the document will be compacted
 * against the security v2 context @see https://w3id.org/security/v2
 *
 * @param options Options for extracting the proof from the document
 *
 * @returns {GetProofsResult} An object containing the matched proofs and the JSON-LD document
 */
export declare const getProofs: (options: GetProofsOptions) => Promise<GetProofsResult>;
/**
 * Gets the JSON-LD type information for a document
 * @param document {any} JSON-LD document to extract the type information from
 * @param options {GetTypeInfoOptions} Options for extracting the JSON-LD document
 *
 * @returns {object} Type info for the JSON-LD document
 */
export declare const getTypeInfo: (document: JsonObject, options: GetTypeOptions) => Promise<{
    types: string[];
    alias: string;
}>;
