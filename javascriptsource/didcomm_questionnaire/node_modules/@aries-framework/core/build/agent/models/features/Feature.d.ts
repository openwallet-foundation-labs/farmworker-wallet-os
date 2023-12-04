export interface FeatureOptions {
    id: string;
    type: string;
}
export declare class Feature {
    id: string;
    constructor(props: FeatureOptions);
    readonly type: string;
    /**
     * Combine this feature with another one, provided both are from the same type
     * and have the same id
     *
     * @param feature object to combine with this one
     * @returns a new object resulting from the combination between this and feature
     */
    combine(feature: this): Feature;
    toJSON(): Record<string, unknown>;
}
