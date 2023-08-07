export declare const BBS_V1: {
    '@context': {
        '@version': number;
        id: string;
        type: string;
        BbsBlsSignature2020: {
            '@id': string;
            '@context': {
                '@version': number;
                '@protected': boolean;
                id: string;
                type: string;
                challenge: string;
                created: {
                    '@id': string;
                    '@type': string;
                };
                domain: string;
                proofValue: string;
                nonce: string;
                proofPurpose: {
                    '@id': string;
                    '@type': string;
                    '@context': {
                        '@version': number;
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
                    };
                };
                verificationMethod: {
                    '@id': string;
                    '@type': string;
                };
            };
        };
        BbsBlsSignatureProof2020: {
            '@id': string;
            '@context': {
                '@version': number;
                '@protected': boolean;
                id: string;
                type: string;
                challenge: string;
                created: {
                    '@id': string;
                    '@type': string;
                };
                domain: string;
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
        Bls12381G1Key2020: {
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
                publicKeyBase58: {
                    '@id': string;
                };
            };
        };
        Bls12381G2Key2020: {
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
                publicKeyBase58: {
                    '@id': string;
                };
            };
        };
    };
};
