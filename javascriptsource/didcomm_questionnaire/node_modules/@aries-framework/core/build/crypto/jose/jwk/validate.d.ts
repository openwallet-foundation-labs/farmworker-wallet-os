import type { JwkJson } from './Jwk';
import type { JwaCurve, JwaKeyType } from '../jwa';
export declare function hasCrv(jwk: JwkJson, crv: JwaCurve): jwk is JwkJson & {
    crv: JwaCurve;
};
export declare function hasKty(jwk: JwkJson, kty: JwaKeyType): boolean;
export declare function hasX(jwk: JwkJson): jwk is JwkJson & {
    x: string;
};
export declare function hasY(jwk: JwkJson): jwk is JwkJson & {
    y: string;
};
export declare function hasValidUse(jwk: JwkJson, { supportsSigning, supportsEncrypting }: {
    supportsSigning: boolean;
    supportsEncrypting: boolean;
}): boolean;
