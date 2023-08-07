import { Buffer } from '../utils';
import { KeyType } from './KeyType';
export declare function isValidSeed(seed: Buffer, keyType: KeyType): boolean;
export declare function isValidPrivateKey(privateKey: Buffer, keyType: KeyType): boolean;
export declare function isSigningSupportedForKeyType(keyType: KeyType): boolean;
export declare function isEncryptionSupportedForKeyType(keyType: KeyType): boolean;
