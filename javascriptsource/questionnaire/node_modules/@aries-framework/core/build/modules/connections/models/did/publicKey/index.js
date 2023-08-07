"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RsaSig2018 = exports.EddsaSaSigSecp256k1 = exports.PublicKey = exports.Ed25119Sig2018 = exports.PublicKeyTransformer = exports.publicKeyTypes = void 0;
const class_transformer_1 = require("class-transformer");
const Ed25119Sig2018_1 = require("./Ed25119Sig2018");
Object.defineProperty(exports, "Ed25119Sig2018", { enumerable: true, get: function () { return Ed25119Sig2018_1.Ed25119Sig2018; } });
const EddsaSaSigSecp256k1_1 = require("./EddsaSaSigSecp256k1");
Object.defineProperty(exports, "EddsaSaSigSecp256k1", { enumerable: true, get: function () { return EddsaSaSigSecp256k1_1.EddsaSaSigSecp256k1; } });
const PublicKey_1 = require("./PublicKey");
Object.defineProperty(exports, "PublicKey", { enumerable: true, get: function () { return PublicKey_1.PublicKey; } });
const RsaSig2018_1 = require("./RsaSig2018");
Object.defineProperty(exports, "RsaSig2018", { enumerable: true, get: function () { return RsaSig2018_1.RsaSig2018; } });
exports.publicKeyTypes = {
    RsaVerificationKey2018: RsaSig2018_1.RsaSig2018,
    Ed25519VerificationKey2018: Ed25119Sig2018_1.Ed25119Sig2018,
    Secp256k1VerificationKey2018: EddsaSaSigSecp256k1_1.EddsaSaSigSecp256k1,
};
/**
 * Decorator that transforms public key json to corresonding class instances. See {@link publicKeyTypes}
 *
 * @example
 * class Example {
 *   ＠PublicKeyTransformer()
 *   private publicKey: PublicKey
 * }
 */
function PublicKeyTransformer() {
    return (0, class_transformer_1.Transform)(({ value }) => {
        return value.map((publicKeyJson) => {
            var _a;
            const publicKeyClass = ((_a = exports.publicKeyTypes[publicKeyJson.type]) !== null && _a !== void 0 ? _a : PublicKey_1.PublicKey);
            const publicKey = (0, class_transformer_1.plainToInstance)(publicKeyClass, publicKeyJson);
            return publicKey;
        });
    }, {
        toClassOnly: true,
    });
}
exports.PublicKeyTransformer = PublicKeyTransformer;
//# sourceMappingURL=index.js.map