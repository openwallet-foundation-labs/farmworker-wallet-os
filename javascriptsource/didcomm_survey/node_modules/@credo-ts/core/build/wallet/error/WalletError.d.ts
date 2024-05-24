import { CredoError } from '../../error/CredoError';
export declare class WalletError extends CredoError {
    constructor(message: string, { cause }?: {
        cause?: Error;
    });
}
