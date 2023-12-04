export declare const VC_REVOCATION_LIST_2020: {
    '@context': {
        '@protected': boolean;
        RevocationList2020Credential: {
            '@id': string;
            '@context': {
                '@protected': boolean;
                id: string;
                type: string;
                description: string;
                name: string;
            };
        };
        RevocationList2020: {
            '@id': string;
            '@context': {
                '@protected': boolean;
                id: string;
                type: string;
                encodedList: string;
            };
        };
        RevocationList2020Status: {
            '@id': string;
            '@context': {
                '@protected': boolean;
                id: string;
                type: string;
                revocationListCredential: {
                    '@id': string;
                    '@type': string;
                };
                revocationListIndex: string;
            };
        };
    };
};
