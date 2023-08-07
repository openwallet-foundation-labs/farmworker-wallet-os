import type { Key } from '../../../../crypto/Key';
import type { VerificationMethod } from '../verificationMethod';
import { KeyType } from '../../../../crypto/KeyType';
export interface KeyDidMapping {
    getVerificationMethods: (did: string, key: Key) => VerificationMethod[];
    getKeyFromVerificationMethod(verificationMethod: VerificationMethod): Key;
    supportedVerificationMethodTypes: string[];
}
export declare function getKeyDidMappingByKeyType(keyType: KeyType): KeyDidMapping;
export declare function getKeyFromVerificationMethod(verificationMethod: VerificationMethod): Key;
export declare function getSupportedVerificationMethodTypesFromKeyType(keyType: KeyType): string[];
