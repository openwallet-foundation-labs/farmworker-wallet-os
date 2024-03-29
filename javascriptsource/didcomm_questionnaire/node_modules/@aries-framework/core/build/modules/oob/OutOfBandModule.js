"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutOfBandModule = void 0;
const models_1 = require("../../agent/models");
const OutOfBandApi_1 = require("./OutOfBandApi");
const OutOfBandService_1 = require("./OutOfBandService");
const repository_1 = require("./repository");
class OutOfBandModule {
    constructor() {
        this.api = OutOfBandApi_1.OutOfBandApi;
    }
    /**
     * Registers the dependencies of the ot of band module on the dependency manager.
     */
    register(dependencyManager, featureRegistry) {
        // Api
        dependencyManager.registerContextScoped(OutOfBandApi_1.OutOfBandApi);
        // Services
        dependencyManager.registerSingleton(OutOfBandService_1.OutOfBandService);
        // Repositories
        dependencyManager.registerSingleton(repository_1.OutOfBandRepository);
        // Features
        featureRegistry.register(new models_1.Protocol({
            id: 'https://didcomm.org/out-of-band/1.1',
            roles: ['sender', 'receiver'],
        }));
    }
}
exports.OutOfBandModule = OutOfBandModule;
//# sourceMappingURL=OutOfBandModule.js.map