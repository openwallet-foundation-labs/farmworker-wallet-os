import type { VerificationMethod } from './VerificationMethod';
import type { Key } from '../../../../crypto/Key';
import type { JwkJson } from '../../../../crypto/jose/jwk/Jwk';
export declare const VERIFICATION_METHOD_TYPE_JSON_WEB_KEY_2020 = "JsonWebKey2020";
type JwkOrKey = {
    jwk: JwkJson;
    key?: never;
} | {
    key: Key;
    jwk?: never;
};
type GetJsonWebKey2020Options = {
    did: string;
    verificationMethodId?: string;
} & JwkOrKey;
/**
 * Get a JsonWebKey2020 verification method.
 */
export declare function getJsonWebKey2020({ did, key, jwk, verificationMethodId }: GetJsonWebKey2020Options): {
    id: string;
    type: string;
    controller: string;
    publicKeyJwk: JwkJson;
};
/**
 * Check whether a verification method is a JsonWebKey2020 verification method.
 */
export declare function isJsonWebKey2020(verificationMethod: VerificationMethod): verificationMethod is VerificationMethod & {
    type: 'JsonWebKey2020';
};
/**
 * Get a key from a JsonWebKey2020 verification method.
 */
export declare function getKeyFromJsonWebKey2020(verificationMethod: VerificationMethod & {
    type: 'JsonWebKey2020';
}): Key;
export {};
