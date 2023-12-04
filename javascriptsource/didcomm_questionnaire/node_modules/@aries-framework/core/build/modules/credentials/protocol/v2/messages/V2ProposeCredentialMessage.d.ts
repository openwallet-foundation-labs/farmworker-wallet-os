import { AgentMessage } from '../../../../../agent/AgentMessage';
import { Attachment } from '../../../../../decorators/attachment/Attachment';
import { CredentialFormatSpec } from '../../../models';
import { V2CredentialPreview } from './V2CredentialPreview';
export interface V2ProposeCredentialMessageOptions {
    id?: string;
    formats: CredentialFormatSpec[];
    proposalAttachments: Attachment[];
    comment?: string;
    credentialPreview?: V2CredentialPreview;
    attachments?: Attachment[];
}
export declare class V2ProposeCredentialMessage extends AgentMessage {
    constructor(options: V2ProposeCredentialMessageOptions);
    formats: CredentialFormatSpec[];
    readonly type: string;
    static readonly type: import("../../../../../utils/messageType").ParsedMessageType;
    credentialPreview?: V2CredentialPreview;
    proposalAttachments: Attachment[];
    /**
     * Human readable information about this Credential Proposal,
     * so the proposal can be evaluated by human judgment.
     */
    comment?: string;
    getProposalAttachmentById(id: string): Attachment | undefined;
}
