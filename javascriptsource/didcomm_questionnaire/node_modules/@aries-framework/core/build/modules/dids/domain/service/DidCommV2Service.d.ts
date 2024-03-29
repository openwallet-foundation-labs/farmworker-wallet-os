import { DidDocumentService } from './DidDocumentService';
export declare class DidCommV2Service extends DidDocumentService {
    constructor(options: {
        id: string;
        serviceEndpoint: string;
        routingKeys?: string[];
        accept?: string[];
    });
    static type: string;
    routingKeys?: string[];
    accept?: string[];
}
