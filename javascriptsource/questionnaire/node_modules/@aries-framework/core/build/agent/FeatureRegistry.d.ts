import type { FeatureQuery, Feature } from './models';
declare class FeatureRegistry {
    private features;
    /**
     * Register a single or set of Features on the registry
     *
     * @param features set of {Feature} objects or any inherited class
     */
    register(...features: Feature[]): void;
    /**
     * Perform a set of queries in the registry, supporting wildcards (*) as
     * expressed in Aries RFC 0557.
     *
     * @see https://github.com/hyperledger/aries-rfcs/blob/560ffd23361f16a01e34ccb7dcc908ec28c5ddb1/features/0557-discover-features-v2/README.md
     *
     * @param queries set of {FeatureQuery} objects to query features
     * @returns array containing all matching features (can be empty)
     */
    query(...queries: FeatureQuery[]): Feature[];
}
export { FeatureRegistry };
