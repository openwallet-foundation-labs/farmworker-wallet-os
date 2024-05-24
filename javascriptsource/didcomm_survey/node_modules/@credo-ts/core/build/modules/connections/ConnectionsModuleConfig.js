"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _ConnectionsModuleConfig_autoAcceptConnections, _ConnectionsModuleConfig_peerNumAlgoForDidExchangeRequests, _ConnectionsModuleConfig_peerNumAlgoForDidRotation;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionsModuleConfig = void 0;
const dids_1 = require("../dids");
class ConnectionsModuleConfig {
    constructor(options) {
        _ConnectionsModuleConfig_autoAcceptConnections.set(this, void 0);
        _ConnectionsModuleConfig_peerNumAlgoForDidExchangeRequests.set(this, void 0);
        _ConnectionsModuleConfig_peerNumAlgoForDidRotation.set(this, void 0);
        this.options = options !== null && options !== void 0 ? options : {};
        __classPrivateFieldSet(this, _ConnectionsModuleConfig_autoAcceptConnections, this.options.autoAcceptConnections, "f");
        __classPrivateFieldSet(this, _ConnectionsModuleConfig_peerNumAlgoForDidExchangeRequests, this.options.peerNumAlgoForDidExchangeRequests, "f");
        __classPrivateFieldSet(this, _ConnectionsModuleConfig_peerNumAlgoForDidRotation, this.options.peerNumAlgoForDidRotation, "f");
    }
    /** See {@link ConnectionsModuleConfigOptions.autoAcceptConnections} */
    get autoAcceptConnections() {
        var _a;
        return (_a = __classPrivateFieldGet(this, _ConnectionsModuleConfig_autoAcceptConnections, "f")) !== null && _a !== void 0 ? _a : false;
    }
    /** See {@link ConnectionsModuleConfigOptions.autoAcceptConnections} */
    set autoAcceptConnections(autoAcceptConnections) {
        __classPrivateFieldSet(this, _ConnectionsModuleConfig_autoAcceptConnections, autoAcceptConnections, "f");
    }
    /** See {@link ConnectionsModuleConfigOptions.peerNumAlgoForDidExchangeRequests} */
    get peerNumAlgoForDidExchangeRequests() {
        var _a;
        return (_a = __classPrivateFieldGet(this, _ConnectionsModuleConfig_peerNumAlgoForDidExchangeRequests, "f")) !== null && _a !== void 0 ? _a : dids_1.PeerDidNumAlgo.GenesisDoc;
    }
    /** See {@link ConnectionsModuleConfigOptions.peerNumAlgoForDidExchangeRequests} */
    set peerNumAlgoForDidExchangeRequests(peerNumAlgoForDidExchangeRequests) {
        __classPrivateFieldSet(this, _ConnectionsModuleConfig_peerNumAlgoForDidExchangeRequests, peerNumAlgoForDidExchangeRequests, "f");
    }
    /** See {@link ConnectionsModuleConfigOptions.peerNumAlgoForDidRotation} */
    get peerNumAlgoForDidRotation() {
        var _a;
        return (_a = __classPrivateFieldGet(this, _ConnectionsModuleConfig_peerNumAlgoForDidRotation, "f")) !== null && _a !== void 0 ? _a : dids_1.PeerDidNumAlgo.ShortFormAndLongForm;
    }
    /** See {@link ConnectionsModuleConfigOptions.peerNumAlgoForDidRotation} */
    set peerNumAlgoForDidRotation(peerNumAlgoForDidRotation) {
        __classPrivateFieldSet(this, _ConnectionsModuleConfig_peerNumAlgoForDidRotation, peerNumAlgoForDidRotation, "f");
    }
}
exports.ConnectionsModuleConfig = ConnectionsModuleConfig;
_ConnectionsModuleConfig_autoAcceptConnections = new WeakMap(), _ConnectionsModuleConfig_peerNumAlgoForDidExchangeRequests = new WeakMap(), _ConnectionsModuleConfig_peerNumAlgoForDidRotation = new WeakMap();
//# sourceMappingURL=ConnectionsModuleConfig.js.map