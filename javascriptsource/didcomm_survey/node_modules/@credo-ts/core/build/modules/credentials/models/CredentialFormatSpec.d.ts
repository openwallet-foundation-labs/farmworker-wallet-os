export interface CredentialFormatSpecOptions {
    attachmentId?: string;
    format: string;
}
export declare class CredentialFormatSpec {
    constructor(options: CredentialFormatSpecOptions);
    attachmentId: string;
    format: string;
}
