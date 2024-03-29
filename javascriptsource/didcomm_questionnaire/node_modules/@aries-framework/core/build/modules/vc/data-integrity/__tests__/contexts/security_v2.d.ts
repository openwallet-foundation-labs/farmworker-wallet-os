export declare const SECURITY_V2: {
    '@context': (string | {
        '@version': number;
        AesKeyWrappingKey2019?: undefined;
        DeleteKeyOperation?: undefined;
        DeriveSecretOperation?: undefined;
        EcdsaSecp256k1Signature2019?: undefined;
        EcdsaSecp256r1Signature2019?: undefined;
        EcdsaSecp256k1VerificationKey2019?: undefined;
        EcdsaSecp256r1VerificationKey2019?: undefined;
        Ed25519Signature2018?: undefined;
        Ed25519VerificationKey2018?: undefined;
        EquihashProof2018?: undefined;
        ExportKeyOperation?: undefined;
        GenerateKeyOperation?: undefined;
        KmsOperation?: undefined;
        RevokeKeyOperation?: undefined;
        RsaSignature2018?: undefined;
        RsaVerificationKey2018?: undefined;
        Sha256HmacKey2019?: undefined;
        SignOperation?: undefined;
        UnwrapKeyOperation?: undefined;
        VerifyOperation?: undefined;
        WrapKeyOperation?: undefined;
        X25519KeyAgreementKey2019?: undefined;
        allowedAction?: undefined;
        assertionMethod?: undefined;
        authentication?: undefined;
        capability?: undefined;
        capabilityAction?: undefined;
        capabilityChain?: undefined;
        capabilityDelegation?: undefined;
        capabilityInvocation?: undefined;
        caveat?: undefined;
        challenge?: undefined;
        ciphertext?: undefined;
        controller?: undefined;
        delegator?: undefined;
        equihashParameterK?: undefined;
        equihashParameterN?: undefined;
        invocationTarget?: undefined;
        invoker?: undefined;
        jws?: undefined;
        keyAgreement?: undefined;
        kmsModule?: undefined;
        parentCapability?: undefined;
        plaintext?: undefined;
        proof?: undefined;
        proofPurpose?: undefined;
        proofValue?: undefined;
        referenceId?: undefined;
        unwrappedKey?: undefined;
        verificationMethod?: undefined;
        verifyData?: undefined;
        wrappedKey?: undefined;
    } | {
        AesKeyWrappingKey2019: string;
        DeleteKeyOperation: string;
        DeriveSecretOperation: string;
        EcdsaSecp256k1Signature2019: string;
        EcdsaSecp256r1Signature2019: string;
        EcdsaSecp256k1VerificationKey2019: string;
        EcdsaSecp256r1VerificationKey2019: string;
        Ed25519Signature2018: string;
        Ed25519VerificationKey2018: string;
        EquihashProof2018: string;
        ExportKeyOperation: string;
        GenerateKeyOperation: string;
        KmsOperation: string;
        RevokeKeyOperation: string;
        RsaSignature2018: string;
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
        };
        proofValue: string;
        referenceId: string;
        unwrappedKey: string;
        verificationMethod: {
            '@id': string;
            '@type': string;
        };
        verifyData: string;
        wrappedKey: string;
        '@version'?: undefined;
    })[];
};
