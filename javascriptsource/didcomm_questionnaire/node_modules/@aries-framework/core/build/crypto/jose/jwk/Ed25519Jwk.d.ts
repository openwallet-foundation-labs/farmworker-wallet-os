import type { JwkJson } from './Jwk';
import type { Buffer } from '../../../utils';
import type { JwaEncryptionAlgorithm } from '../jwa/alg';
import { KeyType } from '../../KeyType';
import { JwaCurve, JwaKeyType } from '../jwa';
import { JwaSignatureAlgorithm } from '../jwa/alg';
import { Jwk } from './Jwk';
export declare class Ed25519Jwk extends Jwk {
    static readonly supportedEncryptionAlgorithms: JwaEncryptionAlgorithm[];
    static readonly supportedSignatureAlgorithms: JwaSignatureAlgorithm[];
    static readonly keyType = KeyType.Ed25519;
    readonly x: string;
    constructor({ x }: {
        x: string;
    });
    get kty(): JwaKeyType.OKP;
    get crv(): JwaCurve.Ed25519;
    get publicKey(): Buffer;
    get keyType(): KeyType;
    get supportedEncryptionAlgorithms(): JwaEncryptionAlgorithm[];
    get supportedSignatureAlgorithms(): JwaSignatureAlgorithm[];
    toJson(): Ed25519JwkJson;
    static fromJson(jwkJson: JwkJson): Ed25519Jwk;
    static fromPublicKey(publicKey: Buffer): Ed25519Jwk;
}
export interface Ed25519JwkJson extends JwkJson {
    kty: JwaKeyType.OKP;
    crv: JwaCurve.Ed25519;
    x: string;
    use?: 'sig';
}
