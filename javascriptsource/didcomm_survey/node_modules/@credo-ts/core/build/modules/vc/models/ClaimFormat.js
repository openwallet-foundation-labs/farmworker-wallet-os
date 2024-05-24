"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClaimFormat = void 0;
/**
 * Defines the claim format based on the formats registered in
 * [DIF Claim Format Registry](https://identity.foundation/claim-format-registry/).
 */
var ClaimFormat;
(function (ClaimFormat) {
    ClaimFormat["Jwt"] = "jwt";
    ClaimFormat["JwtVc"] = "jwt_vc";
    ClaimFormat["JwtVp"] = "jwt_vp";
    ClaimFormat["Ldp"] = "ldp";
    ClaimFormat["LdpVc"] = "ldp_vc";
    ClaimFormat["LdpVp"] = "ldp_vp";
    ClaimFormat["Di"] = "di";
    ClaimFormat["DiVc"] = "di_vc";
    ClaimFormat["DiVp"] = "di_vp";
    ClaimFormat["SdJwtVc"] = "vc+sd-jwt";
})(ClaimFormat = exports.ClaimFormat || (exports.ClaimFormat = {}));
//# sourceMappingURL=ClaimFormat.js.map