"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.X25519Jwk = void 0;
const utils_1 = require("../../../utils");
const KeyType_1 = require("../../KeyType");
const jwa_1 = require("../jwa");
const Jwk_1 = require("./Jwk");
const validate_1 = require("./validate");
class X25519Jwk extends Jwk_1.Jwk {
    constructor({ x }) {
        super();
        this.x = x;
    }
    get kty() {
        return jwa_1.JwaKeyType.OKP;
    }
    get crv() {
        return jwa_1.JwaCurve.X25519;
    }
    get keyType() {
        return X25519Jwk.keyType;
    }
    get supportedEncryptionAlgorithms() {
        return X25519Jwk.supportedEncryptionAlgorithms;
    }
    get supportedSignatureAlgorithms() {
        return X25519Jwk.supportedSignatureAlgorithms;
    }
    get publicKey() {
        return utils_1.TypedArrayEncoder.fromBase64(this.x);
    }
    toJson() {
        return Object.assign(Object.assign({}, super.toJson()), { crv: this.crv, x: this.x });
    }
    static fromJson(jwk) {
        if (!isValidX25519JwkPublicKey(jwk)) {
            throw new Error("Invalid 'X25519' JWK.");
        }
        return new X25519Jwk({
            x: jwk.x,
        });
    }
    static fromPublicKey(publicKey) {
        return new X25519Jwk({
            x: utils_1.TypedArrayEncoder.toBase64URL(publicKey),
        });
    }
}
exports.X25519Jwk = X25519Jwk;
X25519Jwk.supportedEncryptionAlgorithms = [
    jwa_1.JwaEncryptionAlgorithm.ECDHESA128KW,
    jwa_1.JwaEncryptionAlgorithm.ECDHESA192KW,
    jwa_1.JwaEncryptionAlgorithm.ECDHESA256KW,
    jwa_1.JwaEncryptionAlgorithm.ECDHES,
];
X25519Jwk.supportedSignatureAlgorithms = [];
X25519Jwk.keyType = KeyType_1.KeyType.X25519;
function isValidX25519JwkPublicKey(jwk) {
    return ((0, validate_1.hasKty)(jwk, jwa_1.JwaKeyType.OKP) &&
        (0, validate_1.hasCrv)(jwk, jwa_1.JwaCurve.X25519) &&
        (0, validate_1.hasX)(jwk) &&
        (0, validate_1.hasValidUse)(jwk, {
            supportsEncrypting: true,
            supportsSigning: false,
        }));
}
//# sourceMappingURL=X25519Jwk.js.map