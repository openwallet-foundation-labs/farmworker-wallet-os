"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediationState = void 0;
/**
 * Mediation states based on the flow defined in RFC 0211.
 *
 * @see https://github.com/hyperledger/aries-rfcs/tree/master/features/0211-route-coordination/README.md
 */
var MediationState;
(function (MediationState) {
    MediationState["Requested"] = "requested";
    MediationState["Granted"] = "granted";
    MediationState["Denied"] = "denied";
})(MediationState = exports.MediationState || (exports.MediationState = {}));
//# sourceMappingURL=MediationState.js.map