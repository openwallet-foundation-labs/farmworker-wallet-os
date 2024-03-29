export declare class DidDocumentService {
    constructor(options: {
        id: string;
        serviceEndpoint: string;
        type: string;
    });
    get protocolScheme(): string;
    id: string;
    serviceEndpoint: string;
    type: string;
}
