import { AgentMessage } from '../../../agent/AgentMessage';
export interface KeylistMessageOptions {
    id?: string;
}
/**
 * Used to notify the recipient of keys in use by the mediator.
 *
 * @see https://github.com/hyperledger/aries-rfcs/blob/master/features/0211-route-coordination/README.md#keylist
 */
export declare class KeylistMessage extends AgentMessage {
    constructor(options: KeylistMessageOptions);
    readonly type: string;
    static readonly type: import("../../../utils/messageType").ParsedMessageType;
    updates: Keylist[];
}
export declare class Keylist {
    constructor(options: {
        paginateOffset: number;
    });
}
