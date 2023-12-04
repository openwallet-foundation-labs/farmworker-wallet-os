import { AgentMessage } from '../../../agent/AgentMessage';
import { KeylistUpdateAction } from './KeylistUpdateMessage';
export declare enum KeylistUpdateResult {
    ClientError = "client_error",
    ServerError = "server_error",
    NoChange = "no_change",
    Success = "success"
}
export declare class KeylistUpdated {
    constructor(options: {
        recipientKey: string;
        action: KeylistUpdateAction;
        result: KeylistUpdateResult;
    });
    recipientKey: string;
    action: KeylistUpdateAction;
    result: KeylistUpdateResult;
}
export interface KeylistUpdateResponseMessageOptions {
    id?: string;
    keylist: KeylistUpdated[];
    threadId: string;
}
/**
 * Used to notify an edge agent with the result of updating the routing keys in the mediator.
 *
 * @see https://github.com/hyperledger/aries-rfcs/blob/master/features/0211-route-coordination/README.md#keylist-update-response
 */
export declare class KeylistUpdateResponseMessage extends AgentMessage {
    constructor(options: KeylistUpdateResponseMessageOptions);
    readonly type: string;
    static readonly type: import("../../../utils/messageType").ParsedMessageType;
    updated: KeylistUpdated[];
}
