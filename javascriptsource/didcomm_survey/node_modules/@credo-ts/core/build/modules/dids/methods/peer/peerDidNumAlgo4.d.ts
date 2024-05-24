import type { OutOfBandDidCommService } from '../../../oob/domain/OutOfBandDidCommService';
import { DidDocument } from '../../domain';
export declare const isShortFormDidPeer4: (did: string) => boolean;
export declare const isLongFormDidPeer4: (did: string) => boolean;
export declare function getAlternativeDidsForNumAlgo4Did(did: string): string[] | undefined;
export declare function didToNumAlgo4DidDocument(did: string): DidDocument;
export declare function didDocumentToNumAlgo4Did(didDocument: DidDocument): {
    shortFormDid: string;
    longFormDid: string;
};
export declare function outOfBandServiceToNumAlgo4Did(service: OutOfBandDidCommService): {
    shortFormDid: string;
    longFormDid: string;
};
