import { WalletError } from './WalletError';
export declare class WalletExportUnsupportedError extends WalletError {
    constructor(message: string, { cause }?: {
        cause?: Error;
    });
}
