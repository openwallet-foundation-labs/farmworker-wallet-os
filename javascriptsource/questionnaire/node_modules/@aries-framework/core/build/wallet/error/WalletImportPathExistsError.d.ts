import { WalletError } from './WalletError';
export declare class WalletImportPathExistsError extends WalletError {
    constructor(message: string, { cause }?: {
        cause?: Error;
    });
}
