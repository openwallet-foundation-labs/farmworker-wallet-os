import { DidDocumentService } from './DidDocumentService';
export declare class DidCommV1Service extends DidDocumentService {
    constructor(options: {
        id: string;
        serviceEndpoint: string;
        recipientKeys: string[];
        routingKeys?: string[];
        accept?: string[];
        priority?: number;
    });
    static type: string;
    recipientKeys: string[];
    routingKeys?: string[];
    accept?: string[];
    priority: number;
}
