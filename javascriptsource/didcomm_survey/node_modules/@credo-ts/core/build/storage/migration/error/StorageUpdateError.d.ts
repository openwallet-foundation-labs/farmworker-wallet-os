import { CredoError } from '../../../error/CredoError';
export declare class StorageUpdateError extends CredoError {
    constructor(message: string, { cause }?: {
        cause?: Error;
    });
}
