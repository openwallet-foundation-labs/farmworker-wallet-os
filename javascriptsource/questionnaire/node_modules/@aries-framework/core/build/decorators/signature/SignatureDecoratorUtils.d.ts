import type { Wallet } from '../../wallet/Wallet';
import { SignatureDecorator } from './SignatureDecorator';
/**
 * Unpack and verify signed data before casting it to the supplied type.
 *
 * @param decorator Signature decorator to unpack and verify
 * @param wallet wallet instance
 *
 * @return Resulting data
 */
export declare function unpackAndVerifySignatureDecorator(decorator: SignatureDecorator, wallet: Wallet): Promise<Record<string, unknown>>;
/**
 * Sign data supplied and return a signature decorator.
 *
 * @param data the data to sign
 * @param wallet the wallet containing a key to use for signing
 * @param signerKey signers verkey
 *
 * @returns Resulting signature decorator.
 */
export declare function signData(data: unknown, wallet: Wallet, signerKey: string): Promise<SignatureDecorator>;
