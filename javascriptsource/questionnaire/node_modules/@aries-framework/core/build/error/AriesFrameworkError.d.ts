import { BaseError } from './BaseError';
export declare class AriesFrameworkError extends BaseError {
    /**
     * Create base AriesFrameworkError.
     * @param message the error message
     * @param cause the error that caused this error to be created
     */
    constructor(message: string, { cause }?: {
        cause?: Error;
    });
}
