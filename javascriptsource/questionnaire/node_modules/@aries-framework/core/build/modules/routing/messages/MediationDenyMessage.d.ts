import { AgentMessage } from '../../../agent/AgentMessage';
export interface MediationDenyMessageOptions {
    id: string;
}
/**
 * This message serves as notification of the mediator denying the recipient's request for mediation.
 *
 * @see https://github.com/hyperledger/aries-rfcs/blob/master/features/0211-route-coordination/README.md#mediation-deny
 */
export declare class MediationDenyMessage extends AgentMessage {
    constructor(options: MediationDenyMessageOptions);
    readonly type: string;
    static readonly type: import("../../../utils/messageType").ParsedMessageType;
}
