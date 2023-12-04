import type { JwkJson } from './Jwk';
import type { JwaEncryptionAlgorithm } from '../jwa/alg';
import { Buffer } from '../../../utils';
import { KeyType } from '../../KeyType';
import { JwaCurve, JwaKeyType } from '../jwa';
import { JwaSignatureAlgorithm } from '../jwa/alg';
import { Jwk } from './Jwk';
export declare class P256Jwk extends Jwk {
    static readonly supportedEncryptionAlgorithms: JwaEncryptionAlgorithm[];
    static readonly supportedSignatureAlgorithms: JwaSignatureAlgorithm[];
    static readonly keyType = KeyType.P256;
    readonly x: string;
    readonly y: string;
    constructor({ x, y }: {
        x: string;
        y: string;
    });
    get kty(): JwaKeyType.EC;
    get crv(): JwaCurve.P256;
    /**
     * Returns the public key of the P-256 JWK.
     *
     * NOTE: this is the compressed variant. We still need to add support for the
     * uncompressed variant.
     */
    get publicKey(): Buffer;
    get keyType(): KeyType;
    get supportedEncryptionAlgorithms(): JwaEncryptionAlgorithm[];
    get supportedSignatureAlgorithms(): JwaSignatureAlgorithm[];
    toJson(): P256JwkJson;
    static fromJson(jwkJson: JwkJson): P256Jwk;
    static fromPublicKey(publicKey: Buffer): P256Jwk;
}
export interface P256JwkJson extends JwkJson {
    kty: JwaKeyType.EC;
    crv: JwaCurve.P256;
    x: string;
    y: string;
    use?: 'sig' | 'enc';
}
export declare function isValidP256JwkPublicKey(jwk: JwkJson): jwk is P256JwkJson;
