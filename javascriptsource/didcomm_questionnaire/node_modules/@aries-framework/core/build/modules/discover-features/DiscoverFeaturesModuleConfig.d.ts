/**
 * DiscoverFeaturesModuleConfigOptions defines the interface for the options of the DiscoverFeaturesModuleConfig class.
 * This can contain optional parameters that have default values in the config class itself.
 */
export interface DiscoverFeaturesModuleConfigOptions {
    /**
     * Whether to automatically accept feature queries. Applies to all protocol versions.
     *
     * @default true
     */
    autoAcceptQueries?: boolean;
}
export declare class DiscoverFeaturesModuleConfig {
    private options;
    constructor(options?: DiscoverFeaturesModuleConfigOptions);
    /** {@inheritDoc DiscoverFeaturesModuleConfigOptions.autoAcceptQueries} */
    get autoAcceptQueries(): boolean;
}
