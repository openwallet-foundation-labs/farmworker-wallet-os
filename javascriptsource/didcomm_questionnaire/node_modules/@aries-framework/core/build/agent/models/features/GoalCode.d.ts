import type { FeatureOptions } from './Feature';
import { Feature } from './Feature';
export type GoalCodeOptions = Omit<FeatureOptions, 'type'>;
export declare class GoalCode extends Feature {
    constructor(props: GoalCodeOptions);
    static readonly type = "goal-code";
}
