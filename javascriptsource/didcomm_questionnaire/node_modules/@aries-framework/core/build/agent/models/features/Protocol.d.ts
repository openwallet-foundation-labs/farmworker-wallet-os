import type { FeatureOptions } from './Feature';
import { Feature } from './Feature';
export interface ProtocolOptions extends Omit<FeatureOptions, 'type'> {
    roles?: string[];
}
export declare class Protocol extends Feature {
    constructor(props: ProtocolOptions);
    static readonly type = "protocol";
    roles?: string[];
}
