export declare const VACCINATION_V1: {
    '@context': {
        '@version': number;
        '@protected': boolean;
        id: string;
        type: string;
        description: string;
        identifier: string;
        name: string;
        image: string;
        VaccinationCertificate: {
            '@id': string;
            '@context': {
                '@version': number;
                '@protected': boolean;
                id: string;
                type: string;
                description: string;
                identifier: string;
                name: string;
                image: string;
            };
        };
        VaccinationEvent: {
            '@id': string;
            '@context': {
                '@version': number;
                '@protected': boolean;
                id: string;
                type: string;
                administeringCentre: string;
                batchNumber: string;
                countryOfVaccination: string;
                dateOfVaccination: {
                    '@id': string;
                    '@type': string;
                };
                healthProfessional: string;
                nextVaccinationDate: {
                    '@id': string;
                    '@type': string;
                };
                order: string;
                recipient: {
                    '@id': string;
                    '@type': string;
                };
                vaccine: {
                    '@id': string;
                    '@type': string;
                };
            };
        };
        VaccineRecipient: {
            '@id': string;
            '@context': {
                '@version': number;
                '@protected': boolean;
                id: string;
                type: string;
                birthDate: {
                    '@id': string;
                    '@type': string;
                };
                familyName: string;
                gender: string;
                givenName: string;
            };
        };
        Vaccine: {
            '@id': string;
            '@context': {
                '@version': number;
                '@protected': boolean;
                id: string;
                type: string;
                atcCode: string;
                disease: string;
                event: {
                    '@id': string;
                    '@type': string;
                };
                marketingAuthorizationHolder: string;
                medicinalProductName: string;
            };
        };
    };
};
