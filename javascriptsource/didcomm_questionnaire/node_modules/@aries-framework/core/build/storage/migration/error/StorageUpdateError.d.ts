import { AriesFrameworkError } from '../../../error/AriesFrameworkError';
export declare class StorageUpdateError extends AriesFrameworkError {
    constructor(message: string, { cause }?: {
        cause?: Error;
    });
}
