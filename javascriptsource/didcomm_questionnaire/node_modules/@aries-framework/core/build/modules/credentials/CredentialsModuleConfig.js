"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CredentialsModuleConfig = void 0;
const models_1 = require("./models");
class CredentialsModuleConfig {
    constructor(options) {
        this.options = options;
    }
    /** See {@link CredentialsModuleConfigOptions.autoAcceptCredentials} */
    get autoAcceptCredentials() {
        var _a;
        return (_a = this.options.autoAcceptCredentials) !== null && _a !== void 0 ? _a : models_1.AutoAcceptCredential.Never;
    }
    /** See {@link CredentialsModuleConfigOptions.credentialProtocols} */
    get credentialProtocols() {
        return this.options.credentialProtocols;
    }
}
exports.CredentialsModuleConfig = CredentialsModuleConfig;
//# sourceMappingURL=CredentialsModuleConfig.js.map