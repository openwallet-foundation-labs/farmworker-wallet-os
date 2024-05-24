import type { PlaintextMessage } from '../../../types';
import { AgentMessage } from '../../../agent/AgentMessage';
import { Attachment } from '../../../decorators/attachment/Attachment';
import { OutOfBandDidCommService } from '../domain/OutOfBandDidCommService';
export interface OutOfBandInvitationOptions {
    id?: string;
    label?: string;
    goalCode?: string;
    goal?: string;
    accept?: string[];
    handshakeProtocols?: string[];
    services: Array<OutOfBandDidCommService | string>;
    imageUrl?: string;
    appendedAttachments?: Attachment[];
}
export declare class OutOfBandInvitation extends AgentMessage {
    constructor(options: OutOfBandInvitationOptions);
    /**
     * The original type of the invitation. This is not part of the RFC, but allows to identify
     * from what the oob invitation was originally created (e.g. legacy connectionless invitation).
     */
    invitationType?: InvitationType;
    addRequest(message: AgentMessage): void;
    getRequests(): PlaintextMessage[] | undefined;
    toUrl({ domain }: {
        domain: string;
    }): string;
    static fromUrl(invitationUrl: string): OutOfBandInvitation;
    static fromJson(json: Record<string, unknown>): OutOfBandInvitation;
    get invitationDids(): string[];
    getServices(): Array<OutOfBandDidCommService | string>;
    getDidServices(): Array<string>;
    getInlineServices(): Array<OutOfBandDidCommService>;
    readonly type: string;
    static readonly type: import("../../../utils/messageType").ParsedMessageType;
    readonly label?: string;
    readonly goalCode?: string;
    readonly goal?: string;
    readonly accept?: string[];
    handshakeProtocols?: string[];
    private requests?;
    private services;
    /**
     * Custom property. It is not part of the RFC.
     */
    readonly imageUrl?: string;
}
/**
 * The original invitation an out of band invitation was derived from.
 */
export declare enum InvitationType {
    OutOfBand = "out-of-band/1.x",
    Connection = "connections/1.x",
    Connectionless = "connectionless"
}
