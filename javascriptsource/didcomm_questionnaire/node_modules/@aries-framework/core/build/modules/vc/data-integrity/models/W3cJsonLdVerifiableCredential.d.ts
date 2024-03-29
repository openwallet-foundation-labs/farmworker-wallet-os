import type { LinkedDataProofOptions } from './LinkedDataProof';
import type { W3cCredentialOptions } from '../../models/credential/W3cCredential';
import { SingleOrArray } from '../../../../utils';
import { ClaimFormat } from '../../models/ClaimFormat';
import { W3cCredential } from '../../models/credential/W3cCredential';
import { LinkedDataProof } from './LinkedDataProof';
export interface W3cJsonLdVerifiableCredentialOptions extends W3cCredentialOptions {
    proof: SingleOrArray<LinkedDataProofOptions>;
}
export declare class W3cJsonLdVerifiableCredential extends W3cCredential {
    constructor(options: W3cJsonLdVerifiableCredentialOptions);
    proof: SingleOrArray<LinkedDataProof>;
    get proofTypes(): Array<string>;
    toJson(): Record<string, any>;
    /**
     * The {@link ClaimFormat} of the credential. For JSON-LD credentials this is always `ldp_vc`.
     */
    get claimFormat(): ClaimFormat.LdpVc;
    /**
     * Get the encoded variant of the W3C Verifiable Credential. For JSON-LD credentials this is
     * a JSON object.
     */
    get encoded(): Record<string, any>;
}
