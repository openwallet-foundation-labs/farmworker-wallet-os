export declare const SECP256K1_V1: {
    '@context': {
        id: string;
        type: string;
        '@protected': boolean;
        proof: {
            '@id': string;
            '@type': string;
            '@container': string;
        };
        EcdsaSecp256k1VerificationKey2019: {
            '@id': string;
            '@context': {
                '@protected': boolean;
                id: string;
                type: string;
                controller: {
                    '@id': string;
                    '@type': string;
                };
                revoked: {
                    '@id': string;
                    '@type': string;
                };
                blockchainAccountId: {
                    '@id': string;
                };
                publicKeyJwk: {
                    '@id': string;
                    '@type': string;
                };
                publicKeyBase58: {
                    '@id': string;
                };
                publicKeyMultibase: {
                    '@id': string;
                    '@type': string;
                };
            };
        };
        EcdsaSecp256k1Signature2019: {
            '@id': string;
            '@context': {
                '@protected': boolean;
                id: string;
                type: string;
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
                nonce: string;
                proofPurpose: {
                    '@id': string;
                    '@type': string;
                    '@context': {
                        '@protected': boolean;
                        id: string;
                        type: string;
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
                        capabilityInvocation: {
                            '@id': string;
                            '@type': string;
                            '@container': string;
                        };
                        capabilityDelegation: {
                            '@id': string;
                            '@type': string;
                            '@container': string;
                        };
                        keyAgreement: {
                            '@id': string;
                            '@type': string;
                            '@container': string;
                        };
                    };
                };
                jws: {
                    '@id': string;
                };
                verificationMethod: {
                    '@id': string;
                    '@type': string;
                };
            };
        };
    };
};
