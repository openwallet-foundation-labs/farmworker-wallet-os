import type { V0_1ToV0_2UpdateConfig } from './updates/0.1-0.2';
import type { BaseAgent } from '../../agent/BaseAgent';
import type { VersionString } from '../../utils/version';
import { updateV0_1ToV0_2 } from './updates/0.1-0.2';
import { updateV0_2ToV0_3 } from './updates/0.2-0.3';
import { updateV0_3ToV0_3_1 } from './updates/0.3-0.3.1';
import { updateV0_3_1ToV0_4 } from './updates/0.3.1-0.4';
import { updateV0_4ToV0_5 } from './updates/0.4-0.5';
export declare const INITIAL_STORAGE_VERSION = "0.1";
export interface Update {
    fromVersion: VersionString;
    toVersion: VersionString;
    doUpdate: <Agent extends BaseAgent>(agent: Agent, updateConfig: UpdateConfig) => Promise<void>;
}
export interface UpdateConfig {
    v0_1ToV0_2: V0_1ToV0_2UpdateConfig;
}
export declare const DEFAULT_UPDATE_CONFIG: UpdateConfig;
export declare const supportedUpdates: readonly [{
    readonly fromVersion: "0.1";
    readonly toVersion: "0.2";
    readonly doUpdate: typeof updateV0_1ToV0_2;
}, {
    readonly fromVersion: "0.2";
    readonly toVersion: "0.3";
    readonly doUpdate: typeof updateV0_2ToV0_3;
}, {
    readonly fromVersion: "0.3";
    readonly toVersion: "0.3.1";
    readonly doUpdate: typeof updateV0_3ToV0_3_1;
}, {
    readonly fromVersion: "0.3.1";
    readonly toVersion: "0.4";
    readonly doUpdate: typeof updateV0_3_1ToV0_4;
}, {
    readonly fromVersion: "0.4";
    readonly toVersion: "0.5";
    readonly doUpdate: typeof updateV0_4ToV0_5;
}];
export declare const CURRENT_FRAMEWORK_STORAGE_VERSION: "0.5";
export type UpdateToVersion = (typeof supportedUpdates)[number]['toVersion'];
