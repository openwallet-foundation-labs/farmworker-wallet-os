import type { BaseMessageConstructor } from '../../agent/BaseMessage';
import { Attachment } from './Attachment';
export declare function AttachmentDecorated<T extends BaseMessageConstructor>(Base: T): {
    new (...args: any[]): {
        /**
         * The ~attach decorator is required for appending attachments to a message
         */
        appendedAttachments?: Attachment[] | undefined;
        getAppendedAttachmentById(id: string): Attachment | undefined;
        addAppendedAttachment(attachment: Attachment): void;
        id: string;
        readonly type: string;
        generateId(): string;
    };
} & T;
