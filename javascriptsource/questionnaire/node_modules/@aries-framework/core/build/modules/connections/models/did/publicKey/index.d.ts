import { Ed25119Sig2018 } from './Ed25119Sig2018';
import { EddsaSaSigSecp256k1 } from './EddsaSaSigSecp256k1';
import { PublicKey } from './PublicKey';
import { RsaSig2018 } from './RsaSig2018';
export declare const publicKeyTypes: {
    [key: string]: unknown | undefined;
};
/**
 * Decorator that transforms public key json to corresonding class instances. See {@link publicKeyTypes}
 *
 * @example
 * class Example {
 *   ＠PublicKeyTransformer()
 *   private publicKey: PublicKey
 * }
 */
export declare function PublicKeyTransformer(): PropertyDecorator;
export { Ed25119Sig2018, PublicKey, EddsaSaSigSecp256k1, RsaSig2018 };
