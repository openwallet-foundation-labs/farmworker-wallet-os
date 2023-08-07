import { WalletError } from './WalletError';
export declare class WalletNotFoundError extends WalletError {
    constructor(message: string, { walletType, cause }: {
        walletType: string;
        cause?: Error;
    });
}
