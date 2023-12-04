import type { Key } from './Key';
import type { LdKeyPairOptions } from '../modules/vc/data-integrity/models/LdKeyPair';
import type { Wallet } from '../wallet';
import { VerificationMethod } from '../modules/dids';
interface WalletKeyPairOptions extends LdKeyPairOptions {
    wallet: Wallet;
    key: Key;
}
export declare function createWalletKeyPairClass(wallet: Wallet): {
    new (options: WalletKeyPairOptions): {
        wallet: Wallet;
        key: Key;
        type: string;
        fingerprint(): string;
        verifyFingerprint(fingerprint: string): boolean;
        /**
         * This method returns a wrapped wallet.sign method. The method is being wrapped so we can covert between Uint8Array and Buffer. This is to make it compatible with the external signature libraries.
         */
        signer(): {
            sign: (data: {
                data: Uint8Array | Uint8Array[];
            }) => Promise<Uint8Array>;
        };
        /**
         * This method returns a wrapped wallet.verify method. The method is being wrapped so we can covert between Uint8Array and Buffer. This is to make it compatible with the external signature libraries.
         */
        verifier(): {
            verify: (data: {
                data: Uint8Array | Uint8Array[];
                signature: Uint8Array;
            }) => Promise<boolean>;
        };
        readonly publicKeyBuffer: Uint8Array;
        readonly id: string;
        readonly controller: string;
        export(publicKey?: boolean, privateKey?: boolean): {
            id: string;
            type: string;
            controller: string;
        };
    };
    generate(): Promise<{
        wallet: Wallet;
        key: Key;
        type: string;
        fingerprint(): string;
        verifyFingerprint(fingerprint: string): boolean;
        /**
         * This method returns a wrapped wallet.sign method. The method is being wrapped so we can covert between Uint8Array and Buffer. This is to make it compatible with the external signature libraries.
         */
        signer(): {
            sign: (data: {
                data: Uint8Array | Uint8Array[];
            }) => Promise<Uint8Array>;
        };
        /**
         * This method returns a wrapped wallet.verify method. The method is being wrapped so we can covert between Uint8Array and Buffer. This is to make it compatible with the external signature libraries.
         */
        verifier(): {
            verify: (data: {
                data: Uint8Array | Uint8Array[];
                signature: Uint8Array;
            }) => Promise<boolean>;
        };
        readonly publicKeyBuffer: Uint8Array;
        readonly id: string;
        readonly controller: string;
        export(publicKey?: boolean, privateKey?: boolean): {
            id: string;
            type: string;
            controller: string;
        };
    }>;
    from(verificationMethod: VerificationMethod): Promise<{
        wallet: Wallet;
        key: Key;
        type: string;
        fingerprint(): string;
        verifyFingerprint(fingerprint: string): boolean;
        /**
         * This method returns a wrapped wallet.sign method. The method is being wrapped so we can covert between Uint8Array and Buffer. This is to make it compatible with the external signature libraries.
         */
        signer(): {
            sign: (data: {
                data: Uint8Array | Uint8Array[];
            }) => Promise<Uint8Array>;
        };
        /**
         * This method returns a wrapped wallet.verify method. The method is being wrapped so we can covert between Uint8Array and Buffer. This is to make it compatible with the external signature libraries.
         */
        verifier(): {
            verify: (data: {
                data: Uint8Array | Uint8Array[];
                signature: Uint8Array;
            }) => Promise<boolean>;
        };
        readonly publicKeyBuffer: Uint8Array;
        readonly id: string;
        readonly controller: string;
        export(publicKey?: boolean, privateKey?: boolean): {
            id: string;
            type: string;
            controller: string;
        };
    }>;
};
export {};
