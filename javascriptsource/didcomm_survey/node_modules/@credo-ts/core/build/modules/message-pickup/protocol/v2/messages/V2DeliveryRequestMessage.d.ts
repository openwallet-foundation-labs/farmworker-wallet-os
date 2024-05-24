import { AgentMessage } from '../../../../../agent/AgentMessage';
export interface V2DeliveryRequestMessageOptions {
    id?: string;
    recipientKey?: string;
    limit: number;
}
export declare class V2DeliveryRequestMessage extends AgentMessage {
    readonly allowQueueTransport = false;
    constructor(options: V2DeliveryRequestMessageOptions);
    readonly type: string;
    static readonly type: import("../../../../../utils/messageType").ParsedMessageType;
    recipientKey?: string;
    limit: number;
}
