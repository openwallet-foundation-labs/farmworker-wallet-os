import { AgentMessage } from '../../../../../agent/AgentMessage';
import { Feature } from '../../../../../agent/models';
export interface V2DisclosuresMessageOptions {
    id?: string;
    threadId?: string;
    features?: Feature[];
}
export declare class V2DisclosuresMessage extends AgentMessage {
    constructor(options: V2DisclosuresMessageOptions);
    readonly type: string;
    static readonly type: import("../../../../../utils/messageType").ParsedMessageType;
    disclosures: Feature[];
}
