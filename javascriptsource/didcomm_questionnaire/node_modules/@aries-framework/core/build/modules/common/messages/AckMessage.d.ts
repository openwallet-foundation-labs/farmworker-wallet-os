import { AgentMessage } from '../../../agent/AgentMessage';
/**
 * Ack message status types
 */
export declare enum AckStatus {
    OK = "OK",
    PENDING = "PENDING"
}
export interface AckMessageOptions {
    id?: string;
    threadId: string;
    status: AckStatus;
}
/**
 * @see https://github.com/hyperledger/aries-rfcs/blob/master/features/0015-acks/README.md#explicit-acks
 */
export declare class AckMessage extends AgentMessage {
    /**
     * Create new AckMessage instance.
     * @param options
     */
    constructor(options: AckMessageOptions);
    readonly type: string;
    static readonly type: import("../../../utils/messageType").ParsedMessageType;
    status: AckStatus;
}
