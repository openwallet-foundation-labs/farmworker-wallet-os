import { Hasher, SdJwtDecodedVerifiableCredential, SdJwtPresentationFrame } from '@sphereon/ssi-types';
export declare function calculateSdHash(compactSdJwtVc: string, alg: string, hasher: Hasher): string;
/**
 * Applies the presentation frame to the decoded sd-jwt vc and will update the
 * `decodedPayload`, `compactSdJwt` and `disclosures` properties.
 *
 * Both the input and output interfaces of this method are defined in `@sphereon/ssi-types`, so
 * this method hides the actual implementation of SD-JWT (which is currently based on @sd-jwt/*)
 */
export declare function applySdJwtLimitDisclosure(sdJwtDecodedVerifiableCredential: SdJwtDecodedVerifiableCredential, presentationFrame: SdJwtPresentationFrame): void;
