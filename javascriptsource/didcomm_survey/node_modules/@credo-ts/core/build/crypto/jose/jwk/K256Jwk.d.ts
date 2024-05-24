import type { JwkJson } from './Jwk';
import type { JwaEncryptionAlgorithm } from '../jwa/alg';
import { Buffer } from '../../../utils';
import { KeyType } from '../../KeyType';
import { JwaCurve, JwaKeyType } from '../jwa';
import { JwaSignatureAlgorithm } from '../jwa/alg';
import { Jwk } from './Jwk';
export declare class K256Jwk extends Jwk {
    static readonly supportedEncryptionAlgorithms: JwaEncryptionAlgorithm[];
    static readonly supportedSignatureAlgorithms: JwaSignatureAlgorithm[];
    static readonly keyType = KeyType.K256;
    readonly x: string;
    readonly y: string;
    constructor({ x, y }: {
        x: string;
        y: string;
    });
    get kty(): JwaKeyType.EC;
    get crv(): JwaCurve.Secp256k1;
    /**
     * Returns the public key of the K-256 JWK.
     *
     * NOTE: this is the compressed variant. We still need to add support for the
     * uncompressed variant.
     */
    get publicKey(): Buffer;
    get keyType(): KeyType;
    get supportedEncryptionAlgorithms(): JwaEncryptionAlgorithm[];
    get supportedSignatureAlgorithms(): JwaSignatureAlgorithm[];
    toJson(): K256JwkJson;
    static fromJson(jwkJson: JwkJson): K256Jwk;
    static fromPublicKey(publicKey: Buffer): K256Jwk;
}
export interface K256JwkJson extends JwkJson {
    kty: JwaKeyType.EC;
    crv: JwaCurve.Secp256k1;
    x: string;
    y: string;
    use?: 'sig' | 'enc';
}
export declare function isValidK256JwkPublicKey(jwk: JwkJson): jwk is K256JwkJson;
