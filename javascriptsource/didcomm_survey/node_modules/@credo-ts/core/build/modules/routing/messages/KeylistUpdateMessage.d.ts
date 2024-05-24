import { AgentMessage } from '../../../agent/AgentMessage';
export declare enum KeylistUpdateAction {
    add = "add",
    remove = "remove"
}
export interface KeylistUpdateOptions {
    recipientKey: string;
    action: KeylistUpdateAction;
}
export declare class KeylistUpdate {
    constructor(options: KeylistUpdateOptions);
    recipientKey: string;
    action: KeylistUpdateAction;
}
export interface KeylistUpdateMessageOptions {
    id?: string;
    updates: KeylistUpdate[];
}
/**
 * Used to notify the mediator of keys in use by the recipient.
 *
 * @see https://github.com/hyperledger/aries-rfcs/blob/master/features/0211-route-coordination/README.md#keylist-update
 */
export declare class KeylistUpdateMessage extends AgentMessage {
    constructor(options: KeylistUpdateMessageOptions);
    readonly type: string;
    static readonly type: import("../../../utils/messageType").ParsedMessageType;
    updates: KeylistUpdate[];
}
