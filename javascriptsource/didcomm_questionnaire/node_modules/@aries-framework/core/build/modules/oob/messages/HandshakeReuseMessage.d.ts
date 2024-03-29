import { AgentMessage } from '../../../agent/AgentMessage';
export interface HandshakeReuseMessageOptions {
    id?: string;
    parentThreadId: string;
}
export declare class HandshakeReuseMessage extends AgentMessage {
    constructor(options: HandshakeReuseMessageOptions);
    readonly type: string;
    static readonly type: import("../../../utils/messageType").ParsedMessageType;
}
