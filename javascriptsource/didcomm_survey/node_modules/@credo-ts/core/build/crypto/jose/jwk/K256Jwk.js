"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidK256JwkPublicKey = exports.K256Jwk = void 0;
const utils_1 = require("../../../utils");
const KeyType_1 = require("../../KeyType");
const jwa_1 = require("../jwa");
const alg_1 = require("../jwa/alg");
const Jwk_1 = require("./Jwk");
const ecCompression_1 = require("./ecCompression");
const validate_1 = require("./validate");
class K256Jwk extends Jwk_1.Jwk {
    constructor({ x, y }) {
        super();
        this.x = x;
        this.y = y;
    }
    get kty() {
        return jwa_1.JwaKeyType.EC;
    }
    get crv() {
        return jwa_1.JwaCurve.Secp256k1;
    }
    /**
     * Returns the public key of the K-256 JWK.
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
        return K256Jwk.keyType;
    }
    get supportedEncryptionAlgorithms() {
        return K256Jwk.supportedEncryptionAlgorithms;
    }
    get supportedSignatureAlgorithms() {
        return K256Jwk.supportedSignatureAlgorithms;
    }
    toJson() {
        return Object.assign(Object.assign({}, super.toJson()), { crv: this.crv, x: this.x, y: this.y });
    }
    static fromJson(jwkJson) {
        if (!isValidK256JwkPublicKey(jwkJson)) {
            throw new Error("Invalid 'K-256' JWK.");
        }
        return new K256Jwk({
            x: jwkJson.x,
            y: jwkJson.y,
        });
    }
    static fromPublicKey(publicKey) {
        const expanded = (0, ecCompression_1.expand)(publicKey, jwa_1.JwaCurve.Secp256k1);
        const x = expanded.slice(0, expanded.length / 2);
        const y = expanded.slice(expanded.length / 2);
        return new K256Jwk({
            x: utils_1.TypedArrayEncoder.toBase64URL(x),
            y: utils_1.TypedArrayEncoder.toBase64URL(y),
        });
    }
}
exports.K256Jwk = K256Jwk;
K256Jwk.supportedEncryptionAlgorithms = [];
K256Jwk.supportedSignatureAlgorithms = [alg_1.JwaSignatureAlgorithm.ES256K];
K256Jwk.keyType = KeyType_1.KeyType.K256;
function isValidK256JwkPublicKey(jwk) {
    return ((0, validate_1.hasKty)(jwk, jwa_1.JwaKeyType.EC) &&
        (0, validate_1.hasCrv)(jwk, jwa_1.JwaCurve.Secp256k1) &&
        (0, validate_1.hasX)(jwk) &&
        (0, validate_1.hasY)(jwk) &&
        (0, validate_1.hasValidUse)(jwk, {
            supportsEncrypting: true,
            supportsSigning: true,
        }));
}
exports.isValidK256JwkPublicKey = isValidK256JwkPublicKey;
//# sourceMappingURL=K256Jwk.js.map