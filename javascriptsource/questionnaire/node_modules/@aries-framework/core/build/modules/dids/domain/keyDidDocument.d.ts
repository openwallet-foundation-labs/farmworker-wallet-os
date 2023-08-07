import type { DidDocument } from './DidDocument';
import { Key } from '../../../crypto/Key';
export declare function getDidDocumentForKey(did: string, key: Key): DidDocument;
export declare function getJsonWebKey2020DidDocument(did: string, key: Key): DidDocument;
