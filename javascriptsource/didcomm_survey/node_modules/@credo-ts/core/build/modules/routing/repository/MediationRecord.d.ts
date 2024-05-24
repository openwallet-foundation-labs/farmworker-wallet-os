import type { MediationRole } from '../models/MediationRole';
import { BaseRecord } from '../../../storage/BaseRecord';
import { MediatorPickupStrategy } from '../MediatorPickupStrategy';
import { MediationState } from '../models/MediationState';
export interface MediationRecordProps {
    id?: string;
    state: MediationState;
    role: MediationRole;
    createdAt?: Date;
    connectionId: string;
    threadId: string;
    endpoint?: string;
    recipientKeys?: string[];
    routingKeys?: string[];
    pickupStrategy?: MediatorPickupStrategy;
    tags?: CustomMediationTags;
}
export type CustomMediationTags = {
    default?: boolean;
};
export type DefaultMediationTags = {
    role: MediationRole;
    connectionId: string;
    state: MediationState;
    threadId: string;
};
export declare class MediationRecord extends BaseRecord<DefaultMediationTags, CustomMediationTags> implements MediationRecordProps {
    state: MediationState;
    role: MediationRole;
    connectionId: string;
    threadId: string;
    endpoint?: string;
    recipientKeys: string[];
    routingKeys: string[];
    pickupStrategy?: MediatorPickupStrategy;
    static readonly type = "MediationRecord";
    readonly type = "MediationRecord";
    constructor(props: MediationRecordProps);
    getTags(): {
        state: MediationState;
        role: MediationRole;
        connectionId: string;
        threadId: string;
        recipientKeys: string[];
        default?: boolean | undefined;
    };
    addRecipientKey(recipientKey: string): void;
    removeRecipientKey(recipientKey: string): boolean;
    get isReady(): boolean;
    assertReady(): void;
    assertState(expectedStates: MediationState | MediationState[]): void;
    assertRole(expectedRole: MediationRole): void;
}
