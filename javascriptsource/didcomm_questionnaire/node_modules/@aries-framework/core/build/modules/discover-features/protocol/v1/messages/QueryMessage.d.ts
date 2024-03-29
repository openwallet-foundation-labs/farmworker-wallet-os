import { AgentMessage } from '../../../../../agent/AgentMessage';
export interface DiscoverFeaturesQueryMessageOptions {
    id?: string;
    query: string;
    comment?: string;
}
export declare class V1QueryMessage extends AgentMessage {
    constructor(options: DiscoverFeaturesQueryMessageOptions);
    readonly type: string;
    static readonly type: import("../../../../../utils/messageType").ParsedMessageType;
    query: string;
    comment?: string;
}
