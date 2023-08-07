import { AgentMessage } from '../../../../../agent/AgentMessage';
import { Attachment } from '../../../../../decorators/attachment/Attachment';
import { CredentialFormatSpec } from '../../../models';
export interface V2RequestCredentialMessageOptions {
    id?: string;
    formats: CredentialFormatSpec[];
    requestAttachments: Attachment[];
    comment?: string;
}
export declare class V2RequestCredentialMessage extends AgentMessage {
    constructor(options: V2RequestCredentialMessageOptions);
    formats: CredentialFormatSpec[];
    readonly type: string;
    static readonly type: import("../../../../../utils/messageType").ParsedMessageType;
    requestAttachments: Attachment[];
    /**
     * Human readable information about this Credential Request,
     * so the proposal can be evaluated by human judgment.
     */
    comment?: string;
    getRequestAttachmentById(id: string): Attachment | undefined;
}
