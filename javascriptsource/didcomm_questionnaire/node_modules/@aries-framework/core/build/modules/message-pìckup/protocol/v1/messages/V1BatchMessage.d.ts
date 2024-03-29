import { AgentMessage } from '../../../../../agent/AgentMessage';
import { EncryptedMessage } from '../../../../../types';
export declare class BatchMessageMessage {
    constructor(options: {
        id?: string;
        message: EncryptedMessage;
    });
    id: string;
    message: EncryptedMessage;
}
export interface BatchMessageOptions {
    id?: string;
    messages: BatchMessageMessage[];
}
/**
 * A message that contains multiple waiting messages.
 *
 * @see https://github.com/hyperledger/aries-rfcs/blob/master/features/0212-pickup/README.md#batch
 */
export declare class V1BatchMessage extends AgentMessage {
    constructor(options: BatchMessageOptions);
    readonly type: string;
    static readonly type: import("../../../../../utils/messageType").ParsedMessageType;
    messages: BatchMessageMessage[];
}
