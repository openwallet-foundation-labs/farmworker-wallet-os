"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicMessagesModule = void 0;
const models_1 = require("../../agent/models");
const BasicMessageRole_1 = require("./BasicMessageRole");
const BasicMessagesApi_1 = require("./BasicMessagesApi");
const repository_1 = require("./repository");
const services_1 = require("./services");
class BasicMessagesModule {
    constructor() {
        this.api = BasicMessagesApi_1.BasicMessagesApi;
    }
    /**
     * Registers the dependencies of the basic message module on the dependency manager.
     */
    register(dependencyManager, featureRegistry) {
        // Api
        dependencyManager.registerContextScoped(BasicMessagesApi_1.BasicMessagesApi);
        // Services
        dependencyManager.registerSingleton(services_1.BasicMessageService);
        // Repositories
        dependencyManager.registerSingleton(repository_1.BasicMessageRepository);
        // Features
        featureRegistry.register(new models_1.Protocol({
            id: 'https://didcomm.org/basicmessage/1.0',
            roles: [BasicMessageRole_1.BasicMessageRole.Sender, BasicMessageRole_1.BasicMessageRole.Receiver],
        }));
    }
}
exports.BasicMessagesModule = BasicMessagesModule;
//# sourceMappingURL=BasicMessagesModule.js.map