"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Jwk = void 0;
const Key_1 = require("../../Key");
class Jwk {
    toJson() {
        return { use: this.use, kty: this.kty };
    }
    get key() {
        return new Key_1.Key(this.publicKey, this.keyType);
    }
    supportsSignatureAlgorithm(algorithm) {
        return this.supportedSignatureAlgorithms.includes(algorithm);
    }
    supportsEncryptionAlgorithm(algorithm) {
        return this.supportedEncryptionAlgorithms.includes(algorithm);
    }
}
exports.Jwk = Jwk;
//# sourceMappingURL=Jwk.js.map