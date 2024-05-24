import { AgentMessage } from '../../../../../agent/AgentMessage';
export interface V2StatusRequestMessageOptions {
    id?: string;
    recipientKey?: string;
}
export declare class V2StatusRequestMessage extends AgentMessage {
    readonly allowQueueTransport = false;
    constructor(options: V2StatusRequestMessageOptions);
    readonly type: string;
    static readonly type: import("../../../../../utils/messageType").ParsedMessageType;
    recipientKey?: string;
}
