import { AriesFrameworkError } from '../../error/AriesFrameworkError';
export declare class WalletError extends AriesFrameworkError {
    constructor(message: string, { cause }?: {
        cause?: Error;
    });
}
