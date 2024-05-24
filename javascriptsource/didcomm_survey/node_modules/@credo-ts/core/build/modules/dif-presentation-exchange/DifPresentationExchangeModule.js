"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DifPresentationExchangeModule = void 0;
const AgentConfig_1 = require("../../agent/AgentConfig");
const DifPresentationExchangeService_1 = require("./DifPresentationExchangeService");
/**
 * @public
 */
class DifPresentationExchangeModule {
    /**
     * Registers the dependencies of the presentation-exchange module on the dependency manager.
     */
    register(dependencyManager) {
        // Warn about experimental module
        dependencyManager
            .resolve(AgentConfig_1.AgentConfig)
            .logger.warn("The 'DifPresentationExchangeModule' module is experimental and could have unexpected breaking changes. When using this module, make sure to use strict versions for all @credo-ts packages.");
        // service
        dependencyManager.registerSingleton(DifPresentationExchangeService_1.DifPresentationExchangeService);
    }
}
exports.DifPresentationExchangeModule = DifPresentationExchangeModule;
//# sourceMappingURL=DifPresentationExchangeModule.js.map