import type { OutOfBandDidCommService } from '../../../oob/domain/OutOfBandDidCommService';
import type { DidDocument } from '../../domain';
export declare function didToNumAlgo2DidDocument(did: string): DidDocument;
export declare function didDocumentToNumAlgo2Did(didDocument: DidDocument): string;
export declare function outOfBandServiceToNumAlgo2Did(service: OutOfBandDidCommService): string;
