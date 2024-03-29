export declare const SEED = "00000000000000000000000000000My3";
export declare const PUBLIC_KEY_BASE58 = "2ARvZ9WjdavGb3db6i1TR3bNW8QxqfG9YPHAJJXCsRj2t";
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
