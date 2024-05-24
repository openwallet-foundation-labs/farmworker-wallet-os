import { AgentMessage } from '../../../agent/AgentMessage';
export interface DidRotateMessageOptions {
    id?: string;
    toDid: string;
}
/**
 * Message to communicate the DID a party wish to rotate to.
 *
 * @see https://github.com/hyperledger/aries-rfcs/tree/main/features/0794-did-rotate#rotate
 */
export declare class DidRotateMessage extends AgentMessage {
    /**
     * Create new RotateMessage instance.
     * @param options
     */
    constructor(options: DidRotateMessageOptions);
    readonly type: string;
    static readonly type: import("../../../utils/messageType").ParsedMessageType;
    readonly toDid: string;
}
