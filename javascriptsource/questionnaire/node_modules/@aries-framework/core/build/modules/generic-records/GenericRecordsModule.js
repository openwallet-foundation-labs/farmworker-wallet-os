"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericRecordsModule = void 0;
const GenericRecordsApi_1 = require("./GenericRecordsApi");
const GenericRecordsRepository_1 = require("./repository/GenericRecordsRepository");
const GenericRecordService_1 = require("./services/GenericRecordService");
class GenericRecordsModule {
    constructor() {
        this.api = GenericRecordsApi_1.GenericRecordsApi;
    }
    /**
     * Registers the dependencies of the generic records module on the dependency manager.
     */
    register(dependencyManager) {
        // Api
        dependencyManager.registerContextScoped(GenericRecordsApi_1.GenericRecordsApi);
        // Services
        dependencyManager.registerSingleton(GenericRecordService_1.GenericRecordService);
        // Repositories
        dependencyManager.registerSingleton(GenericRecordsRepository_1.GenericRecordsRepository);
    }
}
exports.GenericRecordsModule = GenericRecordsModule;
//# sourceMappingURL=GenericRecordsModule.js.map