import { SdJwtDecodedVerifiableCredential, WrappedSdJwtVerifiableCredential, WrappedSdJwtVerifiablePresentation } from './sd-jwt-vc';
import { JwtDecodedVerifiableCredential, JwtDecodedVerifiablePresentation, W3CVerifiableCredential, W3CVerifiablePresentation, WrappedW3CVerifiableCredential, WrappedW3CVerifiablePresentation } from './w3c-vc';
export type WrappedVerifiableCredential = WrappedW3CVerifiableCredential | WrappedSdJwtVerifiableCredential;
export type WrappedVerifiablePresentation = WrappedW3CVerifiablePresentation | WrappedSdJwtVerifiablePresentation;
export declare enum OriginalType {
    JSONLD = "json-ld",
    JWT_ENCODED = "jwt-encoded",
    JWT_DECODED = "jwt-decoded",
    SD_JWT_VC_ENCODED = "sd-jwt-vc-encoded",
    SD_JWT_VC_DECODED = "sd-jwt-vc-decoded"
}
export type CredentialFormat = 'jwt_vc' | 'ldp_vc' | 'vc+sd-jwt' | 'jwt' | 'ldp' | string;
export type PresentationFormat = 'jwt_vp' | 'ldp_vp' | 'vc+sd-jwt' | 'jwt' | 'ldp' | string;
export type ClaimFormat = CredentialFormat | PresentationFormat;
export type OriginalVerifiableCredential = W3CVerifiableCredential | JwtDecodedVerifiableCredential | SdJwtDecodedVerifiableCredential;
export type OriginalVerifiablePresentation = W3CVerifiablePresentation | JwtDecodedVerifiablePresentation | SdJwtDecodedVerifiableCredential;
export type Original = OriginalVerifiablePresentation | OriginalVerifiableCredential;
export declare const enum DocumentFormat {
    JWT = 0,
    JSONLD = 1,
    SD_JWT_VC = 2,
    EIP712 = 3
}
//# sourceMappingURL=vc.d.ts.map