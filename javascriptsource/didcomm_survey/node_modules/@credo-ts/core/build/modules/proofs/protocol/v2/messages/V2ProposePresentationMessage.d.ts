import { AgentMessage } from '../../../../../agent/AgentMessage';
import { Attachment } from '../../../../../decorators/attachment/Attachment';
import { ProofFormatSpec } from '../../../models/ProofFormatSpec';
export interface V2ProposePresentationMessageOptions {
    id?: string;
    comment?: string;
    goalCode?: string;
    goal?: string;
    proposalAttachments: Attachment[];
    formats: ProofFormatSpec[];
}
export declare class V2ProposePresentationMessage extends AgentMessage {
    constructor(options: V2ProposePresentationMessageOptions);
    readonly type: string;
    static readonly type: import("../../../../../utils/messageType").ParsedMessageType;
    comment?: string;
    goalCode?: string;
    goal?: string;
    formats: ProofFormatSpec[];
    proposalAttachments: Attachment[];
    getProposalAttachmentById(id: string): Attachment | undefined;
}
