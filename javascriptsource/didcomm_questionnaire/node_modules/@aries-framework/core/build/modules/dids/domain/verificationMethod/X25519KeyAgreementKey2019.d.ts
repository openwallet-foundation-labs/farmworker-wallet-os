import { Key } from '../../../../crypto/Key';
import { VerificationMethod } from './VerificationMethod';
export declare const VERIFICATION_METHOD_TYPE_X25519_KEY_AGREEMENT_KEY_2019 = "X25519KeyAgreementKey2019";
type X25519KeyAgreementKey2019 = VerificationMethod & {
    type: typeof VERIFICATION_METHOD_TYPE_X25519_KEY_AGREEMENT_KEY_2019;
};
/**
 * Get a X25519KeyAgreementKey2019 verification method.
 */
export declare function getX25519KeyAgreementKey2019({ key, id, controller }: {
    id: string;
    key: Key;
    controller: string;
}): VerificationMethod;
/**
 * Check whether a verification method is a X25519KeyAgreementKey2019 verification method.
 */
export declare function isX25519KeyAgreementKey2019(verificationMethod: VerificationMethod): verificationMethod is X25519KeyAgreementKey2019;
/**
 * Get a key from a X25519KeyAgreementKey2019 verification method.
 */
export declare function getKeyFromX25519KeyAgreementKey2019(verificationMethod: X25519KeyAgreementKey2019): Key;
export {};
