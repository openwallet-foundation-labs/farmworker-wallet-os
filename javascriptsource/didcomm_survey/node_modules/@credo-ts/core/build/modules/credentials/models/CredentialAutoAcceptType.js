"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutoAcceptCredential = void 0;
/**
 * Typing of the state for auto acceptance
 */
var AutoAcceptCredential;
(function (AutoAcceptCredential) {
    /** Always auto accepts the credential no matter if it changed in subsequent steps */
    AutoAcceptCredential["Always"] = "always";
    /** Needs one acceptation and the rest will be automated if nothing changes */
    AutoAcceptCredential["ContentApproved"] = "contentApproved";
    /** Never auto accept a credential */
    AutoAcceptCredential["Never"] = "never";
})(AutoAcceptCredential = exports.AutoAcceptCredential || (exports.AutoAcceptCredential = {}));
//# sourceMappingURL=CredentialAutoAcceptType.js.map