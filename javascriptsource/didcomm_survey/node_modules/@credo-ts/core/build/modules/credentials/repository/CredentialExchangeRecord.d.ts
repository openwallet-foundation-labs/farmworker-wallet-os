import type { TagsBase } from '../../../storage/BaseRecord';
import type { CredentialRole } from '../models';
import type { AutoAcceptCredential } from '../models/CredentialAutoAcceptType';
import type { CredentialState } from '../models/CredentialState';
import type { RevocationNotification } from '../models/RevocationNotification';
import { Attachment } from '../../../decorators/attachment/Attachment';
import { BaseRecord } from '../../../storage/BaseRecord';
import { CredentialPreviewAttribute } from '../models/CredentialPreviewAttribute';
export interface CredentialExchangeRecordProps {
    id?: string;
    createdAt?: Date;
    state: CredentialState;
    role: CredentialRole;
    connectionId?: string;
    threadId: string;
    parentThreadId?: string;
    protocolVersion: string;
    tags?: CustomCredentialTags;
    credentialAttributes?: CredentialPreviewAttribute[];
    autoAcceptCredential?: AutoAcceptCredential;
    linkedAttachments?: Attachment[];
    revocationNotification?: RevocationNotification;
    errorMessage?: string;
    credentials?: CredentialRecordBinding[];
}
export type CustomCredentialTags = TagsBase;
export type DefaultCredentialTags = {
    threadId: string;
    parentThreadId?: string;
    connectionId?: string;
    state: CredentialState;
    role: CredentialRole;
    credentialIds: string[];
};
export interface CredentialRecordBinding {
    credentialRecordType: string;
    credentialRecordId: string;
}
export declare class CredentialExchangeRecord extends BaseRecord<DefaultCredentialTags, CustomCredentialTags> {
    connectionId?: string;
    threadId: string;
    parentThreadId?: string;
    state: CredentialState;
    role: CredentialRole;
    autoAcceptCredential?: AutoAcceptCredential;
    revocationNotification?: RevocationNotification;
    errorMessage?: string;
    protocolVersion: string;
    credentials: CredentialRecordBinding[];
    credentialAttributes?: CredentialPreviewAttribute[];
    linkedAttachments?: Attachment[];
    static readonly type = "CredentialRecord";
    readonly type = "CredentialRecord";
    constructor(props: CredentialExchangeRecordProps);
    getTags(): {
        threadId: string;
        parentThreadId: string | undefined;
        connectionId: string | undefined;
        state: CredentialState;
        role: CredentialRole;
        credentialIds: string[];
    };
    assertProtocolVersion(version: string): void;
    assertState(expectedStates: CredentialState | CredentialState[]): void;
    assertConnection(currentConnectionId: string): void;
}
