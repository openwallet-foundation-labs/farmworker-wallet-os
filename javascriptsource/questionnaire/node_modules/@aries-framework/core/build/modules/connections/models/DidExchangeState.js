"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DidExchangeState = void 0;
/**
 * Connection states as defined in RFC 0023.
 *
 * @see https://github.com/hyperledger/aries-rfcs/blob/main/features/0023-did-exchange/README.md#state-machine-tables
 */
var DidExchangeState;
(function (DidExchangeState) {
    DidExchangeState["Start"] = "start";
    DidExchangeState["InvitationSent"] = "invitation-sent";
    DidExchangeState["InvitationReceived"] = "invitation-received";
    DidExchangeState["RequestSent"] = "request-sent";
    DidExchangeState["RequestReceived"] = "request-received";
    DidExchangeState["ResponseSent"] = "response-sent";
    DidExchangeState["ResponseReceived"] = "response-received";
    DidExchangeState["Abandoned"] = "abandoned";
    DidExchangeState["Completed"] = "completed";
})(DidExchangeState = exports.DidExchangeState || (exports.DidExchangeState = {}));
//# sourceMappingURL=DidExchangeState.js.map