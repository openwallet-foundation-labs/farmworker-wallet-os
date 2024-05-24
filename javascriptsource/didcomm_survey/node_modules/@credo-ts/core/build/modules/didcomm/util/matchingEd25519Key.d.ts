import type { DidDocument } from '../../dids';
import { Key } from '../../../crypto';
/**
 * Tries to find a matching Ed25519 key to the supplied X25519 key
 * @param x25519Key X25519 key
 * @param didDocument Did document containing all the keys
 * @returns a matching Ed25519 key or `undefined` (if no matching key found)
 */
export declare function findMatchingEd25519Key(x25519Key: Key, didDocument: DidDocument): Key | undefined;
