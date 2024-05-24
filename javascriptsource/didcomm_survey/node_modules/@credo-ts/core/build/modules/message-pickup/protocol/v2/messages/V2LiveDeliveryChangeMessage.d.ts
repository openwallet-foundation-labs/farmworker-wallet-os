import { AgentMessage } from '../../../../../agent/AgentMessage';
export interface V2LiveDeliveryChangeMessageOptions {
    id?: string;
    liveDelivery: boolean;
}
export declare class V2LiveDeliveryChangeMessage extends AgentMessage {
    readonly allowQueueTransport = false;
    constructor(options: V2LiveDeliveryChangeMessageOptions);
    readonly type: string;
    static readonly type: import("../../../../../utils/messageType").ParsedMessageType;
    liveDelivery: boolean;
}
