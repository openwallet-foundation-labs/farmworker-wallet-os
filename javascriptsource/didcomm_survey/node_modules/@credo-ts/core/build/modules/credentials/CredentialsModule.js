"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CredentialsModule = void 0;
const models_1 = require("../../agent/models");
const CredentialsApi_1 = require("./CredentialsApi");
const CredentialsModuleConfig_1 = require("./CredentialsModuleConfig");
const services_1 = require("./protocol/revocation-notification/services");
const v2_1 = require("./protocol/v2");
const repository_1 = require("./repository");
class CredentialsModule {
    constructor(config) {
        var _a;
        // Infer Api type from the config
        this.api = CredentialsApi_1.CredentialsApi;
        this.config = new CredentialsModuleConfig_1.CredentialsModuleConfig(Object.assign(Object.assign({}, config), { 
            // NOTE: the credentialProtocols defaults are set in the CredentialsModule rather than the CredentialsModuleConfig to
            // avoid dependency cycles.
            credentialProtocols: (_a = config === null || config === void 0 ? void 0 : config.credentialProtocols) !== null && _a !== void 0 ? _a : [new v2_1.V2CredentialProtocol({ credentialFormats: [] })] }));
    }
    /**
     * Registers the dependencies of the credentials module on the dependency manager.
     */
    register(dependencyManager, featureRegistry) {
        // Config
        dependencyManager.registerInstance(CredentialsModuleConfig_1.CredentialsModuleConfig, this.config);
        // Services
        dependencyManager.registerSingleton(services_1.RevocationNotificationService);
        // Repositories
        dependencyManager.registerSingleton(repository_1.CredentialRepository);
        // Features
        featureRegistry.register(new models_1.Protocol({
            id: 'https://didcomm.org/revocation_notification/1.0',
            roles: ['holder'],
        }), new models_1.Protocol({
            id: 'https://didcomm.org/revocation_notification/2.0',
            roles: ['holder'],
        }));
        // Protocol needs to register feature registry items and handlers
        for (const credentialProtocol of this.config.credentialProtocols) {
            credentialProtocol.register(dependencyManager, featureRegistry);
        }
    }
}
exports.CredentialsModule = CredentialsModule;
//# sourceMappingURL=CredentialsModule.js.map