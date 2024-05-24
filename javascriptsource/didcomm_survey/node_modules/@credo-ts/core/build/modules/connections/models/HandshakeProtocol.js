"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandshakeProtocol = void 0;
/**
 * Enum values should be sorted based on order of preference. Values will be
 * included in this order when creating out of band invitations.
 */
var HandshakeProtocol;
(function (HandshakeProtocol) {
    HandshakeProtocol["DidExchange"] = "https://didcomm.org/didexchange/1.x";
    HandshakeProtocol["Connections"] = "https://didcomm.org/connections/1.x";
})(HandshakeProtocol = exports.HandshakeProtocol || (exports.HandshakeProtocol = {}));
//# sourceMappingURL=HandshakeProtocol.js.map