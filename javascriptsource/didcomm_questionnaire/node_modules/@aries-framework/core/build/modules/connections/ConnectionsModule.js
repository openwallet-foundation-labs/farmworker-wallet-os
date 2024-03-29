"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionsModule = void 0;
const models_1 = require("../../agent/models");
const ConnectionsApi_1 = require("./ConnectionsApi");
const ConnectionsModuleConfig_1 = require("./ConnectionsModuleConfig");
const DidExchangeProtocol_1 = require("./DidExchangeProtocol");
const models_2 = require("./models");
const repository_1 = require("./repository");
const services_1 = require("./services");
class ConnectionsModule {
    constructor(config) {
        this.api = ConnectionsApi_1.ConnectionsApi;
        this.config = new ConnectionsModuleConfig_1.ConnectionsModuleConfig(config);
    }
    /**
     * Registers the dependencies of the connections module on the dependency manager.
     */
    register(dependencyManager, featureRegistry) {
        // Api
        dependencyManager.registerContextScoped(ConnectionsApi_1.ConnectionsApi);
        // Config
        dependencyManager.registerInstance(ConnectionsModuleConfig_1.ConnectionsModuleConfig, this.config);
        // Services
        dependencyManager.registerSingleton(services_1.ConnectionService);
        dependencyManager.registerSingleton(DidExchangeProtocol_1.DidExchangeProtocol);
        dependencyManager.registerSingleton(services_1.TrustPingService);
        // Repositories
        dependencyManager.registerSingleton(repository_1.ConnectionRepository);
        // Features
        featureRegistry.register(new models_1.Protocol({
            id: 'https://didcomm.org/connections/1.0',
            roles: [models_2.ConnectionRole.Invitee, models_2.ConnectionRole.Inviter],
        }), new models_1.Protocol({
            id: 'https://didcomm.org/didexchange/1.0',
            roles: [models_2.DidExchangeRole.Requester, models_2.DidExchangeRole.Responder],
        }));
    }
}
exports.ConnectionsModule = ConnectionsModule;
//# sourceMappingURL=ConnectionsModule.js.map