import { AgentMessage } from '../../../agent/AgentMessage';
export interface MediationRequestMessageOptions {
    sentTime?: Date;
    id?: string;
    locale?: string;
}
/**
 * This message serves as a request from the recipient to the mediator, asking for the permission (and routing information)
 * to publish the endpoint as a mediator.
 *
 * @see https://github.com/hyperledger/aries-rfcs/blob/master/features/0211-route-coordination/README.md#mediation-request
 */
export declare class MediationRequestMessage extends AgentMessage {
    /**
     * Create new BasicMessage instance.
     * sentTime will be assigned to new Date if not passed, id will be assigned to uuid/v4 if not passed
     * @param options
     */
    constructor(options: MediationRequestMessageOptions);
    readonly type: string;
    static readonly type: import("../../../utils/messageType").ParsedMessageType;
}
