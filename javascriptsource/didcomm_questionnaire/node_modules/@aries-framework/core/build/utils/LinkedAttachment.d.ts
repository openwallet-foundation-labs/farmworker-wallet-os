import { Attachment } from '../decorators/attachment/Attachment';
export interface LinkedAttachmentOptions {
    name: string;
    attachment: Attachment;
}
export declare class LinkedAttachment {
    constructor(options: LinkedAttachmentOptions);
    /**
     * The name that will be used to generate the linked credential
     */
    attributeName: string;
    /**
     * The attachment that needs to be linked to the credential
     */
    attachment: Attachment;
    /**
     * Generates an ID based on the data in the attachment
     *
     * @param attachment the attachment that requires a hashlink
     * @returns the id
     */
    private getId;
}
