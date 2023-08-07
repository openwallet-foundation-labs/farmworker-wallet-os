export interface ProofFormatSpecOptions {
    attachmentId?: string;
    format: string;
}
export declare class ProofFormatSpec {
    constructor(options: ProofFormatSpecOptions);
    attachmentId: string;
    format: string;
}
