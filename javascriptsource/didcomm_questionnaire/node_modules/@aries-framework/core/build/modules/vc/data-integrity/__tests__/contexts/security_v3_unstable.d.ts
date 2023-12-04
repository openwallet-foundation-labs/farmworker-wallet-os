export declare const SECURITY_V3_UNSTABLE: {
    '@context': {
        '@version': number;
        id: string;
        type: string;
        '@protected': boolean;
        JsonWebKey2020: {
            '@id': string;
        };
        JsonWebSignature2020: {
            '@id': string;
            '@context': {
                '@version': number;
                id: string;
                type: string;
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
                verificationMethod: {
                    '@id': string;
                    '@type': string;
                };
            };
        };
        Ed25519VerificationKey2020: {
            '@id': string;
        };
        Ed25519Signature2020: {
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
                proofValue: {
                    '@id': string;
                    '@type': string;
                };
                verificationMethod: {
                    '@id': string;
                    '@type': string;
                };
            };
        };
        publicKeyJwk: {
            '@id': string;
            '@type': string;
        };
        ethereumAddress: {
            '@id': string;
        };
        publicKeyHex: {
            '@id': string;
        };
        blockchainAccountId: {
            '@id': string;
        };
        MerkleProof2019: {
            '@id': string;
        };
        Bls12381G1Key2020: {
            '@id': string;
        };
        Bls12381G2Key2020: {
            '@id': string;
        };
        BbsBlsSignature2020: {
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
                proofValue: string;
                verificationMethod: {
                    '@id': string;
                    '@type': string;
                };
            };
        };
        BbsBlsSignatureProof2020: {
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
                proofValue: string;
                verificationMethod: {
                    '@id': string;
                    '@type': string;
                };
            };
        };
        EcdsaKoblitzSignature2016: string;
        Ed25519Signature2018: {
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
                proofValue: string;
                verificationMethod: {
                    '@id': string;
                    '@type': string;
                };
            };
        };
        EncryptedMessage: string;
        GraphSignature2012: string;
        LinkedDataSignature2015: string;
        LinkedDataSignature2016: string;
        CryptographicKey: string;
        authenticationTag: string;
        canonicalizationAlgorithm: string;
        cipherAlgorithm: string;
        cipherData: string;
        cipherKey: string;
        created: {
            '@id': string;
            '@type': string;
        };
        creator: {
            '@id': string;
            '@type': string;
        };
        digestAlgorithm: string;
        digestValue: string;
        domain: string;
        encryptionKey: string;
        expiration: {
            '@id': string;
            '@type': string;
        };
        expires: {
            '@id': string;
            '@type': string;
        };
        initializationVector: string;
        iterationCount: string;
        nonce: string;
        normalizationAlgorithm: string;
        owner: string;
        password: string;
        privateKey: string;
        privateKeyPem: string;
        publicKey: string;
        publicKeyBase58: string;
        publicKeyPem: string;
        publicKeyWif: string;
        publicKeyService: string;
        revoked: {
            '@id': string;
            '@type': string;
        };
        salt: string;
        signature: string;
        signatureAlgorithm: string;
        signatureValue: string;
        proofValue: string;
        AesKeyWrappingKey2019: string;
        DeleteKeyOperation: string;
        DeriveSecretOperation: string;
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
                proofValue: string;
                verificationMethod: {
                    '@id': string;
                    '@type': string;
                };
            };
        };
        EcdsaSecp256k1VerificationKey2019: string;
        EcdsaSecp256r1VerificationKey2019: string;
        Ed25519VerificationKey2018: string;
        EquihashProof2018: string;
        ExportKeyOperation: string;
        GenerateKeyOperation: string;
        KmsOperation: string;
        RevokeKeyOperation: string;
        RsaSignature2018: {
            '@id': string;
            '@context': {
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
                proofValue: string;
                verificationMethod: {
                    '@id': string;
                    '@type': string;
                };
            };
        };
        RsaVerificationKey2018: string;
        Sha256HmacKey2019: string;
        SignOperation: string;
        UnwrapKeyOperation: string;
        VerifyOperation: string;
        WrapKeyOperation: string;
        X25519KeyAgreementKey2019: string;
        allowedAction: string;
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
        capability: {
            '@id': string;
            '@type': string;
        };
        capabilityAction: string;
        capabilityChain: {
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
        caveat: {
            '@id': string;
            '@type': string;
            '@container': string;
        };
        challenge: string;
        ciphertext: string;
        controller: {
            '@id': string;
            '@type': string;
        };
        delegator: {
            '@id': string;
            '@type': string;
        };
        equihashParameterK: {
            '@id': string;
            '@type': string;
        };
        equihashParameterN: {
            '@id': string;
            '@type': string;
        };
        invocationTarget: {
            '@id': string;
            '@type': string;
        };
        invoker: {
            '@id': string;
            '@type': string;
        };
        jws: string;
        keyAgreement: {
            '@id': string;
            '@type': string;
            '@container': string;
        };
        kmsModule: {
            '@id': string;
        };
        parentCapability: {
            '@id': string;
            '@type': string;
        };
        plaintext: string;
        proof: {
            '@id': string;
            '@type': string;
            '@container': string;
        };
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
        referenceId: string;
        unwrappedKey: string;
        verificationMethod: {
            '@id': string;
            '@type': string;
        };
        verifyData: string;
        wrappedKey: string;
    }[];
};
