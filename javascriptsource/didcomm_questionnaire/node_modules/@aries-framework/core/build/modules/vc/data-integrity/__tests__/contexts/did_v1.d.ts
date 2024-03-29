export declare const DID_V1: {
    '@context': {
        '@protected': boolean;
        id: string;
        type: string;
        alsoKnownAs: {
            '@id': string;
            '@type': string;
        };
        assertionMethod: {
            '@id': string;
            '@type': string;
            '@container': string;
        };
        authentication: {
            '@id': string;
            '@type': string;
            '@container': string;
        };
        capabilityDelegation: {
            '@id': string;
            '@type': string;
            '@container': string;
        };
        capabilityInvocation: {
            '@id': string;
            '@type': string;
            '@container': string;
        };
        controller: {
            '@id': string;
            '@type': string;
        };
        keyAgreement: {
            '@id': string;
            '@type': string;
            '@container': string;
        };
        service: {
            '@id': string;
            '@type': string;
            '@context': {
                '@protected': boolean;
                id: string;
                type: string;
                serviceEndpoint: {
                    '@id': string;
                    '@type': string;
                };
            };
        };
        verificationMethod: {
            '@id': string;
        };
    };
};
