import type { TimingDecorator } from '../../../decorators/timing/TimingDecorator';
import { AgentMessage } from '../../../agent/AgentMessage';
export interface TrustPingResponseMessageOptions {
    comment?: string;
    id?: string;
    threadId: string;
    timing?: Pick<TimingDecorator, 'inTime' | 'outTime'>;
}
/**
 * Message to respond to a trust ping message
 *
 * @see https://github.com/hyperledger/aries-rfcs/blob/master/features/0048-trust-ping/README.md#messages
 */
export declare class TrustPingResponseMessage extends AgentMessage {
    readonly allowDidSovPrefix = true;
    /**
     * Create new TrustPingResponseMessage instance.
     * responseRequested will be true if not passed
     * @param options
     */
    constructor(options: TrustPingResponseMessageOptions);
    readonly type: string;
    static readonly type: import("../../../utils/messageType").ParsedMessageType;
    comment?: string;
}
