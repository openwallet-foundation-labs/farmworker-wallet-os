import { WalletError } from './WalletError';
export declare class WalletDuplicateError extends WalletError {
    constructor(message: string, { walletType, cause }: {
        walletType: string;
        cause?: Error;
    });
}
