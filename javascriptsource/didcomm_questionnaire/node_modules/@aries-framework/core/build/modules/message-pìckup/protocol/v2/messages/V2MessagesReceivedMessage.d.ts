import { AgentMessage } from '../../../../../agent/AgentMessage';
export interface V2MessagesReceivedMessageOptions {
    id?: string;
    messageIdList: string[];
}
export declare class V2MessagesReceivedMessage extends AgentMessage {
    constructor(options: V2MessagesReceivedMessageOptions);
    readonly type: string;
    static readonly type: import("../../../../../utils/messageType").ParsedMessageType;
    messageIdList?: string[];
}
