import { CredoError } from './CredoError';
export declare class RecordNotFoundError extends CredoError {
    constructor(message: string, { recordType, cause }: {
        recordType: string;
        cause?: Error;
    });
}
