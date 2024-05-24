import type { TagsBase } from '../../../storage/BaseRecord';
import { BaseRecord } from '../../../storage/BaseRecord';
export interface MediatorRoutingRecordProps {
    id?: string;
    createdAt?: Date;
    routingKeys?: string[];
    tags?: TagsBase;
}
export declare class MediatorRoutingRecord extends BaseRecord implements MediatorRoutingRecordProps {
    routingKeys: string[];
    static readonly type = "MediatorRoutingRecord";
    readonly type = "MediatorRoutingRecord";
    constructor(props: MediatorRoutingRecordProps);
    getTags(): TagsBase;
}
