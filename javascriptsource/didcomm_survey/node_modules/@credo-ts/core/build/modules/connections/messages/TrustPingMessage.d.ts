import type { TimingDecorator } from '../../../decorators/timing/TimingDecorator';
import { AgentMessage } from '../../../agent/AgentMessage';
export interface TrustPingMessageOptions {
    comment?: string;
    id?: string;
    responseRequested?: boolean;
    timing?: Pick<TimingDecorator, 'outTime' | 'expiresTime' | 'delayMilli'>;
}
/**
 * Message to initiate trust ping interaction
 *
 * @see https://github.com/hyperledger/aries-rfcs/blob/master/features/0048-trust-ping/README.md#messages
 */
export declare class TrustPingMessage extends AgentMessage {
    readonly allowDidSovPrefix = true;
    /**
     * Create new TrustPingMessage instance.
     * responseRequested will be true if not passed
     * @param options
     */
    constructor(options: TrustPingMessageOptions);
    readonly type: string;
    static readonly type: import("../../../utils/messageType").ParsedMessageType;
    comment?: string;
    responseRequested: boolean;
}
