"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DidsModule = void 0;
const DidsApi_1 = require("./DidsApi");
const DidsModuleConfig_1 = require("./DidsModuleConfig");
const repository_1 = require("./repository");
const services_1 = require("./services");
class DidsModule {
    constructor(config) {
        this.api = DidsApi_1.DidsApi;
        this.config = new DidsModuleConfig_1.DidsModuleConfig(config);
    }
    /**
     * Registers the dependencies of the dids module module on the dependency manager.
     */
    register(dependencyManager) {
        // Api
        dependencyManager.registerContextScoped(DidsApi_1.DidsApi);
        // Config
        dependencyManager.registerInstance(DidsModuleConfig_1.DidsModuleConfig, this.config);
        // Services
        dependencyManager.registerSingleton(services_1.DidResolverService);
        dependencyManager.registerSingleton(services_1.DidRegistrarService);
        dependencyManager.registerSingleton(repository_1.DidRepository);
    }
}
exports.DidsModule = DidsModule;
//# sourceMappingURL=DidsModule.js.map