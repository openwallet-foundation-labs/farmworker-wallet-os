import type { JwkJson } from './Jwk';
import type { Buffer } from '../../../utils';
import type { JwaSignatureAlgorithm } from '../jwa';
import { KeyType } from '../../KeyType';
import { JwaCurve, JwaKeyType, JwaEncryptionAlgorithm } from '../jwa';
import { Jwk } from './Jwk';
export declare class X25519Jwk extends Jwk {
    static readonly supportedEncryptionAlgorithms: JwaEncryptionAlgorithm[];
    static readonly supportedSignatureAlgorithms: JwaSignatureAlgorithm[];
    static readonly keyType = KeyType.X25519;
    readonly x: string;
    constructor({ x }: {
        x: string;
    });
    get kty(): JwaKeyType.OKP;
    get crv(): JwaCurve.X25519;
    get keyType(): KeyType;
    get supportedEncryptionAlgorithms(): JwaEncryptionAlgorithm[];
    get supportedSignatureAlgorithms(): JwaSignatureAlgorithm[];
    get publicKey(): Buffer;
    toJson(): X25519JwkJson;
    static fromJson(jwk: JwkJson): X25519Jwk;
    static fromPublicKey(publicKey: Buffer): X25519Jwk;
}
export interface X25519JwkJson extends JwkJson {
    kty: JwaKeyType.OKP;
    crv: JwaCurve.X25519;
    x: string;
    use?: 'enc';
}
