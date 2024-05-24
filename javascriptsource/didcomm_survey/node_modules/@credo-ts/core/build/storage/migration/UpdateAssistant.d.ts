import type { UpdateConfig, UpdateToVersion } from './updates';
import type { BaseAgent } from '../../agent/BaseAgent';
export interface UpdateAssistantUpdateOptions {
    updateToVersion?: UpdateToVersion;
    backupBeforeStorageUpdate?: boolean;
}
export declare class UpdateAssistant<Agent extends BaseAgent<any> = BaseAgent> {
    private agent;
    private storageUpdateService;
    private updateConfig;
    private fileSystem;
    constructor(agent: Agent, updateConfig?: UpdateConfig);
    initialize(): Promise<void>;
    isUpToDate(updateToVersion?: UpdateToVersion): Promise<boolean>;
    getCurrentAgentStorageVersion(): Promise<import("../../utils/version").VersionString>;
    static get frameworkStorageVersion(): "0.5";
    getNeededUpdates(toVersion?: UpdateToVersion): Promise<({
        readonly fromVersion: "0.1";
        readonly toVersion: "0.2";
        readonly doUpdate: typeof import("./updates/0.1-0.2").updateV0_1ToV0_2;
    } | {
        readonly fromVersion: "0.2";
        readonly toVersion: "0.3";
        readonly doUpdate: typeof import("./updates/0.2-0.3").updateV0_2ToV0_3;
    } | {
        readonly fromVersion: "0.3";
        readonly toVersion: "0.3.1";
        readonly doUpdate: typeof import("./updates/0.3-0.3.1").updateV0_3ToV0_3_1;
    } | {
        readonly fromVersion: "0.3.1";
        readonly toVersion: "0.4";
        readonly doUpdate: typeof import("./updates/0.3.1-0.4").updateV0_3_1ToV0_4;
    } | {
        readonly fromVersion: "0.4";
        readonly toVersion: "0.5";
        readonly doUpdate: typeof import("./updates/0.4-0.5").updateV0_4ToV0_5;
    })[]>;
    update(options?: UpdateAssistantUpdateOptions): Promise<string | undefined>;
    private getBackupPath;
    private createBackup;
    private restoreBackup;
}
