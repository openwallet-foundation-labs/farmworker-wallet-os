import { WalletError } from './WalletError';
export declare class WalletKeyExistsError extends WalletError {
    constructor(message: string, { cause }?: {
        cause?: Error;
    });
}
