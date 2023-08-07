"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReferencedAuthentication = exports.EmbeddedAuthentication = exports.Authentication = exports.AuthenticationTransformer = exports.authenticationTypes = void 0;
const class_transformer_1 = require("class-transformer");
const error_1 = require("../../../../../error");
const publicKey_1 = require("../publicKey");
const Authentication_1 = require("./Authentication");
Object.defineProperty(exports, "Authentication", { enumerable: true, get: function () { return Authentication_1.Authentication; } });
const EmbeddedAuthentication_1 = require("./EmbeddedAuthentication");
Object.defineProperty(exports, "EmbeddedAuthentication", { enumerable: true, get: function () { return EmbeddedAuthentication_1.EmbeddedAuthentication; } });
const ReferencedAuthentication_1 = require("./ReferencedAuthentication");
Object.defineProperty(exports, "ReferencedAuthentication", { enumerable: true, get: function () { return ReferencedAuthentication_1.ReferencedAuthentication; } });
exports.authenticationTypes = {
    RsaVerificationKey2018: 'RsaSignatureAuthentication2018',
    Ed25519VerificationKey2018: 'Ed25519SignatureAuthentication2018',
    Secp256k1VerificationKey2018: 'Secp256k1SignatureAuthenticationKey2018',
};
/**
 * Decorator that transforms authentication json to corresponding class instances. See {@link authenticationTypes}
 *
 * @example
 * class Example {
 *   AuthenticationTransformer()
 *   private authentication: Authentication
 * }
 */
function AuthenticationTransformer() {
    return (0, class_transformer_1.Transform)(({ value, obj, type, }) => {
        // TODO: PLAIN_TO_PLAIN
        if (type === class_transformer_1.TransformationType.PLAIN_TO_CLASS) {
            return value.map((auth) => {
                var _a, _b;
                // referenced public key
                if (auth.publicKey) {
                    //referenced
                    const publicKeyJson = obj.publicKey.find((publicKey) => publicKey.id === auth.publicKey);
                    if (!publicKeyJson) {
                        throw new error_1.AriesFrameworkError(`Invalid public key referenced ${auth.publicKey}`);
                    }
                    // Referenced keys use other types than embedded keys.
                    const publicKeyClass = ((_a = publicKey_1.publicKeyTypes[publicKeyJson.type]) !== null && _a !== void 0 ? _a : publicKey_1.PublicKey);
                    const publicKey = (0, class_transformer_1.plainToInstance)(publicKeyClass, publicKeyJson);
                    return new ReferencedAuthentication_1.ReferencedAuthentication(publicKey, auth.type);
                }
                else {
                    // embedded
                    const publicKeyClass = ((_b = publicKey_1.publicKeyTypes[auth.type]) !== null && _b !== void 0 ? _b : publicKey_1.PublicKey);
                    const publicKey = (0, class_transformer_1.plainToInstance)(publicKeyClass, auth);
                    return new EmbeddedAuthentication_1.EmbeddedAuthentication(publicKey);
                }
            });
        }
        else {
            return value.map((auth) => (auth instanceof EmbeddedAuthentication_1.EmbeddedAuthentication ? (0, class_transformer_1.instanceToPlain)(auth.publicKey) : auth));
        }
    });
}
exports.AuthenticationTransformer = AuthenticationTransformer;
//# sourceMappingURL=index.js.map