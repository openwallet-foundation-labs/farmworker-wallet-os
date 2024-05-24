import { CredoError } from './CredoError';
export declare class RecordDuplicateError extends CredoError {
    constructor(message: string, { recordType, cause }: {
        recordType: string;
        cause?: Error;
    });
}
