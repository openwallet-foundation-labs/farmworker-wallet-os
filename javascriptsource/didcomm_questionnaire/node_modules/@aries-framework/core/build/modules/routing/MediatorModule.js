"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediatorModule = void 0;
const models_1 = require("../../agent/models");
const MediatorApi_1 = require("./MediatorApi");
const MediatorModuleConfig_1 = require("./MediatorModuleConfig");
const models_2 = require("./models");
const repository_1 = require("./repository");
const services_1 = require("./services");
class MediatorModule {
    constructor(config) {
        this.api = MediatorApi_1.MediatorApi;
        this.config = new MediatorModuleConfig_1.MediatorModuleConfig(config);
    }
    /**
     * Registers the dependencies of the question answer module on the dependency manager.
     */
    register(dependencyManager, featureRegistry) {
        // Api
        dependencyManager.registerContextScoped(MediatorApi_1.MediatorApi);
        // Config
        dependencyManager.registerInstance(MediatorModuleConfig_1.MediatorModuleConfig, this.config);
        // Services
        dependencyManager.registerSingleton(services_1.MediatorService);
        // Repositories
        dependencyManager.registerSingleton(repository_1.MediationRepository);
        dependencyManager.registerSingleton(repository_1.MediatorRoutingRepository);
        // Features
        featureRegistry.register(new models_1.Protocol({
            id: 'https://didcomm.org/coordinate-mediation/1.0',
            roles: [models_2.MediationRole.Mediator],
        }));
    }
}
exports.MediatorModule = MediatorModule;
//# sourceMappingURL=MediatorModule.js.map