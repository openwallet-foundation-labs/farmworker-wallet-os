"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsStringOrVerificationMethod = exports.VerificationMethodTransformer = exports.VerificationMethod = void 0;
var VerificationMethod_1 = require("./VerificationMethod");
Object.defineProperty(exports, "VerificationMethod", { enumerable: true, get: function () { return VerificationMethod_1.VerificationMethod; } });
var VerificationMethodTransformer_1 = require("./VerificationMethodTransformer");
Object.defineProperty(exports, "VerificationMethodTransformer", { enumerable: true, get: function () { return VerificationMethodTransformer_1.VerificationMethodTransformer; } });
Object.defineProperty(exports, "IsStringOrVerificationMethod", { enumerable: true, get: function () { return VerificationMethodTransformer_1.IsStringOrVerificationMethod; } });
__exportStar(require("./Bls12381G1Key2020"), exports);
__exportStar(require("./Bls12381G2Key2020"), exports);
__exportStar(require("./Ed25519VerificationKey2018"), exports);
__exportStar(require("./Ed25519VerificationKey2020"), exports);
__exportStar(require("./JsonWebKey2020"), exports);
__exportStar(require("./X25519KeyAgreementKey2019"), exports);
__exportStar(require("./Multikey"), exports);
__exportStar(require("./EcdsaSecp256k1VerificationKey2019"), exports);
//# sourceMappingURL=index.js.map