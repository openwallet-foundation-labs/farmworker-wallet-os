import { Key } from '../../../../crypto/Key';
import { VerificationMethod } from './VerificationMethod';
export declare const VERIFICATION_METHOD_TYPE_ECDSA_SECP256K1_VERIFICATION_KEY_2019 = "EcdsaSecp256k1VerificationKey2019";
type EcdsaSecp256k1VerificationKey2019 = VerificationMethod & {
    type: typeof VERIFICATION_METHOD_TYPE_ECDSA_SECP256K1_VERIFICATION_KEY_2019;
};
/**
 * Get a EcdsaSecp256k1VerificationKey2019 verification method.
 */
export declare function getEcdsaSecp256k1VerificationKey2019({ key, id, controller, }: {
    id: string;
    key: Key;
    controller: string;
}): VerificationMethod;
/**
 * Check whether a verification method is a EcdsaSecp256k1VerificationKey2019 verification method.
 */
export declare function isEcdsaSecp256k1VerificationKey2019(verificationMethod: VerificationMethod): verificationMethod is EcdsaSecp256k1VerificationKey2019;
/**
 * Get a key from a EcdsaSecp256k1VerificationKey2019 verification method.
 */
export declare function getKeyFromEcdsaSecp256k1VerificationKey2019(verificationMethod: EcdsaSecp256k1VerificationKey2019): Key;
export {};
