import { AgentMessage } from '../../../../../agent/AgentMessage';
import { Attachment } from '../../../../../decorators/attachment/Attachment';
import { CredentialFormatSpec } from '../../../models';
export interface V2IssueCredentialMessageOptions {
    id?: string;
    comment?: string;
    goalCode?: string;
    goal?: string;
    formats: CredentialFormatSpec[];
    credentialAttachments: Attachment[];
}
export declare class V2IssueCredentialMessage extends AgentMessage {
    constructor(options: V2IssueCredentialMessageOptions);
    formats: CredentialFormatSpec[];
    readonly type: string;
    static readonly type: import("../../../../../utils/messageType").ParsedMessageType;
    comment?: string;
    credentialAttachments: Attachment[];
    goalCode?: string;
    goal?: string;
    getCredentialAttachmentById(id: string): Attachment | undefined;
}
