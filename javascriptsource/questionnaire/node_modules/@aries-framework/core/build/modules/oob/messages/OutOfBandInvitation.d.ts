import type { PlaintextMessage } from '../../../types';
import type { HandshakeProtocol } from '../../connections';
import { AgentMessage } from '../../../agent/AgentMessage';
import { Attachment } from '../../../decorators/attachment/Attachment';
import { OutOfBandDidCommService } from '../domain/OutOfBandDidCommService';
export interface OutOfBandInvitationOptions {
    id?: string;
    label: string;
    goalCode?: string;
    goal?: string;
    accept?: string[];
    handshakeProtocols?: HandshakeProtocol[];
    services: Array<OutOfBandDidCommService | string>;
    imageUrl?: string;
    appendedAttachments?: Attachment[];
}
export declare class OutOfBandInvitation extends AgentMessage {
    constructor(options: OutOfBandInvitationOptions);
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
    readonly label: string;
    readonly goalCode?: string;
    readonly goal?: string;
    readonly accept?: string[];
    handshakeProtocols?: HandshakeProtocol[];
    private requests?;
    private services;
    /**
     * Custom property. It is not part of the RFC.
     */
    readonly imageUrl?: string;
}
