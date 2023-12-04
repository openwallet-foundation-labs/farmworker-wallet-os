"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rfc0160StateFromDidExchangeState = exports.ConnectionState = void 0;
const DidExchangeState_1 = require("./DidExchangeState");
/**
 * Connection states as defined in RFC 0160.
 *
 * @see https://github.com/hyperledger/aries-rfcs/blob/master/features/0160-connection-protocol/README.md#states
 */
var ConnectionState;
(function (ConnectionState) {
    ConnectionState["Null"] = "null";
    ConnectionState["Invited"] = "invited";
    ConnectionState["Requested"] = "requested";
    ConnectionState["Responded"] = "responded";
    ConnectionState["Complete"] = "complete";
})(ConnectionState = exports.ConnectionState || (exports.ConnectionState = {}));
function rfc0160StateFromDidExchangeState(didExchangeState) {
    const stateMapping = {
        [DidExchangeState_1.DidExchangeState.Start]: ConnectionState.Null,
        [DidExchangeState_1.DidExchangeState.Abandoned]: ConnectionState.Null,
        [DidExchangeState_1.DidExchangeState.InvitationReceived]: ConnectionState.Invited,
        [DidExchangeState_1.DidExchangeState.InvitationSent]: ConnectionState.Invited,
        [DidExchangeState_1.DidExchangeState.RequestReceived]: ConnectionState.Requested,
        [DidExchangeState_1.DidExchangeState.RequestSent]: ConnectionState.Requested,
        [DidExchangeState_1.DidExchangeState.ResponseReceived]: ConnectionState.Responded,
        [DidExchangeState_1.DidExchangeState.ResponseSent]: ConnectionState.Responded,
        [DidExchangeState_1.DidExchangeState.Completed]: ConnectionState.Complete,
    };
    return stateMapping[didExchangeState];
}
exports.rfc0160StateFromDidExchangeState = rfc0160StateFromDidExchangeState;
//# sourceMappingURL=ConnectionState.js.map