import { EventEmitter, NativeModulesStatic } from 'react-native';
export interface NativeModuleConfig {
    version: string;
    nativeModuleName: string;
    nativeEvents: string[];
}
export default class NotifeeNativeModule {
    private readonly _moduleConfig;
    constructor(config: NativeModuleConfig);
    get emitter(): EventEmitter;
    get native(): NativeModulesStatic;
}
