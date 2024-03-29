"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Key = void 0;
const utils_1 = require("../utils");
const keyUtils_1 = require("./keyUtils");
const multiCodecKey_1 = require("./multiCodecKey");
class Key {
    constructor(publicKey, keyType) {
        this.publicKey = utils_1.Buffer.from(publicKey);
        this.keyType = keyType;
    }
    static fromPublicKey(publicKey, keyType) {
        return new Key(utils_1.Buffer.from(publicKey), keyType);
    }
    static fromPublicKeyBase58(publicKey, keyType) {
        const publicKeyBytes = utils_1.TypedArrayEncoder.fromBase58(publicKey);
        return Key.fromPublicKey(publicKeyBytes, keyType);
    }
    static fromFingerprint(fingerprint) {
        const { data } = utils_1.MultiBaseEncoder.decode(fingerprint);
        const [code, byteLength] = utils_1.VarintEncoder.decode(data);
        const publicKey = utils_1.Buffer.from(data.slice(byteLength));
        const keyType = (0, multiCodecKey_1.getKeyTypeByMultiCodecPrefix)(code);
        return new Key(publicKey, keyType);
    }
    get prefixedPublicKey() {
        const multiCodecPrefix = (0, multiCodecKey_1.getMultiCodecPrefixByKeyType)(this.keyType);
        // Create Buffer with length of the prefix bytes, then use varint to fill the prefix bytes
        const prefixBytes = utils_1.VarintEncoder.encode(multiCodecPrefix);
        // Combine prefix with public key
        return utils_1.Buffer.concat([prefixBytes, this.publicKey]);
    }
    get fingerprint() {
        return `z${utils_1.TypedArrayEncoder.toBase58(this.prefixedPublicKey)}`;
    }
    get publicKeyBase58() {
        return utils_1.TypedArrayEncoder.toBase58(this.publicKey);
    }
    get supportsEncrypting() {
        return (0, keyUtils_1.isEncryptionSupportedForKeyType)(this.keyType);
    }
    get supportsSigning() {
        return (0, keyUtils_1.isSigningSupportedForKeyType)(this.keyType);
    }
}
exports.Key = Key;
//# sourceMappingURL=Key.js.map