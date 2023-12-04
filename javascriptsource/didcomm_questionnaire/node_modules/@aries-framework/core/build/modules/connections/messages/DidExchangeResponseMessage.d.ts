import { AgentMessage } from '../../../agent/AgentMessage';
import { Attachment } from '../../../decorators/attachment/Attachment';
export interface DidExchangeResponseMessageOptions {
    id?: string;
    threadId: string;
    did: string;
}
/**
 * Message part of connection protocol used to complete the connection
 *
 * @see https://github.com/hyperledger/aries-rfcs/blob/main/features/0023-did-exchange/README.md#2-exchange-response
 */
export declare class DidExchangeResponseMessage extends AgentMessage {
    /**
     * Create new DidExchangeResponseMessage instance.
     * @param options
     */
    constructor(options: DidExchangeResponseMessageOptions);
    readonly type: string;
    static readonly type: import("../../../utils/messageType").ParsedMessageType;
    readonly did: string;
    didDoc?: Attachment;
}
