import type { DataIntegrityProofOptions } from './DataIntegrityProof';
import type { LinkedDataProofOptions } from './LinkedDataProof';
import type { W3cPresentationOptions } from '../../models/presentation/W3cPresentation';
import { SingleOrArray } from '../../../../utils';
import { ClaimFormat } from '../../models';
import { W3cPresentation } from '../../models/presentation/W3cPresentation';
import { DataIntegrityProof } from './DataIntegrityProof';
import { LinkedDataProof } from './LinkedDataProof';
export interface W3cJsonLdVerifiablePresentationOptions extends W3cPresentationOptions {
    proof: LinkedDataProofOptions | DataIntegrityProofOptions;
}
export declare class W3cJsonLdVerifiablePresentation extends W3cPresentation {
    constructor(options: W3cJsonLdVerifiablePresentationOptions);
    proof: SingleOrArray<LinkedDataProof | DataIntegrityProof>;
    get proofTypes(): Array<string>;
    get dataIntegrityCryptosuites(): Array<string>;
    toJson(): Record<string, any>;
    /**
     * The {@link ClaimFormat} of the presentation. For JSON-LD credentials this is always `ldp_vp`.
     */
    get claimFormat(): ClaimFormat.LdpVp;
    /**
     * Get the encoded variant of the W3C Verifiable Presentation. For JSON-LD presentations this is
     * a JSON object.
     */
    get encoded(): Record<string, any>;
}
