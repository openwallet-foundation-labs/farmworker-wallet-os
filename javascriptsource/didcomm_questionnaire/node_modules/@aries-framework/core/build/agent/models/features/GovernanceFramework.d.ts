import type { FeatureOptions } from './Feature';
import { Feature } from './Feature';
export type GovernanceFrameworkOptions = Omit<FeatureOptions, 'type'>;
export declare class GovernanceFramework extends Feature {
    constructor(props: GovernanceFrameworkOptions);
    static readonly type = "gov-fw";
}
