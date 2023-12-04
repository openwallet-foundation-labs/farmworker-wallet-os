"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidP256JwkPublicKey = exports.P256Jwk = void 0;
const utils_1 = require("../../../utils");
const KeyType_1 = require("../../KeyType");
const jwa_1 = require("../jwa");
const alg_1 = require("../jwa/alg");
const Jwk_1 = require("./Jwk");
const ecCompression_1 = require("./ecCompression");
const validate_1 = require("./validate");
class P256Jwk extends Jwk_1.Jwk {
    constructor({ x, y }) {
        super();
        this.x = x;
        this.y = y;
    }
    get kty() {
        return jwa_1.JwaKeyType.EC;
    }
    get crv() {
        return jwa_1.JwaCurve.P256;
    }
    /**
     * Returns the public key of the P-256 JWK.
     *
     * NOTE: this is the compressed variant. We still need to add support for the
     * uncompressed variant.
     */
    get publicKey() {
        const publicKeyBuffer = utils_1.Buffer.concat([utils_1.TypedArrayEncoder.fromBase64(this.x), utils_1.TypedArrayEncoder.fromBase64(this.y)]);
        const compressedPublicKey = (0, ecCompression_1.compress)(publicKeyBuffer);
        return utils_1.Buffer.from(compressedPublicKey);
    }
    get keyType() {
        return P256Jwk.keyType;
    }
    get supportedEncryptionAlgorithms() {
        return P256Jwk.supportedEncryptionAlgorithms;
    }
    get supportedSignatureAlgorithms() {
        return P256Jwk.supportedSignatureAlgorithms;
    }
    toJson() {
        return Object.assign(Object.assign({}, super.toJson()), { crv: this.crv, x: this.x, y: this.y });
    }
    static fromJson(jwkJson) {
        if (!isValidP256JwkPublicKey(jwkJson)) {
            throw new Error("Invalid 'P-256' JWK.");
        }
        return new P256Jwk({
            x: jwkJson.x,
            y: jwkJson.y,
        });
    }
    static fromPublicKey(publicKey) {
        const expanded = (0, ecCompression_1.expand)(publicKey, jwa_1.JwaCurve.P256);
        const x = expanded.slice(0, expanded.length / 2);
        const y = expanded.slice(expanded.length / 2);
        return new P256Jwk({
            x: utils_1.TypedArrayEncoder.toBase64URL(x),
            y: utils_1.TypedArrayEncoder.toBase64URL(y),
        });
    }
}
exports.P256Jwk = P256Jwk;
P256Jwk.supportedEncryptionAlgorithms = [];
P256Jwk.supportedSignatureAlgorithms = [alg_1.JwaSignatureAlgorithm.ES256];
P256Jwk.keyType = KeyType_1.KeyType.P256;
function isValidP256JwkPublicKey(jwk) {
    return ((0, validate_1.hasKty)(jwk, jwa_1.JwaKeyType.EC) &&
        (0, validate_1.hasCrv)(jwk, jwa_1.JwaCurve.P256) &&
        (0, validate_1.hasX)(jwk) &&
        (0, validate_1.hasY)(jwk) &&
        (0, validate_1.hasValidUse)(jwk, {
            supportsEncrypting: true,
            supportsSigning: true,
        }));
}
exports.isValidP256JwkPublicKey = isValidP256JwkPublicKey;
//# sourceMappingURL=P256Jwk.js.map