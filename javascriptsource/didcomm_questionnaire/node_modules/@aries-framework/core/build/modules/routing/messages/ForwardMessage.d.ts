import { AgentMessage } from '../../../agent/AgentMessage';
import { EncryptedMessage } from '../../../types';
export interface ForwardMessageOptions {
    id?: string;
    to: string;
    message: EncryptedMessage;
}
/**
 * @see https://github.com/hyperledger/aries-rfcs/blob/master/concepts/0094-cross-domain-messaging/README.md#corerouting10forward
 */
export declare class ForwardMessage extends AgentMessage {
    readonly allowDidSovPrefix = true;
    /**
     * Create new ForwardMessage instance.
     *
     * @param options
     */
    constructor(options: ForwardMessageOptions);
    readonly type: string;
    static readonly type: import("../../../utils/messageType").ParsedMessageType;
    to: string;
    message: EncryptedMessage;
}
