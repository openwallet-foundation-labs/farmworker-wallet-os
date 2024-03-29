import type { RecordTags, TagsBase } from '../../../storage/BaseRecord';
import { BaseRecord } from '../../../storage/BaseRecord';
export type GenericRecordTags = TagsBase;
export type BasicMessageTags = RecordTags<GenericRecord>;
export interface GenericRecordStorageProps {
    id?: string;
    createdAt?: Date;
    tags?: GenericRecordTags;
    content: Record<string, unknown>;
}
export interface SaveGenericRecordOption {
    content: Record<string, unknown>;
    id?: string;
    tags?: GenericRecordTags;
}
export declare class GenericRecord extends BaseRecord<GenericRecordTags> {
    content: Record<string, unknown>;
    static readonly type = "GenericRecord";
    readonly type = "GenericRecord";
    constructor(props: GenericRecordStorageProps);
    getTags(): {
        [x: string]: import("../../../storage/BaseRecord").TagValue;
        [x: number]: never;
    };
}
