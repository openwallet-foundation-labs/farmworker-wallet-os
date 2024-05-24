import { WalletError } from './WalletError';
export declare class WalletInvalidKeyError extends WalletError {
    constructor(message: string, { walletType, cause }: {
        walletType: string;
        cause?: Error;
    });
}
