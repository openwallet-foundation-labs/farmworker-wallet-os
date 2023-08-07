import type { TagsBase } from '../../../storage/BaseRecord';
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
    connectionId?: string;
    threadId: string;
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
    connectionId?: string;
    state: CredentialState;
    credentialIds: string[];
};
export interface CredentialRecordBinding {
    credentialRecordType: string;
    credentialRecordId: string;
}
export declare class CredentialExchangeRecord extends BaseRecord<DefaultCredentialTags, CustomCredentialTags> {
    connectionId?: string;
    threadId: string;
    state: CredentialState;
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
        connectionId: string | undefined;
        state: CredentialState;
        credentialIds: string[];
    };
    assertProtocolVersion(version: string): void;
    assertState(expectedStates: CredentialState | CredentialState[]): void;
    assertConnection(currentConnectionId: string): void;
}
