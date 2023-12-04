import type { Buffer } from '../../../utils';
import type { KeyType } from '../../KeyType';
import type { JwaKeyType, JwaEncryptionAlgorithm, JwaSignatureAlgorithm } from '../jwa';
import { Key } from '../../Key';
export interface JwkJson {
    kty: string;
    use?: string;
    [key: string]: unknown;
}
export declare abstract class Jwk {
    abstract publicKey: Buffer;
    abstract supportedSignatureAlgorithms: JwaSignatureAlgorithm[];
    abstract supportedEncryptionAlgorithms: JwaEncryptionAlgorithm[];
    /**
     * keyType as used by the rest of the framework, can be used in the
     * `Wallet`, `Key` and other classes.
     */
    abstract keyType: KeyType;
    /**
     * key type as defined in [JWA Specification](https://tools.ietf.org/html/rfc7518#section-6.1)
     */
    abstract kty: JwaKeyType;
    use?: string;
    toJson(): JwkJson;
    get key(): Key;
    supportsSignatureAlgorithm(algorithm: JwaSignatureAlgorithm | string): boolean;
    supportsEncryptionAlgorithm(algorithm: JwaEncryptionAlgorithm | string): boolean;
}
