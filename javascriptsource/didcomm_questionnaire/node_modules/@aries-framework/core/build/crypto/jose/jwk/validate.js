"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasValidUse = exports.hasY = exports.hasX = exports.hasKty = exports.hasCrv = void 0;
function hasCrv(jwk, crv) {
    return 'crv' in jwk && jwk.crv === crv;
}
exports.hasCrv = hasCrv;
function hasKty(jwk, kty) {
    return 'kty' in jwk && jwk.kty === kty;
}
exports.hasKty = hasKty;
function hasX(jwk) {
    return 'x' in jwk && jwk.x !== undefined;
}
exports.hasX = hasX;
function hasY(jwk) {
    return 'y' in jwk && jwk.y !== undefined;
}
exports.hasY = hasY;
function hasValidUse(jwk, { supportsSigning, supportsEncrypting }) {
    return jwk.use === undefined || (supportsSigning && jwk.use === 'sig') || (supportsEncrypting && jwk.use === 'enc');
}
exports.hasValidUse = hasValidUse;
//# sourceMappingURL=validate.js.map