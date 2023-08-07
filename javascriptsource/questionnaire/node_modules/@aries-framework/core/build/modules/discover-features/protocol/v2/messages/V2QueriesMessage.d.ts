import type { FeatureQueryOptions } from '../../../../../agent/models';
import { AgentMessage } from '../../../../../agent/AgentMessage';
import { FeatureQuery } from '../../../../../agent/models';
export interface V2DiscoverFeaturesQueriesMessageOptions {
    id?: string;
    queries: FeatureQueryOptions[];
    comment?: string;
}
export declare class V2QueriesMessage extends AgentMessage {
    constructor(options: V2DiscoverFeaturesQueriesMessageOptions);
    readonly type: string;
    static readonly type: import("../../../../../utils/messageType").ParsedMessageType;
    queries: FeatureQuery[];
}
