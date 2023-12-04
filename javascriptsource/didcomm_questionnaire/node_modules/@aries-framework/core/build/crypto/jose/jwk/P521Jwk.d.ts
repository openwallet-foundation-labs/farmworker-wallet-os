import type { JwkJson } from './Jwk';
import type { JwaEncryptionAlgorithm } from '../jwa/alg';
import { Buffer } from '../../../utils';
import { KeyType } from '../../KeyType';
import { JwaCurve, JwaKeyType } from '../jwa';
import { JwaSignatureAlgorithm } from '../jwa/alg';
import { Jwk } from './Jwk';
export declare class P521Jwk extends Jwk {
    static readonly supportedEncryptionAlgorithms: JwaEncryptionAlgorithm[];
    static readonly supportedSignatureAlgorithms: JwaSignatureAlgorithm[];
    static readonly keyType = KeyType.P521;
    readonly x: string;
    readonly y: string;
    constructor({ x, y }: {
        x: string;
        y: string;
    });
    get kty(): JwaKeyType.EC;
    get crv(): JwaCurve.P521;
    get keyType(): KeyType;
    get supportedEncryptionAlgorithms(): JwaEncryptionAlgorithm[];
    get supportedSignatureAlgorithms(): JwaSignatureAlgorithm[];
    /**
     * Returns the public key of the P-521 JWK.
     *
     * NOTE: this is the compressed variant. We still need to add support for the
     * uncompressed variant.
     */
    get publicKey(): Buffer;
    toJson(): P521JwkJson;
    static fromJson(jwk: JwkJson): P521Jwk;
    static fromPublicKey(publicKey: Buffer): P521Jwk;
}
export interface P521JwkJson extends JwkJson {
    kty: JwaKeyType.EC;
    crv: JwaCurve.P521;
    x: string;
    y: string;
    use?: 'sig' | 'enc';
}
export declare function isValidP521JwkPublicKey(jwk: JwkJson): jwk is P521JwkJson;
