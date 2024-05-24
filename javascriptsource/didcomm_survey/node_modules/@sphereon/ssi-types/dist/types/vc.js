"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentFormat = exports.OriginalType = void 0;
var OriginalType;
(function (OriginalType) {
    // W3C
    OriginalType["JSONLD"] = "json-ld";
    OriginalType["JWT_ENCODED"] = "jwt-encoded";
    OriginalType["JWT_DECODED"] = "jwt-decoded";
    // SD-JWT
    OriginalType["SD_JWT_VC_ENCODED"] = "sd-jwt-vc-encoded";
    OriginalType["SD_JWT_VC_DECODED"] = "sd-jwt-vc-decoded";
})(OriginalType || (exports.OriginalType = OriginalType = {}));
var DocumentFormat;
(function (DocumentFormat) {
    // W3C
    DocumentFormat[DocumentFormat["JWT"] = 0] = "JWT";
    DocumentFormat[DocumentFormat["JSONLD"] = 1] = "JSONLD";
    // SD-JWT
    DocumentFormat[DocumentFormat["SD_JWT_VC"] = 2] = "SD_JWT_VC";
    // Remaining
    DocumentFormat[DocumentFormat["EIP712"] = 3] = "EIP712";
})(DocumentFormat || (exports.DocumentFormat = DocumentFormat = {}));
//# sourceMappingURL=vc.js.map