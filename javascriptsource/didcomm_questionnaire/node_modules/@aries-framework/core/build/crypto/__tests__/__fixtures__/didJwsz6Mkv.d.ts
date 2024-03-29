export declare const SEED = "00000000000000000000000000000My1";
export declare const PUBLIC_KEY_BASE58 = "GjZWsBLgZCR18aL468JAT7w9CZRiBnpxUPPgyQxh4voa";
export declare const DATA_JSON: {
    did: string;
    did_doc: {
        '@context': string;
        service: {
            id: string;
            type: string;
            priority: number;
            recipientKeys: string[];
            routingKeys: never[];
            serviceEndpoint: string;
        }[];
    };
};
export declare const JWS_JSON: {
    protected: string;
    signature: string;
    header: {
        kid: string;
    };
    payload: string;
};
