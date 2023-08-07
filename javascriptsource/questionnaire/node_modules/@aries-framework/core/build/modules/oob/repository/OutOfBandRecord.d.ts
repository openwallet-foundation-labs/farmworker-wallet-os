import type { TagsBase } from '../../../storage/BaseRecord';
import type { OutOfBandRole } from '../domain/OutOfBandRole';
import type { OutOfBandState } from '../domain/OutOfBandState';
import { BaseRecord } from '../../../storage/BaseRecord';
import { OutOfBandInvitation } from '../messages';
type DefaultOutOfBandRecordTags = {
    role: OutOfBandRole;
    state: OutOfBandState;
    invitationId: string;
    threadId?: string;
};
interface CustomOutOfBandRecordTags extends TagsBase {
    recipientKeyFingerprints: string[];
}
export interface OutOfBandRecordProps {
    id?: string;
    createdAt?: Date;
    updatedAt?: Date;
    tags?: CustomOutOfBandRecordTags;
    outOfBandInvitation: OutOfBandInvitation;
    role: OutOfBandRole;
    state: OutOfBandState;
    alias?: string;
    autoAcceptConnection?: boolean;
    reusable?: boolean;
    mediatorId?: string;
    reuseConnectionId?: string;
    threadId?: string;
}
export declare class OutOfBandRecord extends BaseRecord<DefaultOutOfBandRecordTags, CustomOutOfBandRecordTags> {
    outOfBandInvitation: OutOfBandInvitation;
    role: OutOfBandRole;
    state: OutOfBandState;
    alias?: string;
    reusable: boolean;
    autoAcceptConnection?: boolean;
    mediatorId?: string;
    reuseConnectionId?: string;
    static readonly type = "OutOfBandRecord";
    readonly type = "OutOfBandRecord";
    constructor(props: OutOfBandRecordProps);
    getTags(): {
        role: OutOfBandRole;
        state: OutOfBandState;
        invitationId: string;
        threadId: string;
        recipientKeyFingerprints: string[];
    };
    assertRole(expectedRole: OutOfBandRole): void;
    assertState(expectedStates: OutOfBandState | OutOfBandState[]): void;
}
export {};
