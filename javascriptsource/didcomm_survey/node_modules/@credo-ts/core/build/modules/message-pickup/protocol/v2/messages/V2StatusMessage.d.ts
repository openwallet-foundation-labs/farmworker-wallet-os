import { AgentMessage } from '../../../../../agent/AgentMessage';
export interface V2StatusMessageOptions {
    id?: string;
    recipientKey?: string;
    threadId: string;
    messageCount: number;
    longestWaitedSeconds?: number;
    newestReceivedTime?: Date;
    oldestReceivedTime?: Date;
    totalBytes?: number;
    liveDelivery?: boolean;
}
export declare class V2StatusMessage extends AgentMessage {
    readonly allowQueueTransport = false;
    constructor(options: V2StatusMessageOptions);
    readonly type: string;
    static readonly type: import("../../../../../utils/messageType").ParsedMessageType;
    recipientKey?: string;
    messageCount: number;
    longestWaitedSeconds?: number;
    newestReceivedTime?: Date;
    oldestReceivedTime?: Date;
    totalBytes?: number;
    liveDelivery?: boolean;
}
