"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProofsModule = void 0;
const ProofsApi_1 = require("./ProofsApi");
const ProofsModuleConfig_1 = require("./ProofsModuleConfig");
const protocol_1 = require("./protocol");
const repository_1 = require("./repository");
class ProofsModule {
    constructor(config) {
        var _a;
        this.api = ProofsApi_1.ProofsApi;
        this.config = new ProofsModuleConfig_1.ProofsModuleConfig(Object.assign(Object.assign({}, config), { 
            // NOTE: the proofProtocols defaults are set in the ProofsModule rather than the ProofsModuleConfig to
            // avoid dependency cycles.
            proofProtocols: (_a = config === null || config === void 0 ? void 0 : config.proofProtocols) !== null && _a !== void 0 ? _a : [new protocol_1.V2ProofProtocol({ proofFormats: [] })] }));
    }
    /**
     * Registers the dependencies of the proofs module on the dependency manager.
     */
    register(dependencyManager, featureRegistry) {
        // Api
        dependencyManager.registerContextScoped(ProofsApi_1.ProofsApi);
        // Config
        dependencyManager.registerInstance(ProofsModuleConfig_1.ProofsModuleConfig, this.config);
        // Repositories
        dependencyManager.registerSingleton(repository_1.ProofRepository);
        for (const proofProtocol of this.config.proofProtocols) {
            proofProtocol.register(dependencyManager, featureRegistry);
        }
    }
}
exports.ProofsModule = ProofsModule;
//# sourceMappingURL=ProofsModule.js.map