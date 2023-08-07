"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscoverFeaturesModule = void 0;
const models_1 = require("../../agent/models");
const DiscoverFeaturesApi_1 = require("./DiscoverFeaturesApi");
const DiscoverFeaturesModuleConfig_1 = require("./DiscoverFeaturesModuleConfig");
const v1_1 = require("./protocol/v1");
const v2_1 = require("./protocol/v2");
class DiscoverFeaturesModule {
    constructor(config) {
        this.api = DiscoverFeaturesApi_1.DiscoverFeaturesApi;
        this.config = new DiscoverFeaturesModuleConfig_1.DiscoverFeaturesModuleConfig(config);
    }
    /**
     * Registers the dependencies of the discover features module on the dependency manager.
     */
    register(dependencyManager, featureRegistry) {
        // Api
        dependencyManager.registerContextScoped(DiscoverFeaturesApi_1.DiscoverFeaturesApi);
        // Config
        dependencyManager.registerInstance(DiscoverFeaturesModuleConfig_1.DiscoverFeaturesModuleConfig, this.config);
        // Services
        dependencyManager.registerSingleton(v1_1.V1DiscoverFeaturesService);
        dependencyManager.registerSingleton(v2_1.V2DiscoverFeaturesService);
        // Features
        featureRegistry.register(new models_1.Protocol({
            id: 'https://didcomm.org/discover-features/1.0',
            roles: ['requester', 'responder'],
        }), new models_1.Protocol({
            id: 'https://didcomm.org/discover-features/2.0',
            roles: ['requester', 'responder'],
        }));
    }
}
exports.DiscoverFeaturesModule = DiscoverFeaturesModule;
//# sourceMappingURL=DiscoverFeaturesModule.js.map