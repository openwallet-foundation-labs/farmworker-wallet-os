"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediationRecipientModule = void 0;
const models_1 = require("../../agent/models");
const MediationRecipientApi_1 = require("./MediationRecipientApi");
const MediationRecipientModuleConfig_1 = require("./MediationRecipientModuleConfig");
const models_2 = require("./models");
const repository_1 = require("./repository");
const services_1 = require("./services");
class MediationRecipientModule {
    constructor(config) {
        this.api = MediationRecipientApi_1.MediationRecipientApi;
        this.config = new MediationRecipientModuleConfig_1.MediationRecipientModuleConfig(config);
    }
    /**
     * Registers the dependencies of the mediator recipient module on the dependency manager.
     */
    register(dependencyManager, featureRegistry) {
        // Config
        dependencyManager.registerInstance(MediationRecipientModuleConfig_1.MediationRecipientModuleConfig, this.config);
        // Services
        dependencyManager.registerSingleton(services_1.MediationRecipientService);
        dependencyManager.registerSingleton(services_1.RoutingService);
        // Repositories
        dependencyManager.registerSingleton(repository_1.MediationRepository);
        // Features
        featureRegistry.register(new models_1.Protocol({
            id: 'https://didcomm.org/coordinate-mediation/1.0',
            roles: [models_2.MediationRole.Recipient],
        }));
    }
}
exports.MediationRecipientModule = MediationRecipientModule;
//# sourceMappingURL=MediationRecipientModule.js.map