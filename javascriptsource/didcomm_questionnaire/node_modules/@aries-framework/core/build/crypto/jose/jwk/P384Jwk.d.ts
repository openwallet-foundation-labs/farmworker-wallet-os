import type { JwkJson } from './Jwk';
import type { JwaEncryptionAlgorithm } from '../jwa/alg';
import { Buffer } from '../../../utils';
import { KeyType } from '../../KeyType';
import { JwaCurve, JwaKeyType } from '../jwa';
import { JwaSignatureAlgorithm } from '../jwa/alg';
import { Jwk } from './Jwk';
export declare class P384Jwk extends Jwk {
    static readonly supportedEncryptionAlgorithms: JwaEncryptionAlgorithm[];
    static readonly supportedSignatureAlgorithms: JwaSignatureAlgorithm[];
    static readonly keyType = KeyType.P384;
    readonly x: string;
    readonly y: string;
    constructor({ x, y }: {
        x: string;
        y: string;
    });
    get kty(): JwaKeyType.EC;
    get crv(): JwaCurve.P384;
    get keyType(): KeyType;
    get supportedEncryptionAlgorithms(): JwaEncryptionAlgorithm[];
    get supportedSignatureAlgorithms(): JwaSignatureAlgorithm[];
    /**
     * Returns the public key of the P-384 JWK.
     *
     * NOTE: this is the compressed variant. We still need to add support for the
     * uncompressed variant.
     */
    get publicKey(): Buffer;
    toJson(): P384JwkJson;
    static fromJson(jwk: JwkJson): P384Jwk;
    static fromPublicKey(publicKey: Buffer): P384Jwk;
}
export interface P384JwkJson extends JwkJson {
    kty: JwaKeyType.EC;
    crv: JwaCurve.P384;
    x: string;
    y: string;
    use?: 'sig' | 'enc';
}
export declare function isValidP384JwkPublicKey(jwk: JwkJson): jwk is P384JwkJson;
