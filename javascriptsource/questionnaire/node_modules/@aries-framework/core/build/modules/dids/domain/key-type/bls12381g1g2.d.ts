import type { KeyDidMapping } from './keyDidMapping';
import { Key } from '../../../../crypto/Key';
export declare function getBls12381g1g2VerificationMethod(did: string, key: Key): import("../verificationMethod").VerificationMethod[];
export declare const keyDidBls12381g1g2: KeyDidMapping;
