"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidP384JwkPublicKey = exports.P384Jwk = void 0;
const utils_1 = require("../../../utils");
const KeyType_1 = require("../../KeyType");
const jwa_1 = require("../jwa");
const alg_1 = require("../jwa/alg");
const Jwk_1 = require("./Jwk");
const ecCompression_1 = require("./ecCompression");
const validate_1 = require("./validate");
class P384Jwk extends Jwk_1.Jwk {
    constructor({ x, y }) {
        super();
        this.x = x;
        this.y = y;
    }
    get kty() {
        return jwa_1.JwaKeyType.EC;
    }
    get crv() {
        return jwa_1.JwaCurve.P384;
    }
    get keyType() {
        return P384Jwk.keyType;
    }
    get supportedEncryptionAlgorithms() {
        return P384Jwk.supportedEncryptionAlgorithms;
    }
    get supportedSignatureAlgorithms() {
        return P384Jwk.supportedSignatureAlgorithms;
    }
    /**
     * Returns the public key of the P-384 JWK.
     *
     * NOTE: this is the compressed variant. We still need to add support for the
     * uncompressed variant.
     */
    get publicKey() {
        const publicKeyBuffer = utils_1.Buffer.concat([utils_1.TypedArrayEncoder.fromBase64(this.x), utils_1.TypedArrayEncoder.fromBase64(this.y)]);
        const compressedPublicKey = (0, ecCompression_1.compress)(publicKeyBuffer);
        return utils_1.Buffer.from(compressedPublicKey);
    }
    toJson() {
        return Object.assign(Object.assign({}, super.toJson()), { crv: this.crv, x: this.x, y: this.y });
    }
    static fromJson(jwk) {
        if (!isValidP384JwkPublicKey(jwk)) {
            throw new Error("Invalid 'P-384' JWK.");
        }
        return new P384Jwk({
            x: jwk.x,
            y: jwk.y,
        });
    }
    static fromPublicKey(publicKey) {
        const expanded = (0, ecCompression_1.expand)(publicKey, jwa_1.JwaCurve.P384);
        const x = expanded.slice(0, expanded.length / 2);
        const y = expanded.slice(expanded.length / 2);
        return new P384Jwk({
            x: utils_1.TypedArrayEncoder.toBase64URL(x),
            y: utils_1.TypedArrayEncoder.toBase64URL(y),
        });
    }
}
exports.P384Jwk = P384Jwk;
P384Jwk.supportedEncryptionAlgorithms = [];
P384Jwk.supportedSignatureAlgorithms = [alg_1.JwaSignatureAlgorithm.ES384];
P384Jwk.keyType = KeyType_1.KeyType.P384;
function isValidP384JwkPublicKey(jwk) {
    return ((0, validate_1.hasKty)(jwk, jwa_1.JwaKeyType.EC) &&
        (0, validate_1.hasCrv)(jwk, jwa_1.JwaCurve.P384) &&
        (0, validate_1.hasX)(jwk) &&
        (0, validate_1.hasY)(jwk) &&
        (0, validate_1.hasValidUse)(jwk, {
            supportsEncrypting: true,
            supportsSigning: true,
        }));
}
exports.isValidP384JwkPublicKey = isValidP384JwkPublicKey;
//# sourceMappingURL=P384Jwk.js.map