import { Key } from '../../../../crypto/Key';
import { VerificationMethod } from './VerificationMethod';
export declare const VERIFICATION_METHOD_TYPE_ED25519_VERIFICATION_KEY_2018 = "Ed25519VerificationKey2018";
type Ed25519VerificationKey2018 = VerificationMethod & {
    type: typeof VERIFICATION_METHOD_TYPE_ED25519_VERIFICATION_KEY_2018;
};
/**
 * Get a Ed25519VerificationKey2018 verification method.
 */
export declare function getEd25519VerificationKey2018({ key, id, controller }: {
    id: string;
    key: Key;
    controller: string;
}): VerificationMethod;
/**
 * Check whether a verification method is a Ed25519VerificationKey2018 verification method.
 */
export declare function isEd25519VerificationKey2018(verificationMethod: VerificationMethod): verificationMethod is Ed25519VerificationKey2018;
/**
 * Get a key from a Ed25519VerificationKey2018 verification method.
 */
export declare function getKeyFromEd25519VerificationKey2018(verificationMethod: Ed25519VerificationKey2018): Key;
export {};
