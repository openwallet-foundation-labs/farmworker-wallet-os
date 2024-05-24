import type { DataIntegrityProofOptions } from './DataIntegrityProof';
import type { LinkedDataProofOptions } from './LinkedDataProof';
import type { W3cCredentialOptions } from '../../models/credential/W3cCredential';
import type { W3cJsonCredential } from '../../models/credential/W3cJsonCredential';
import { SingleOrArray } from '../../../../utils';
import { ClaimFormat } from '../../models/ClaimFormat';
import { W3cCredential } from '../../models/credential/W3cCredential';
import { DataIntegrityProof } from './DataIntegrityProof';
import { LinkedDataProof } from './LinkedDataProof';
export interface W3cJsonLdVerifiableCredentialOptions extends W3cCredentialOptions {
    proof: SingleOrArray<LinkedDataProofOptions | DataIntegrityProofOptions>;
}
export declare class W3cJsonLdVerifiableCredential extends W3cCredential {
    constructor(options: W3cJsonLdVerifiableCredentialOptions);
    proof: SingleOrArray<LinkedDataProof | DataIntegrityProof>;
    get proofTypes(): Array<string>;
    get dataIntegrityCryptosuites(): Array<string>;
    toJson(): Record<string, any>;
    static fromJson(json: Record<string, unknown>): W3cJsonLdVerifiableCredential;
    /**
     * The {@link ClaimFormat} of the credential. For JSON-LD credentials this is always `ldp_vc`.
     */
    get claimFormat(): ClaimFormat.LdpVc;
    /**
     * Get the encoded variant of the W3C Verifiable Credential. For JSON-LD credentials this is
     * a JSON object.
     */
    get encoded(): Record<string, any>;
    get jsonCredential(): W3cJsonCredential;
}
