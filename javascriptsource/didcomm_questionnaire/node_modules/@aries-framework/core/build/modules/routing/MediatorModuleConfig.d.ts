/**
 * MediatorModuleConfigOptions defines the interface for the options of the MediatorModuleConfig class.
 * This can contain optional parameters that have default values in the config class itself.
 */
export interface MediatorModuleConfigOptions {
    /**
     * Whether to automatically accept and grant incoming mediation requests.
     *
     * @default false
     */
    autoAcceptMediationRequests?: boolean;
}
export declare class MediatorModuleConfig {
    private options;
    constructor(options?: MediatorModuleConfigOptions);
    /** See {@link MediatorModuleConfigOptions.autoAcceptMediationRequests} */
    get autoAcceptMediationRequests(): boolean;
}
