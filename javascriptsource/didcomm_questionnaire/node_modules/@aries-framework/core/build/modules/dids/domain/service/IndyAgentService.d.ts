import { DidDocumentService } from './DidDocumentService';
export declare class IndyAgentService extends DidDocumentService {
    constructor(options: {
        id: string;
        serviceEndpoint: string;
        recipientKeys: string[];
        routingKeys?: string[];
        priority?: number;
    });
    static type: string;
    recipientKeys: string[];
    routingKeys?: string[];
    priority: number;
}
