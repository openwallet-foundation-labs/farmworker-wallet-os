"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagePickupModule = void 0;
const constants_1 = require("../../constants");
const MessagePickupApi_1 = require("./MessagePickupApi");
const MessagePickupModuleConfig_1 = require("./MessagePickupModuleConfig");
const protocol_1 = require("./protocol");
const services_1 = require("./services");
const storage_1 = require("./storage");
class MessagePickupModule {
    constructor(config) {
        var _a;
        // Infer Api type from the config
        this.api = MessagePickupApi_1.MessagePickupApi;
        this.config = new MessagePickupModuleConfig_1.MessagePickupModuleConfig(Object.assign(Object.assign({}, config), { protocols: (_a = config === null || config === void 0 ? void 0 : config.protocols) !== null && _a !== void 0 ? _a : [new protocol_1.V1MessagePickupProtocol(), new protocol_1.V2MessagePickupProtocol()] }));
    }
    /**
     * Registers the dependencies of the message pickup answer module on the dependency manager.
     */
    register(dependencyManager, featureRegistry) {
        // Config
        dependencyManager.registerInstance(MessagePickupModuleConfig_1.MessagePickupModuleConfig, this.config);
        // Services
        dependencyManager.registerSingleton(services_1.MessagePickupSessionService);
        // Message Pickup queue: use provided one or in-memory one if no injection symbol is yet defined
        if (this.config.messagePickupRepository) {
            dependencyManager.registerInstance(constants_1.InjectionSymbols.MessagePickupRepository, this.config.messagePickupRepository);
        }
        else {
            if (!dependencyManager.isRegistered(constants_1.InjectionSymbols.MessagePickupRepository)) {
                dependencyManager.registerSingleton(constants_1.InjectionSymbols.MessagePickupRepository, storage_1.InMemoryMessagePickupRepository);
            }
        }
        // Protocol needs to register feature registry items and handlers
        for (const protocol of this.config.protocols) {
            protocol.register(dependencyManager, featureRegistry);
        }
    }
}
exports.MessagePickupModule = MessagePickupModule;
//# sourceMappingURL=MessagePickupModule.js.map