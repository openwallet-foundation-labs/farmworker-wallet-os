import { AgentMessage } from '../../../../../agent/AgentMessage';
import { Attachment } from '../../../../../decorators/attachment/Attachment';
import { ProofFormatSpec } from '../../../models/ProofFormatSpec';
export interface V2PresentationMessageOptions {
    id?: string;
    comment?: string;
    goalCode?: string;
    goal?: string;
    lastPresentation?: boolean;
    presentationAttachments: Attachment[];
    formats: ProofFormatSpec[];
}
export declare class V2PresentationMessage extends AgentMessage {
    constructor(options: V2PresentationMessageOptions);
    readonly type: string;
    static readonly type: import("../../../../../utils/messageType").ParsedMessageType;
    comment?: string;
    goalCode?: string;
    goal?: string;
    lastPresentation: boolean;
    formats: ProofFormatSpec[];
    presentationAttachments: Attachment[];
    getPresentationAttachmentById(id: string): Attachment | undefined;
}
