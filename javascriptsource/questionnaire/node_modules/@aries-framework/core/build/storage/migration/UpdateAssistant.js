"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAssistant = void 0;
const constants_1 = require("../../constants");
const error_1 = require("../../error");
const version_1 = require("../../utils/version");
const error_2 = require("../../wallet/error");
const WalletError_1 = require("../../wallet/error/WalletError");
const StorageUpdateService_1 = require("./StorageUpdateService");
const StorageUpdateError_1 = require("./error/StorageUpdateError");
const updates_1 = require("./updates");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
class UpdateAssistant {
    constructor(agent, updateConfig) {
        this.agent = agent;
        this.updateConfig = updateConfig;
        this.storageUpdateService = this.agent.dependencyManager.resolve(StorageUpdateService_1.StorageUpdateService);
        this.fileSystem = this.agent.dependencyManager.resolve(constants_1.InjectionSymbols.FileSystem);
    }
    async initialize() {
        if (this.agent.isInitialized) {
            throw new error_1.AriesFrameworkError("Can't initialize UpdateAssistant after agent is initialized");
        }
        // Initialize the wallet if not already done
        if (!this.agent.wallet.isInitialized && this.agent.config.walletConfig) {
            await this.agent.wallet.initialize(this.agent.config.walletConfig);
        }
        else if (!this.agent.wallet.isInitialized) {
            throw new WalletError_1.WalletError('Wallet config has not been set on the agent config. ' +
                'Make sure to initialize the wallet yourself before initializing the update assistant, ' +
                'or provide the required wallet configuration in the agent constructor');
        }
    }
    async isUpToDate(updateToVersion) {
        return this.storageUpdateService.isUpToDate(this.agent.context, updateToVersion);
    }
    async getCurrentAgentStorageVersion() {
        return this.storageUpdateService.getCurrentStorageVersion(this.agent.context);
    }
    static get frameworkStorageVersion() {
        return updates_1.CURRENT_FRAMEWORK_STORAGE_VERSION;
    }
    async getNeededUpdates(toVersion) {
        const currentStorageVersion = (0, version_1.parseVersionString)(await this.storageUpdateService.getCurrentStorageVersion(this.agent.context));
        const parsedToVersion = toVersion ? (0, version_1.parseVersionString)(toVersion) : undefined;
        // If the current storage version is higher or equal to the toVersion, we can't update, so return empty array
        if (parsedToVersion &&
            ((0, version_1.isFirstVersionHigherThanSecond)(currentStorageVersion, parsedToVersion) ||
                (0, version_1.isFirstVersionEqualToSecond)(currentStorageVersion, parsedToVersion))) {
            return [];
        }
        // Filter updates. We don't want older updates we already applied
        // or aren't needed because the wallet was created after the update script was made
        const neededUpdates = updates_1.supportedUpdates.filter((update) => {
            const updateToVersion = (0, version_1.parseVersionString)(update.toVersion);
            // If the update toVersion is higher than the wanted toVersion, we skip the update
            if (parsedToVersion && (0, version_1.isFirstVersionHigherThanSecond)(updateToVersion, parsedToVersion)) {
                return false;
            }
            // if an update toVersion is higher than currentStorageVersion we want to to include the update
            return (0, version_1.isFirstVersionHigherThanSecond)(updateToVersion, currentStorageVersion);
        });
        // The current storage version is too old to update
        if (neededUpdates.length > 0 &&
            (0, version_1.isFirstVersionHigherThanSecond)((0, version_1.parseVersionString)(neededUpdates[0].fromVersion), currentStorageVersion)) {
            throw new error_1.AriesFrameworkError(`First fromVersion is higher than current storage version. You need to use an older version of the framework to update to at least version ${neededUpdates[0].fromVersion}`);
        }
        const lastUpdateToVersion = neededUpdates.length > 0 ? neededUpdates[neededUpdates.length - 1].toVersion : undefined;
        if (toVersion && lastUpdateToVersion && lastUpdateToVersion !== toVersion) {
            throw new error_1.AriesFrameworkError(`No update found for toVersion ${toVersion}. Make sure the toVersion is a valid version you can update to`);
        }
        return neededUpdates;
    }
    async update(updateToVersion) {
        var _a;
        const updateIdentifier = Date.now().toString();
        try {
            this.agent.config.logger.info(`Starting update of agent storage with updateIdentifier ${updateIdentifier}`);
            const neededUpdates = await this.getNeededUpdates(updateToVersion);
            const currentStorageVersion = (0, version_1.parseVersionString)(await this.storageUpdateService.getCurrentStorageVersion(this.agent.context));
            const parsedToVersion = updateToVersion ? (0, version_1.parseVersionString)(updateToVersion) : undefined;
            // If the current storage version is higher or equal to the toVersion, we can't update.
            if (parsedToVersion &&
                ((0, version_1.isFirstVersionHigherThanSecond)(currentStorageVersion, parsedToVersion) ||
                    (0, version_1.isFirstVersionEqualToSecond)(currentStorageVersion, parsedToVersion))) {
                throw new StorageUpdateError_1.StorageUpdateError(`Can't update to version ${updateToVersion} because it is lower or equal to the current agent storage version ${currentStorageVersion[0]}.${currentStorageVersion[1]}}`);
            }
            if (neededUpdates.length === 0) {
                this.agent.config.logger.info('No update needed. Agent storage is up to date.');
                return;
            }
            const fromVersion = neededUpdates[0].fromVersion;
            const toVersion = neededUpdates[neededUpdates.length - 1].toVersion;
            this.agent.config.logger.info(`Starting update process. Total of ${neededUpdates.length} update(s) will be applied to update the agent storage from version ${fromVersion} to version ${toVersion}`);
            // Create backup in case migration goes wrong
            await this.createBackup(updateIdentifier);
            try {
                for (const update of neededUpdates) {
                    const registeredModules = Object.values(this.agent.dependencyManager.registeredModules);
                    const modulesWithUpdate = [];
                    // Filter modules that have an update script for the current update
                    for (const registeredModule of registeredModules) {
                        const moduleUpdate = (_a = registeredModule.updates) === null || _a === void 0 ? void 0 : _a.find((module) => module.fromVersion === update.fromVersion && module.toVersion === update.toVersion);
                        if (moduleUpdate) {
                            modulesWithUpdate.push({
                                module: registeredModule,
                                update: moduleUpdate,
                            });
                        }
                    }
                    this.agent.config.logger.info(`Starting update of agent storage from version ${update.fromVersion} to version ${update.toVersion}. Found ${modulesWithUpdate.length} extension module(s) with update scripts`);
                    await update.doUpdate(this.agent, this.updateConfig);
                    this.agent.config.logger.info(`Finished update of core agent storage from version ${update.fromVersion} to version ${update.toVersion}. Starting update of extension modules`);
                    for (const moduleWithUpdate of modulesWithUpdate) {
                        this.agent.config.logger.info(`Starting update of extension module ${moduleWithUpdate.module.constructor.name} from version ${moduleWithUpdate.update.fromVersion} to version ${moduleWithUpdate.update.toVersion}`);
                        await moduleWithUpdate.update.doUpdate(this.agent, this.updateConfig);
                        this.agent.config.logger.info(`Finished update of extension module ${moduleWithUpdate.module.constructor.name} from version ${moduleWithUpdate.update.fromVersion} to version ${moduleWithUpdate.update.toVersion}`);
                    }
                    // Update the framework version in storage
                    await this.storageUpdateService.setCurrentStorageVersion(this.agent.context, update.toVersion);
                    this.agent.config.logger.info(`Successfully updated agent storage from version ${update.fromVersion} to version ${update.toVersion}`);
                }
                // Delete backup file, as it is not needed anymore
                await this.fileSystem.delete(this.getBackupPath(updateIdentifier));
            }
            catch (error) {
                this.agent.config.logger.fatal('An error occurred while updating the wallet. Restoring backup', {
                    error,
                });
                // In the case of an error we want to restore the backup
                await this.restoreBackup(updateIdentifier);
                // Delete backup file, as wallet was already restored (backup-error file will persist though)
                await this.fileSystem.delete(this.getBackupPath(updateIdentifier));
                throw error;
            }
        }
        catch (error) {
            // Backup already exists at path
            if (error instanceof error_2.WalletExportPathExistsError) {
                const backupPath = this.getBackupPath(updateIdentifier);
                const errorMessage = `Error updating storage with updateIdentifier ${updateIdentifier} because the backup at path ${backupPath} already exists`;
                this.agent.config.logger.fatal(errorMessage, {
                    error,
                    updateIdentifier,
                    backupPath,
                });
                throw new StorageUpdateError_1.StorageUpdateError(errorMessage, { cause: error });
            }
            this.agent.config.logger.error(`Error updating storage (updateIdentifier: ${updateIdentifier})`, {
                cause: error,
            });
            throw new StorageUpdateError_1.StorageUpdateError(`Error updating storage (updateIdentifier: ${updateIdentifier}): ${error.message}`, {
                cause: error,
            });
        }
        return updateIdentifier;
    }
    getBackupPath(backupIdentifier) {
        return `${this.fileSystem.dataPath}/migration/backup/${backupIdentifier}`;
    }
    async createBackup(backupIdentifier) {
        var _a;
        const backupPath = this.getBackupPath(backupIdentifier);
        const walletKey = (_a = this.agent.wallet.walletConfig) === null || _a === void 0 ? void 0 : _a.key;
        if (!walletKey) {
            throw new error_1.AriesFrameworkError("Could not extract wallet key from wallet module. Can't create backup");
        }
        await this.agent.wallet.export({ key: walletKey, path: backupPath });
        this.agent.config.logger.info('Created backup of the wallet', {
            backupPath,
        });
    }
    async restoreBackup(backupIdentifier) {
        const backupPath = this.getBackupPath(backupIdentifier);
        const walletConfig = this.agent.wallet.walletConfig;
        if (!walletConfig) {
            throw new error_1.AriesFrameworkError('Could not extract wallet config from wallet module. Cannot restore backup');
        }
        // Export and delete current wallet
        await this.agent.wallet.export({ key: walletConfig.key, path: `${backupPath}-error` });
        await this.agent.wallet.delete();
        // Import backup
        await this.agent.wallet.import(walletConfig, { key: walletConfig.key, path: backupPath });
        await this.agent.wallet.initialize(walletConfig);
        this.agent.config.logger.info(`Successfully restored wallet from backup ${backupIdentifier}`, {
            backupPath,
        });
    }
}
exports.UpdateAssistant = UpdateAssistant;
//# sourceMappingURL=UpdateAssistant.js.map