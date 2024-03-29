export declare const SEED = "00000000000000000000000000000My2";
export declare const PUBLIC_KEY_BASE58 = "kqa2HyagzfMAq42H5f9u3UMwnSBPQx2QfrSyXbUPxMn";
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
    header: {
        kid: string;
    };
    protected: string;
    signature: string;
    payload: string;
};
