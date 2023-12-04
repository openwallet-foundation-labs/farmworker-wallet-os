"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProofState = void 0;
/**
 * Present Proof protocol states as defined in RFC 0037
 *
 * @see https://github.com/hyperledger/aries-rfcs/tree/master/features/0037-present-proof#states
 */
var ProofState;
(function (ProofState) {
    ProofState["ProposalSent"] = "proposal-sent";
    ProofState["ProposalReceived"] = "proposal-received";
    ProofState["RequestSent"] = "request-sent";
    ProofState["RequestReceived"] = "request-received";
    ProofState["PresentationSent"] = "presentation-sent";
    ProofState["PresentationReceived"] = "presentation-received";
    ProofState["Declined"] = "declined";
    ProofState["Abandoned"] = "abandoned";
    ProofState["Done"] = "done";
})(ProofState = exports.ProofState || (exports.ProofState = {}));
//# sourceMappingURL=ProofState.js.map