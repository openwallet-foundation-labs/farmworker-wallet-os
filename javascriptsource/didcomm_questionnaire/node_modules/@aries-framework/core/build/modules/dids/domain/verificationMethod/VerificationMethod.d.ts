import type { JwkJson } from '../../../../crypto/jose/jwk/Jwk';
export interface VerificationMethodOptions {
    id: string;
    type: string;
    controller: string;
    publicKeyBase58?: string;
    publicKeyBase64?: string;
    publicKeyJwk?: JwkJson;
    publicKeyHex?: string;
    publicKeyMultibase?: string;
    publicKeyPem?: string;
    blockchainAccountId?: string;
    ethereumAddress?: string;
}
export declare class VerificationMethod {
    constructor(options: VerificationMethodOptions);
    id: string;
    type: string;
    controller: string;
    publicKeyBase58?: string;
    publicKeyBase64?: string;
    publicKeyJwk?: JwkJson;
    publicKeyHex?: string;
    publicKeyMultibase?: string;
    publicKeyPem?: string;
    blockchainAccountId?: string;
    ethereumAddress?: string;
}
