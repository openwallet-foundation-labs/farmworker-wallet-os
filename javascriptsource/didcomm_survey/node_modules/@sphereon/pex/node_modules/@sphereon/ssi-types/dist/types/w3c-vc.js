"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isWrappedW3CVerifiablePresentation = exports.isWrappedW3CVerifiableCredential = exports.StatusListDriverType = exports.StatusListCredentialIdMode = exports.StatusListType = exports.JWT_PROOF_TYPE_2020 = void 0;
exports.JWT_PROOF_TYPE_2020 = 'JwtProof2020';
var StatusListType;
(function (StatusListType) {
    StatusListType["StatusList2021"] = "StatusList2021";
})(StatusListType || (exports.StatusListType = StatusListType = {}));
var StatusListCredentialIdMode;
(function (StatusListCredentialIdMode) {
    StatusListCredentialIdMode["ISSUANCE"] = "ISSUANCE";
    StatusListCredentialIdMode["PERSISTENCE"] = "PERSISTENCE";
    StatusListCredentialIdMode["NEVER"] = "NEVER";
})(StatusListCredentialIdMode || (exports.StatusListCredentialIdMode = StatusListCredentialIdMode = {}));
var StatusListDriverType;
(function (StatusListDriverType) {
    StatusListDriverType["AGENT_TYPEORM"] = "agent_typeorm";
    StatusListDriverType["AGENT_KV_STORE"] = "agent_kv_store";
    StatusListDriverType["GITHUB"] = "github";
    StatusListDriverType["AGENT_FILESYSTEM"] = "agent_filesystem";
})(StatusListDriverType || (exports.StatusListDriverType = StatusListDriverType = {}));
function isWrappedW3CVerifiableCredential(vc) {
    return vc.format === 'jwt_vc' || vc.format === 'ldp_vc';
}
exports.isWrappedW3CVerifiableCredential = isWrappedW3CVerifiableCredential;
function isWrappedW3CVerifiablePresentation(vp) {
    return vp.format === 'jwt_vp' || vp.format === 'ldp_vp';
}
exports.isWrappedW3CVerifiablePresentation = isWrappedW3CVerifiablePresentation;
//# sourceMappingURL=w3c-vc.js.map