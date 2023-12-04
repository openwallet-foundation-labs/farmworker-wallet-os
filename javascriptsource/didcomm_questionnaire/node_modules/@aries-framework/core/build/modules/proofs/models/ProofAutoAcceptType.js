"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutoAcceptProof = void 0;
/**
 * Typing of the state for auto acceptance
 */
var AutoAcceptProof;
(function (AutoAcceptProof) {
    // Always auto accepts the proof no matter if it changed in subsequent steps
    AutoAcceptProof["Always"] = "always";
    // Needs one acceptation and the rest will be automated if nothing changes
    AutoAcceptProof["ContentApproved"] = "contentApproved";
    // DEFAULT: Never auto accept a proof
    AutoAcceptProof["Never"] = "never";
})(AutoAcceptProof = exports.AutoAcceptProof || (exports.AutoAcceptProof = {}));
//# sourceMappingURL=ProofAutoAcceptType.js.map