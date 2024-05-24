"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ed25519Jwk = void 0;
const utils_1 = require("../../../utils");
const KeyType_1 = require("../../KeyType");
const jwa_1 = require("../jwa");
const alg_1 = require("../jwa/alg");
const Jwk_1 = require("./Jwk");
const validate_1 = require("./validate");
class Ed25519Jwk extends Jwk_1.Jwk {
    constructor({ x }) {
        super();
        this.x = x;
    }
    get kty() {
        return jwa_1.JwaKeyType.OKP;
    }
    get crv() {
        return jwa_1.JwaCurve.Ed25519;
    }
    get publicKey() {
        return utils_1.TypedArrayEncoder.fromBase64(this.x);
    }
    get keyType() {
        return Ed25519Jwk.keyType;
    }
    get supportedEncryptionAlgorithms() {
        return Ed25519Jwk.supportedEncryptionAlgorithms;
    }
    get supportedSignatureAlgorithms() {
        return Ed25519Jwk.supportedSignatureAlgorithms;
    }
    toJson() {
        return Object.assign(Object.assign({}, super.toJson()), { crv: this.crv, x: this.x });
    }
    static fromJson(jwkJson) {
        if (!isValidEd25519JwkPublicKey(jwkJson)) {
            throw new Error("Invalid 'Ed25519' JWK.");
        }
        return new Ed25519Jwk({
            x: jwkJson.x,
        });
    }
    static fromPublicKey(publicKey) {
        return new Ed25519Jwk({
            x: utils_1.TypedArrayEncoder.toBase64URL(publicKey),
        });
    }
}
exports.Ed25519Jwk = Ed25519Jwk;
Ed25519Jwk.supportedEncryptionAlgorithms = [];
Ed25519Jwk.supportedSignatureAlgorithms = [alg_1.JwaSignatureAlgorithm.EdDSA];
Ed25519Jwk.keyType = KeyType_1.KeyType.Ed25519;
function isValidEd25519JwkPublicKey(jwk) {
    return ((0, validate_1.hasKty)(jwk, jwa_1.JwaKeyType.OKP) &&
        (0, validate_1.hasCrv)(jwk, jwa_1.JwaCurve.Ed25519) &&
        (0, validate_1.hasX)(jwk) &&
        (0, validate_1.hasValidUse)(jwk, {
            supportsEncrypting: false,
            supportsSigning: true,
        }));
}
//# sourceMappingURL=Ed25519Jwk.js.map