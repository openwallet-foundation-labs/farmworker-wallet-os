import type { Attachment } from '../../../decorators/attachment/Attachment';
import { AgentMessage } from '../../../agent/AgentMessage';
export interface BaseInvitationOptions {
    id?: string;
    label: string;
    imageUrl?: string;
    appendedAttachments?: Attachment[];
}
export interface InlineInvitationOptions {
    recipientKeys: string[];
    serviceEndpoint: string;
    routingKeys?: string[];
}
export interface DIDInvitationOptions {
    did: string;
}
/**
 * Message to invite another agent to create a connection
 *
 * @see https://github.com/hyperledger/aries-rfcs/blob/master/features/0160-connection-protocol/README.md#0-invitation-to-connect
 */
export declare class ConnectionInvitationMessage extends AgentMessage {
    readonly allowDidSovPrefix = true;
    /**
     * Create new ConnectionInvitationMessage instance.
     * @param options
     */
    constructor(options: BaseInvitationOptions & (DIDInvitationOptions | InlineInvitationOptions));
    readonly type: string;
    static readonly type: import("../../../utils/messageType").ParsedMessageType;
    label: string;
    did?: string;
    recipientKeys?: string[];
    serviceEndpoint?: string;
    routingKeys?: string[];
    imageUrl?: string;
    /**
     * Create an invitation url from this instance
     *
     * @param domain domain name to use for invitation url
     * @returns invitation url with base64 encoded invitation
     */
    toUrl({ domain, useDidSovPrefixWhereAllowed, }: {
        domain: string;
        useDidSovPrefixWhereAllowed?: boolean;
    }): string;
    /**
     * Create a `ConnectionInvitationMessage` instance from the `c_i` or `d_m` parameter of an URL
     *
     * @param invitationUrl invitation url containing c_i or d_m parameter
     *
     * @throws Error when the url can not be decoded to JSON, or decoded message is not a valid 'ConnectionInvitationMessage'
     */
    static fromUrl(invitationUrl: string): ConnectionInvitationMessage;
}
