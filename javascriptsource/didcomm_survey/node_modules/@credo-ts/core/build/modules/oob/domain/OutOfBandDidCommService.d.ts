import type { ResolvedDidCommService } from '../../didcomm';
import { DidDocumentService } from '../../dids';
export declare class OutOfBandDidCommService extends DidDocumentService {
    constructor(options: {
        id: string;
        serviceEndpoint: string;
        recipientKeys: string[];
        routingKeys?: string[];
        accept?: string[];
    });
    static type: string;
    recipientKeys: string[];
    routingKeys?: string[];
    accept?: string[];
    get resolvedDidCommService(): ResolvedDidCommService;
    static fromResolvedDidCommService(service: ResolvedDidCommService): OutOfBandDidCommService;
}
