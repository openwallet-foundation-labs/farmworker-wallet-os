import type { SigningProvider } from './SigningProvider';
import type { KeyType } from '../KeyType';
export declare const SigningProviderToken: unique symbol;
export declare class SigningProviderRegistry {
    private signingKeyProviders;
    constructor(signingKeyProviders: Array<'default' | SigningProvider>);
    hasProviderForKeyType(keyType: KeyType): boolean;
    getProviderForKeyType(keyType: KeyType): SigningProvider;
    get supportedKeyTypes(): KeyType[];
}
