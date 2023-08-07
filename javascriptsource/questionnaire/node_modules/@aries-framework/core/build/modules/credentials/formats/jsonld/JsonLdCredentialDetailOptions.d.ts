export interface JsonLdCredentialDetailCredentialStatusOptions {
    type: string;
}
export declare class JsonLdCredentialDetailCredentialStatus {
    constructor(options: JsonLdCredentialDetailCredentialStatusOptions);
    type: string;
}
export interface JsonLdCredentialDetailOptionsOptions {
    proofPurpose: string;
    created?: string;
    domain?: string;
    challenge?: string;
    credentialStatus?: JsonLdCredentialDetailCredentialStatus;
    proofType: string;
}
export declare class JsonLdCredentialDetailOptions {
    constructor(options: JsonLdCredentialDetailOptionsOptions);
    proofPurpose: string;
    created?: string;
    domain?: string;
    challenge?: string;
    proofType: string;
    credentialStatus?: JsonLdCredentialDetailCredentialStatus;
}
