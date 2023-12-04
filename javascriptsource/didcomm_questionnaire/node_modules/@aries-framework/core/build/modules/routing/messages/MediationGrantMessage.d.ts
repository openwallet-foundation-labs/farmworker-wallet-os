import { AgentMessage } from '../../../agent/AgentMessage';
export interface MediationGrantMessageOptions {
    id?: string;
    endpoint: string;
    routingKeys: string[];
    threadId: string;
}
/**
 * A route grant message is a signal from the mediator to the recipient that permission is given to distribute the
 * included information as an inbound route.
 *
 * @see https://github.com/hyperledger/aries-rfcs/blob/master/features/0211-route-coordination/README.md#mediation-grant
 */
export declare class MediationGrantMessage extends AgentMessage {
    constructor(options: MediationGrantMessageOptions);
    readonly type: string;
    static readonly type: import("../../../utils/messageType").ParsedMessageType;
    routingKeys: string[];
    endpoint: string;
}
