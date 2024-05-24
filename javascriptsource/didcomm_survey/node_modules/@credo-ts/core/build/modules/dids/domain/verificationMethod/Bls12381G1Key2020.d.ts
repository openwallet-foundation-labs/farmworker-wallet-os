import { Key } from '../../../../crypto/Key';
import { VerificationMethod } from './VerificationMethod';
export declare const VERIFICATION_METHOD_TYPE_BLS12381G1_KEY_2020 = "Bls12381G1Key2020";
type Bls12381G1Key2020 = VerificationMethod & {
    type: typeof VERIFICATION_METHOD_TYPE_BLS12381G1_KEY_2020;
};
/**
 * Get a Bls12381G1Key2020 verification method.
 */
export declare function getBls12381G1Key2020({ key, id, controller }: {
    id: string;
    key: Key;
    controller: string;
}): VerificationMethod;
/**
 * Check whether a verification method is a Bls12381G1Key2020 verification method.
 */
export declare function isBls12381G1Key2020(verificationMethod: VerificationMethod): verificationMethod is Bls12381G1Key2020;
/**
 * Get a key from a Bls12381G1Key2020 verification method.
 */
export declare function getKeyFromBls12381G1Key2020(verificationMethod: Bls12381G1Key2020): Key;
export {};
