import { AgentMessage } from '../../../agent/AgentMessage';
import { Attachment } from '../../../decorators/attachment/Attachment';
export interface DidExchangeRequestMessageOptions {
    id?: string;
    parentThreadId: string;
    label: string;
    goalCode?: string;
    goal?: string;
    did: string;
}
/**
 * Message to communicate the DID document to the other agent when creating a connection
 *
 * @see https://github.com/hyperledger/aries-rfcs/blob/main/features/0023-did-exchange/README.md#1-exchange-request
 */
export declare class DidExchangeRequestMessage extends AgentMessage {
    /**
     * Create new DidExchangeRequestMessage instance.
     * @param options
     */
    constructor(options: DidExchangeRequestMessageOptions);
    readonly type: string;
    static readonly type: import("../../../utils/messageType").ParsedMessageType;
    readonly label?: string;
    readonly goalCode?: string;
    readonly goal?: string;
    readonly did: string;
    didDoc?: Attachment;
}
