import { AgentMessage } from '../../../agent/AgentMessage';
export interface HangupMessageOptions {
    id?: string;
}
/**
 * This message is sent by the rotating_party to inform the observing_party that they are done
 * with the relationship and will no longer be responding.
 *
 * @see https://github.com/hyperledger/aries-rfcs/tree/main/features/0794-did-rotate#hangup
 */
export declare class HangupMessage extends AgentMessage {
    /**
     * Create new HangupMessage instance.
     * @param options
     */
    constructor(options: HangupMessageOptions);
    readonly type: string;
    static readonly type: import("../../../utils/messageType").ParsedMessageType;
}
