"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentConfig = void 0;
const constants_1 = require("../constants");
const logger_1 = require("../logger");
const types_1 = require("../types");
class AgentConfig {
    constructor(initConfig, agentDependencies) {
        var _a;
        this.initConfig = initConfig;
        this._endpoints = initConfig.endpoints;
        this.label = initConfig.label;
        this.logger = (_a = initConfig.logger) !== null && _a !== void 0 ? _a : new logger_1.ConsoleLogger(logger_1.LogLevel.off);
        this.agentDependencies = agentDependencies;
    }
    /**
     * @todo move to context configuration
     */
    get walletConfig() {
        return this.initConfig.walletConfig;
    }
    get didCommMimeType() {
        var _a;
        return (_a = this.initConfig.didCommMimeType) !== null && _a !== void 0 ? _a : types_1.DidCommMimeType.V1;
    }
    /**
     * Encode keys in did:key format instead of 'naked' keys, as stated in Aries RFC 0360.
     *
     * This setting will not be taken into account if the other party has previously used naked keys
     * in a given protocol (i.e. it does not support Aries RFC 0360).
     */
    get useDidKeyInProtocols() {
        var _a;
        return (_a = this.initConfig.useDidKeyInProtocols) !== null && _a !== void 0 ? _a : true;
    }
    get endpoints() {
        // if endpoints is not set, return queue endpoint
        // https://github.com/hyperledger/aries-rfcs/issues/405#issuecomment-582612875
        if (!this._endpoints || this._endpoints.length === 0) {
            return [constants_1.DID_COMM_TRANSPORT_QUEUE];
        }
        return this._endpoints;
    }
    set endpoints(endpoints) {
        this._endpoints = endpoints;
    }
    get useDidSovPrefixWhereAllowed() {
        var _a;
        return (_a = this.initConfig.useDidSovPrefixWhereAllowed) !== null && _a !== void 0 ? _a : false;
    }
    /**
     * @todo move to context configuration
     */
    get connectionImageUrl() {
        return this.initConfig.connectionImageUrl;
    }
    get autoUpdateStorageOnStartup() {
        var _a;
        return (_a = this.initConfig.autoUpdateStorageOnStartup) !== null && _a !== void 0 ? _a : false;
    }
    get backupBeforeStorageUpdate() {
        var _a;
        return (_a = this.initConfig.backupBeforeStorageUpdate) !== null && _a !== void 0 ? _a : true;
    }
    extend(config) {
        return new AgentConfig(Object.assign(Object.assign(Object.assign({}, this.initConfig), { logger: this.logger, label: this.label }), config), this.agentDependencies);
    }
    toJSON() {
        var _a, _b, _c, _d;
        return Object.assign(Object.assign({}, this.initConfig), { walletConfig: Object.assign(Object.assign({}, this.walletConfig), { key: ((_a = this.walletConfig) === null || _a === void 0 ? void 0 : _a.key) ? '[*****]' : undefined, storage: Object.assign(Object.assign({}, (_b = this.walletConfig) === null || _b === void 0 ? void 0 : _b.storage), { credentials: ((_d = (_c = this.walletConfig) === null || _c === void 0 ? void 0 : _c.storage) === null || _d === void 0 ? void 0 : _d.credentials) ? '[*****]' : undefined }) }), logger: this.logger.logLevel, agentDependencies: Boolean(this.agentDependencies), label: this.label });
    }
}
exports.AgentConfig = AgentConfig;
//# sourceMappingURL=AgentConfig.js.map