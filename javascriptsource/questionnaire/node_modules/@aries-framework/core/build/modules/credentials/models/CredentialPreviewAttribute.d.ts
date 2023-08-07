export interface CredentialPreviewAttributeOptions {
    name: string;
    mimeType?: string;
    value: string;
}
export declare class CredentialPreviewAttribute {
    constructor(options: CredentialPreviewAttributeOptions);
    name: string;
    mimeType?: string;
    value: string;
    toJSON(): Record<string, unknown>;
}
export interface CredentialPreviewOptions {
    attributes: CredentialPreviewAttributeOptions[];
}
