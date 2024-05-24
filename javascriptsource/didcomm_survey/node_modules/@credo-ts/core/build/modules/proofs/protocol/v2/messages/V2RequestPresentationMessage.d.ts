import { AgentMessage } from '../../../../../agent/AgentMessage';
import { Attachment } from '../../../../../decorators/attachment/Attachment';
import { ProofFormatSpec } from '../../../models/ProofFormatSpec';
export interface V2RequestPresentationMessageOptions {
    id?: string;
    comment?: string;
    goalCode?: string;
    goal?: string;
    presentMultiple?: boolean;
    willConfirm?: boolean;
    formats: ProofFormatSpec[];
    requestAttachments: Attachment[];
}
export declare class V2RequestPresentationMessage extends AgentMessage {
    constructor(options: V2RequestPresentationMessageOptions);
    readonly type: string;
    static readonly type: import("../../../../../utils/messageType").ParsedMessageType;
    comment?: string;
    goalCode?: string;
    goal?: string;
    willConfirm: boolean;
    presentMultiple: boolean;
    formats: ProofFormatSpec[];
    requestAttachments: Attachment[];
    getRequestAttachmentById(id: string): Attachment | undefined;
}
