export declare const CREDENTIALS_V1: {
    '@context': {
        '@version': number;
        '@protected': boolean;
        id: string;
        type: string;
        VerifiableCredential: {
            '@id': string;
            '@context': {
                '@version': number;
                '@protected': boolean;
                id: string;
                type: string;
                cred: string;
                sec: string;
                xsd: string;
                credentialSchema: {
                    '@id': string;
                    '@type': string;
                    '@context': {
                        '@version': number;
                        '@protected': boolean;
                        id: string;
                        type: string;
                        cred: string;
                        JsonSchemaValidator2018: string;
                    };
                };
                credentialStatus: {
                    '@id': string;
                    '@type': string;
                };
                credentialSubject: {
                    '@id': string;
                    '@type': string;
                };
                evidence: {
                    '@id': string;
                    '@type': string;
                };
                expirationDate: {
                    '@id': string;
                    '@type': string;
                };
                holder: {
                    '@id': string;
                    '@type': string;
                };
                issued: {
                    '@id': string;
                    '@type': string;
                };
                issuer: {
                    '@id': string;
                    '@type': string;
                };
                issuanceDate: {
                    '@id': string;
                    '@type': string;
                };
                proof: {
                    '@id': string;
                    '@type': string;
                    '@container': string;
                };
                refreshService: {
                    '@id': string;
                    '@type': string;
                    '@context': {
                        '@version': number;
                        '@protected': boolean;
                        id: string;
                        type: string;
                        cred: string;
                        ManualRefreshService2018: string;
                    };
                };
                termsOfUse: {
                    '@id': string;
                    '@type': string;
                };
                validFrom: {
                    '@id': string;
                    '@type': string;
                };
                validUntil: {
                    '@id': string;
                    '@type': string;
                };
            };
        };
        VerifiablePresentation: {
            '@id': string;
            '@context': {
                '@version': number;
                '@protected': boolean;
                id: string;
                type: string;
                cred: string;
                sec: string;
                holder: {
                    '@id': string;
                    '@type': string;
                };
                proof: {
                    '@id': string;
                    '@type': string;
                    '@container': string;
                };
                verifiableCredential: {
                    '@id': string;
                    '@type': string;
                    '@container': string;
                };
            };
        };
        EcdsaSecp256k1Signature2019: {
            '@id': string;
            '@context': {
                '@version': number;
                '@protected': boolean;
                id: string;
                type: string;
                sec: string;
                xsd: string;
                challenge: string;
                created: {
                    '@id': string;
                    '@type': string;
                };
                domain: string;
                expires: {
                    '@id': string;
                    '@type': string;
                };
                jws: string;
                nonce: string;
                proofPurpose: {
                    '@id': string;
                    '@type': string;
                    '@context': {
                        '@version': number;
                        '@protected': boolean;
                        id: string;
                        type: string;
                        sec: string;
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
                    };
                };
                proofValue: string;
                verificationMethod: {
                    '@id': string;
                    '@type': string;
                };
            };
        };
        EcdsaSecp256r1Signature2019: {
            '@id': string;
            '@context': {
                '@version': number;
                '@protected': boolean;
                id: string;
                type: string;
                sec: string;
                xsd: string;
                challenge: string;
                created: {
                    '@id': string;
                    '@type': string;
                };
                domain: string;
                expires: {
                    '@id': string;
                    '@type': string;
                };
                jws: string;
                nonce: string;
                proofPurpose: {
                    '@id': string;
                    '@type': string;
                    '@context': {
                        '@version': number;
                        '@protected': boolean;
                        id: string;
                        type: string;
                        sec: string;
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
                    };
                };
                proofValue: string;
                verificationMethod: {
                    '@id': string;
                    '@type': string;
                };
            };
        };
        Ed25519Signature2018: {
            '@id': string;
            '@context': {
                '@version': number;
                '@protected': boolean;
                id: string;
                type: string;
                sec: string;
                xsd: string;
                challenge: string;
                created: {
                    '@id': string;
                    '@type': string;
                };
                domain: string;
                expires: {
                    '@id': string;
                    '@type': string;
                };
                jws: string;
                nonce: string;
                proofPurpose: {
                    '@id': string;
                    '@type': string;
                    '@context': {
                        '@version': number;
                        '@protected': boolean;
                        id: string;
                        type: string;
                        sec: string;
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
                    };
                };
                proofValue: string;
                verificationMethod: {
                    '@id': string;
                    '@type': string;
                };
            };
        };
        RsaSignature2018: {
            '@id': string;
            '@context': {
                '@version': number;
                '@protected': boolean;
                challenge: string;
                created: {
                    '@id': string;
                    '@type': string;
                };
                domain: string;
                expires: {
                    '@id': string;
                    '@type': string;
                };
                jws: string;
                nonce: string;
                proofPurpose: {
                    '@id': string;
                    '@type': string;
                    '@context': {
                        '@version': number;
                        '@protected': boolean;
                        id: string;
                        type: string;
                        sec: string;
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
                    };
                };
                proofValue: string;
                verificationMethod: {
                    '@id': string;
                    '@type': string;
                };
            };
        };
        proof: {
            '@id': string;
            '@type': string;
            '@container': string;
        };
    };
};
