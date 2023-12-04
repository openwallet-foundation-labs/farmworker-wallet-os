"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CredentialState = void 0;
/**
 * Issue Credential states as defined in RFC 0036 and RFC 0453
 *
 * @see https://github.com/hyperledger/aries-rfcs/blob/master/features/0036-issue-credential/README.md#states
 */
var CredentialState;
(function (CredentialState) {
    CredentialState["ProposalSent"] = "proposal-sent";
    CredentialState["ProposalReceived"] = "proposal-received";
    CredentialState["OfferSent"] = "offer-sent";
    CredentialState["OfferReceived"] = "offer-received";
    CredentialState["Declined"] = "declined";
    CredentialState["RequestSent"] = "request-sent";
    CredentialState["RequestReceived"] = "request-received";
    CredentialState["CredentialIssued"] = "credential-issued";
    CredentialState["CredentialReceived"] = "credential-received";
    CredentialState["Done"] = "done";
    CredentialState["Abandoned"] = "abandoned";
})(CredentialState = exports.CredentialState || (exports.CredentialState = {}));
//# sourceMappingURL=CredentialState.js.map