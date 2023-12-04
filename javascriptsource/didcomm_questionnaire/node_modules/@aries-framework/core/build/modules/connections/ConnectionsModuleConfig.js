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
var _ConnectionsModuleConfig_autoAcceptConnections;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionsModuleConfig = void 0;
class ConnectionsModuleConfig {
    constructor(options) {
        _ConnectionsModuleConfig_autoAcceptConnections.set(this, void 0);
        this.options = options !== null && options !== void 0 ? options : {};
        __classPrivateFieldSet(this, _ConnectionsModuleConfig_autoAcceptConnections, this.options.autoAcceptConnections, "f");
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
}
exports.ConnectionsModuleConfig = ConnectionsModuleConfig;
_ConnectionsModuleConfig_autoAcceptConnections = new WeakMap();
//# sourceMappingURL=ConnectionsModuleConfig.js.map