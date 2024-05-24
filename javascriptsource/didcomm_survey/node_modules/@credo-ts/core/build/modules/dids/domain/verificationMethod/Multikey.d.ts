import type { VerificationMethod } from './VerificationMethod';
import { Key } from '../../../../crypto/Key';
export declare const VERIFICATION_METHOD_TYPE_MULTIKEY = "Multikey";
type GetMultikeyOptions = {
    did: string;
    key: Key;
    verificationMethodId?: string;
};
/**
 * Get a Multikey verification method.
 */
export declare function getMultikey({ did, key, verificationMethodId }: GetMultikeyOptions): {
    id: string;
    type: string;
    controller: string;
    publicKeyMultibase: string;
};
/**
 * Check whether a verification method is a Multikey verification method.
 */
export declare function isMultikey(verificationMethod: VerificationMethod): verificationMethod is VerificationMethod & {
    type: 'Multikey';
};
/**
 * Get a key from a Multikey verification method.
 */
export declare function getKeyFromMultikey(verificationMethod: VerificationMethod & {
    type: 'Multikey';
}): Key;
export {};
