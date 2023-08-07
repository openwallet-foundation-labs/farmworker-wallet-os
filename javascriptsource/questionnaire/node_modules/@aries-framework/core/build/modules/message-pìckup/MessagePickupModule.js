"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagePickupModule = void 0;
const constants_1 = require("../../constants");
const MessagePickupApi_1 = require("./MessagePickupApi");
const MessagePickupModuleConfig_1 = require("./MessagePickupModuleConfig");
const protocol_1 = require("./protocol");
class MessagePickupModule {
    constructor(config) {
        var _a;
        // Infer Api type from the config
        this.api = MessagePickupApi_1.MessagePickupApi;
        this.config = new MessagePickupModuleConfig_1.MessagePickupModuleConfig(Object.assign(Object.assign({}, config), { protocols: (_a = config === null || config === void 0 ? void 0 : config.protocols) !== null && _a !== void 0 ? _a : [new protocol_1.V1MessagePickupProtocol(), new protocol_1.V2MessagePickupProtocol()] }));
    }
    /**
     * Registers the dependencies of the question answer module on the dependency manager.
     */
    register(dependencyManager, featureRegistry) {
        // Api
        dependencyManager.registerContextScoped(MessagePickupApi_1.MessagePickupApi);
        // Config
        dependencyManager.registerInstance(MessagePickupModuleConfig_1.MessagePickupModuleConfig, this.config);
        // Message repository
        if (this.config.messageRepository) {
            dependencyManager.registerInstance(constants_1.InjectionSymbols.MessageRepository, this.config.messageRepository);
        }
        // Protocol needs to register feature registry items and handlers
        for (const protocol of this.config.protocols) {
            protocol.register(dependencyManager, featureRegistry);
        }
    }
}
exports.MessagePickupModule = MessagePickupModule;
//# sourceMappingURL=MessagePickupModule.js.map