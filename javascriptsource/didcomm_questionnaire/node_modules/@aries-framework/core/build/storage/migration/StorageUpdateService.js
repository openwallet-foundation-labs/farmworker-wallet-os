"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var StorageUpdateService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageUpdateService = void 0;
const constants_1 = require("../../constants");
const plugins_1 = require("../../plugins");
const version_1 = require("../../utils/version");
const StorageVersionRecord_1 = require("./repository/StorageVersionRecord");
const StorageVersionRepository_1 = require("./repository/StorageVersionRepository");
const updates_1 = require("./updates");
let StorageUpdateService = StorageUpdateService_1 = class StorageUpdateService {
    constructor(logger, storageVersionRepository) {
        this.logger = logger;
        this.storageVersionRepository = storageVersionRepository;
    }
    async isUpToDate(agentContext, updateToVersion) {
        const currentStorageVersion = (0, version_1.parseVersionString)(await this.getCurrentStorageVersion(agentContext));
        const compareToVersion = (0, version_1.parseVersionString)(updateToVersion !== null && updateToVersion !== void 0 ? updateToVersion : updates_1.CURRENT_FRAMEWORK_STORAGE_VERSION);
        const isUpToDate = (0, version_1.isFirstVersionEqualToSecond)(currentStorageVersion, compareToVersion) ||
            (0, version_1.isFirstVersionHigherThanSecond)(currentStorageVersion, compareToVersion);
        return isUpToDate;
    }
    async getCurrentStorageVersion(agentContext) {
        const storageVersionRecord = await this.getStorageVersionRecord(agentContext);
        return storageVersionRecord.storageVersion;
    }
    async setCurrentStorageVersion(agentContext, storageVersion) {
        this.logger.debug(`Setting current agent storage version to ${storageVersion}`);
        const storageVersionRecord = await this.storageVersionRepository.findById(agentContext, StorageUpdateService_1.STORAGE_VERSION_RECORD_ID);
        if (!storageVersionRecord) {
            this.logger.trace('Storage upgrade record does not exist yet. Creating.');
            await this.storageVersionRepository.save(agentContext, new StorageVersionRecord_1.StorageVersionRecord({
                id: StorageUpdateService_1.STORAGE_VERSION_RECORD_ID,
                storageVersion,
            }));
        }
        else {
            this.logger.trace('Storage upgrade record already exists. Updating.');
            storageVersionRecord.storageVersion = storageVersion;
            await this.storageVersionRepository.update(agentContext, storageVersionRecord);
        }
    }
    /**
     * Retrieve the update record, creating it if it doesn't exist already.
     *
     * The storageVersion will be set to the INITIAL_STORAGE_VERSION if it doesn't exist yet,
     * as we can assume the wallet was created before the update record existed
     */
    async getStorageVersionRecord(agentContext) {
        let storageVersionRecord = await this.storageVersionRepository.findById(agentContext, StorageUpdateService_1.STORAGE_VERSION_RECORD_ID);
        if (!storageVersionRecord) {
            storageVersionRecord = new StorageVersionRecord_1.StorageVersionRecord({
                id: StorageUpdateService_1.STORAGE_VERSION_RECORD_ID,
                storageVersion: updates_1.INITIAL_STORAGE_VERSION,
            });
            await this.storageVersionRepository.save(agentContext, storageVersionRecord);
        }
        return storageVersionRecord;
    }
};
StorageUpdateService.STORAGE_VERSION_RECORD_ID = 'STORAGE_VERSION_RECORD_ID';
StorageUpdateService = StorageUpdateService_1 = __decorate([
    (0, plugins_1.injectable)(),
    __param(0, (0, plugins_1.inject)(constants_1.InjectionSymbols.Logger)),
    __metadata("design:paramtypes", [Object, StorageVersionRepository_1.StorageVersionRepository])
], StorageUpdateService);
exports.StorageUpdateService = StorageUpdateService;
//# sourceMappingURL=StorageUpdateService.js.map