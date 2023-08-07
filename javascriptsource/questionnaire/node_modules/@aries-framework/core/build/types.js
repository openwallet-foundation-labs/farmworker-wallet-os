"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DidCommMimeType = exports.KeyDerivationMethod = void 0;
var KeyDerivationMethod;
(function (KeyDerivationMethod) {
    /** default value in indy-sdk. Will be used when no value is provided */
    KeyDerivationMethod["Argon2IMod"] = "ARGON2I_MOD";
    /** less secure, but faster */
    KeyDerivationMethod["Argon2IInt"] = "ARGON2I_INT";
    /** raw wallet master key */
    KeyDerivationMethod["Raw"] = "RAW";
})(KeyDerivationMethod = exports.KeyDerivationMethod || (exports.KeyDerivationMethod = {}));
var DidCommMimeType;
(function (DidCommMimeType) {
    DidCommMimeType["V0"] = "application/ssi-agent-wire";
    DidCommMimeType["V1"] = "application/didcomm-envelope-enc";
})(DidCommMimeType = exports.DidCommMimeType || (exports.DidCommMimeType = {}));
//# sourceMappingURL=types.js.map