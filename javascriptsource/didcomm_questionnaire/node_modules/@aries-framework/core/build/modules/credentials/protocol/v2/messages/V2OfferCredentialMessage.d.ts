import { AgentMessage } from '../../../../../agent/AgentMessage';
import { Attachment } from '../../../../../decorators/attachment/Attachment';
import { CredentialFormatSpec } from '../../../models';
import { V2CredentialPreview } from './V2CredentialPreview';
export interface V2OfferCredentialMessageOptions {
    id?: string;
    formats: CredentialFormatSpec[];
    offerAttachments: Attachment[];
    credentialPreview: V2CredentialPreview;
    replacementId?: string;
    comment?: string;
}
export declare class V2OfferCredentialMessage extends AgentMessage {
    constructor(options: V2OfferCredentialMessageOptions);
    formats: CredentialFormatSpec[];
    readonly type: string;
    static readonly type: import("../../../../../utils/messageType").ParsedMessageType;
    comment?: string;
    credentialPreview?: V2CredentialPreview;
    offerAttachments: Attachment[];
    replacementId?: string;
    getOfferAttachmentById(id: string): Attachment | undefined;
}
