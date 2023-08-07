export declare const CITIZENSHIP_V1: {
    '@context': {
        '@version': number;
        '@protected': boolean;
        name: string;
        description: string;
        identifier: string;
        image: {
            '@id': string;
            '@type': string;
        };
        PermanentResidentCard: {
            '@id': string;
            '@context': {
                '@version': number;
                '@protected': boolean;
                id: string;
                type: string;
                description: string;
                name: string;
                identifier: string;
                image: {
                    '@id': string;
                    '@type': string;
                };
            };
        };
        PermanentResident: {
            '@id': string;
            '@context': {
                '@version': number;
                '@protected': boolean;
                id: string;
                type: string;
                ctzn: string;
                schema: string;
                xsd: string;
                birthCountry: string;
                birthDate: {
                    '@id': string;
                    '@type': string;
                };
                commuterClassification: string;
                familyName: string;
                gender: string;
                givenName: string;
                lprCategory: string;
                lprNumber: string;
                residentSince: {
                    '@id': string;
                    '@type': string;
                };
            };
        };
        Person: string;
    };
};
