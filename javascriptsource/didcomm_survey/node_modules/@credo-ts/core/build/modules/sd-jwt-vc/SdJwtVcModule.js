"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SdJwtVcModule = void 0;
const AgentConfig_1 = require("../../agent/AgentConfig");
const SdJwtVcApi_1 = require("./SdJwtVcApi");
const SdJwtVcService_1 = require("./SdJwtVcService");
const repository_1 = require("./repository");
/**
 * @public
 */
class SdJwtVcModule {
    constructor() {
        this.api = SdJwtVcApi_1.SdJwtVcApi;
    }
    /**
     * Registers the dependencies of the sd-jwt-vc module on the dependency manager.
     */
    register(dependencyManager) {
        // Warn about experimental module
        dependencyManager
            .resolve(AgentConfig_1.AgentConfig)
            .logger.warn("The 'SdJwtVc' module is experimental and could have unexpected breaking changes. When using this module, make sure to use strict versions for all @credo-ts packages.");
        // Services
        dependencyManager.registerSingleton(SdJwtVcService_1.SdJwtVcService);
        // Repositories
        dependencyManager.registerSingleton(repository_1.SdJwtVcRepository);
    }
}
exports.SdJwtVcModule = SdJwtVcModule;
//# sourceMappingURL=SdJwtVcModule.js.map