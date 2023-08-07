export declare const PURL_OB_V3P0: {
    '@context': {
        id: string;
        type: string;
        xsd: string;
        OpenBadgeCredential: {
            '@id': string;
        };
        Achievement: {
            '@id': string;
            '@context': {
                achievementType: {
                    '@id': string;
                    '@type': string;
                };
                alignment: {
                    '@id': string;
                    '@type': string;
                    '@container': string;
                };
                creator: {
                    '@id': string;
                };
                creditsAvailable: {
                    '@id': string;
                    '@type': string;
                };
                criteria: {
                    '@id': string;
                    '@type': string;
                };
                fieldOfStudy: {
                    '@id': string;
                    '@type': string;
                };
                humanCode: {
                    '@id': string;
                    '@type': string;
                };
                otherIdentifier: {
                    '@id': string;
                    '@type': string;
                    '@container': string;
                };
                related: {
                    '@id': string;
                    '@type': string;
                    '@container': string;
                };
                resultDescription: {
                    '@id': string;
                    '@type': string;
                    '@container': string;
                };
                specialization: {
                    '@id': string;
                    '@type': string;
                };
                tag: {
                    '@id': string;
                    '@type': string;
                    '@container': string;
                };
                version: {
                    '@id': string;
                    '@type': string;
                };
            };
        };
        AchievementCredential: {
            '@id': string;
        };
        AchievementSubject: {
            '@id': string;
            '@context': {
                achievement: {
                    '@id': string;
                };
                activityEndDate: {
                    '@id': string;
                    '@type': string;
                };
                activityStartDate: {
                    '@id': string;
                    '@type': string;
                };
                creditsEarned: {
                    '@id': string;
                    '@type': string;
                };
                identifier: {
                    '@id': string;
                    '@type': string;
                    '@container': string;
                };
                licenseNumber: {
                    '@id': string;
                    '@type': string;
                };
                result: {
                    '@id': string;
                    '@type': string;
                    '@container': string;
                };
                role: {
                    '@id': string;
                    '@type': string;
                };
                source: {
                    '@id': string;
                    '@type': string;
                };
                term: {
                    '@id': string;
                    '@type': string;
                };
            };
        };
        Address: {
            '@id': string;
            '@context': {
                addressCountry: {
                    '@id': string;
                    '@type': string;
                };
                addressCountryCode: {
                    '@id': string;
                    '@type': string;
                };
                addressLocality: {
                    '@id': string;
                    '@type': string;
                };
                addressRegion: {
                    '@id': string;
                    '@type': string;
                };
                geo: {
                    '@id': string;
                };
                postOfficeBoxNumber: {
                    '@id': string;
                    '@type': string;
                };
                postalCode: {
                    '@id': string;
                    '@type': string;
                };
                streetAddress: {
                    '@id': string;
                    '@type': string;
                };
            };
        };
        Alignment: {
            '@id': string;
            '@context': {
                targetCode: {
                    '@id': string;
                    '@type': string;
                };
                targetDescription: {
                    '@id': string;
                    '@type': string;
                };
                targetFramework: {
                    '@id': string;
                    '@type': string;
                };
                targetName: {
                    '@id': string;
                    '@type': string;
                };
                targetType: {
                    '@id': string;
                    '@type': string;
                };
                targetUrl: {
                    '@id': string;
                    '@type': string;
                };
            };
        };
        Criteria: {
            '@id': string;
        };
        EndorsementCredential: {
            '@id': string;
        };
        EndorsementSubject: {
            '@id': string;
            '@context': {
                endorsementComment: {
                    '@id': string;
                    '@type': string;
                };
            };
        };
        Evidence: {
            '@id': string;
            '@context': {
                audience: {
                    '@id': string;
                    '@type': string;
                };
                genre: {
                    '@id': string;
                    '@type': string;
                };
            };
        };
        GeoCoordinates: {
            '@id': string;
            '@context': {
                latitude: {
                    '@id': string;
                    '@type': string;
                };
                longitude: {
                    '@id': string;
                    '@type': string;
                };
            };
        };
        IdentifierEntry: {
            '@id': string;
            '@context': {
                identifier: {
                    '@id': string;
                    '@type': string;
                };
                identifierType: {
                    '@id': string;
                    '@type': string;
                };
            };
        };
        IdentityObject: {
            '@id': string;
            '@context': {
                hashed: {
                    '@id': string;
                    '@type': string;
                };
                identityHash: {
                    '@id': string;
                    '@type': string;
                };
                identityType: {
                    '@id': string;
                    '@type': string;
                };
                salt: {
                    '@id': string;
                    '@type': string;
                };
            };
        };
        Image: {
            '@id': string;
            '@context': {
                caption: {
                    '@id': string;
                    '@type': string;
                };
            };
        };
        Profile: {
            '@id': string;
            '@context': {
                additionalName: {
                    '@id': string;
                    '@type': string;
                };
                address: {
                    '@id': string;
                };
                dateOfBirth: {
                    '@id': string;
                    '@type': string;
                };
                email: {
                    '@id': string;
                    '@type': string;
                };
                familyName: {
                    '@id': string;
                    '@type': string;
                };
                familyNamePrefix: {
                    '@id': string;
                    '@type': string;
                };
                givenName: {
                    '@id': string;
                    '@type': string;
                };
                honorificPrefix: {
                    '@id': string;
                    '@type': string;
                };
                honorificSuffix: {
                    '@id': string;
                    '@type': string;
                };
                otherIdentifier: {
                    '@id': string;
                    '@type': string;
                    '@container': string;
                };
                parentOrg: {
                    '@id': string;
                    '@type': string;
                };
                patronymicName: {
                    '@id': string;
                    '@type': string;
                };
                phone: {
                    '@id': string;
                    '@type': string;
                };
                official: {
                    '@id': string;
                    '@type': string;
                };
            };
        };
        Related: {
            '@id': string;
            '@context': {
                version: {
                    '@id': string;
                    '@type': string;
                };
            };
        };
        Result: {
            '@id': string;
            '@context': {
                achievedLevel: {
                    '@id': string;
                    '@type': string;
                };
                resultDescription: {
                    '@id': string;
                    '@type': string;
                };
                status: {
                    '@id': string;
                    '@type': string;
                };
                value: {
                    '@id': string;
                    '@type': string;
                };
            };
        };
        ResultDescription: {
            '@id': string;
            '@context': {
                allowedValue: {
                    '@id': string;
                    '@type': string;
                    '@container': string;
                };
                requiredLevel: {
                    '@id': string;
                    '@type': string;
                };
                requiredValue: {
                    '@id': string;
                    '@type': string;
                };
                resultType: {
                    '@id': string;
                    '@type': string;
                };
                rubricCriterionLevel: {
                    '@id': string;
                    '@type': string;
                    '@container': string;
                };
                valueMax: {
                    '@id': string;
                    '@type': string;
                };
                valueMin: {
                    '@id': string;
                    '@type': string;
                };
            };
        };
        RubricCriterionLevel: {
            '@id': string;
            '@context': {
                level: {
                    '@id': string;
                    '@type': string;
                };
                points: {
                    '@id': string;
                    '@type': string;
                };
            };
        };
        alignment: {
            '@id': string;
            '@type': string;
            '@container': string;
        };
        description: {
            '@id': string;
            '@type': string;
        };
        endorsement: {
            '@id': string;
            '@type': string;
            '@container': string;
        };
        image: {
            '@id': string;
            '@type': string;
        };
        name: {
            '@id': string;
            '@type': string;
        };
        narrative: {
            '@id': string;
            '@type': string;
        };
        url: {
            '@id': string;
            '@type': string;
        };
    };
};
