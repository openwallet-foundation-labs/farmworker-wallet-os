import type { DidRecordMetadata } from './didRecordMetadataTypes';
import type { TagsBase } from '../../../storage/BaseRecord';
import { BaseRecord } from '../../../storage/BaseRecord';
import { DidDocument } from '../domain';
import { DidDocumentRole } from '../domain/DidDocumentRole';
export interface DidRecordProps {
    id?: string;
    did: string;
    role: DidDocumentRole;
    didDocument?: DidDocument;
    createdAt?: Date;
    tags?: CustomDidTags;
}
export interface CustomDidTags extends TagsBase {
    recipientKeyFingerprints?: string[];
}
type DefaultDidTags = {
    role: DidDocumentRole;
    method: string;
    legacyUnqualifiedDid?: string;
    methodSpecificIdentifier: string;
    did: string;
};
export declare class DidRecord extends BaseRecord<DefaultDidTags, CustomDidTags, DidRecordMetadata> implements DidRecordProps {
    didDocument?: DidDocument;
    did: string;
    role: DidDocumentRole;
    static readonly type = "DidRecord";
    readonly type = "DidRecord";
    constructor(props: DidRecordProps);
    getTags(): {
        role: DidDocumentRole;
        method: string;
        legacyUnqualifiedDid: string | undefined;
        did: string;
        methodSpecificIdentifier: string;
        recipientKeyFingerprints?: string[] | undefined;
    };
}
export {};
