import { WalletError } from './WalletError';
export declare class WalletExportPathExistsError extends WalletError {
    constructor(message: string, { cause }?: {
        cause?: Error;
    });
}
