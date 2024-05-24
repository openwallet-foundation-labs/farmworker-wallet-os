export interface FeatureQueryOptions {
    featureType: string;
    match: string;
}
export declare class FeatureQuery {
    constructor(options: FeatureQueryOptions);
    featureType: string;
    match: string;
}
