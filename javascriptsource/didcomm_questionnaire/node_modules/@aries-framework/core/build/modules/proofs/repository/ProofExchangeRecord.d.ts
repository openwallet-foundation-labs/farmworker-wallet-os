import type { TagsBase } from '../../../storage/BaseRecord';
import type { AutoAcceptProof } from '../models/ProofAutoAcceptType';
import type { ProofState } from '../models/ProofState';
import { BaseRecord } from '../../../storage/BaseRecord';
export interface ProofExchangeRecordProps {
    id?: string;
    createdAt?: Date;
    protocolVersion: string;
    isVerified?: boolean;
    state: ProofState;
    connectionId?: string;
    threadId: string;
    parentThreadId?: string;
    tags?: CustomProofTags;
    autoAcceptProof?: AutoAcceptProof;
    errorMessage?: string;
}
export type CustomProofTags = TagsBase;
export type DefaultProofTags = {
    threadId: string;
    parentThreadId?: string;
    connectionId?: string;
    state: ProofState;
};
export declare class ProofExchangeRecord extends BaseRecord<DefaultProofTags, CustomProofTags> {
    connectionId?: string;
    threadId: string;
    protocolVersion: string;
    parentThreadId?: string;
    isVerified?: boolean;
    state: ProofState;
    autoAcceptProof?: AutoAcceptProof;
    errorMessage?: string;
    static readonly type = "ProofRecord";
    readonly type = "ProofRecord";
    constructor(props: ProofExchangeRecordProps);
    getTags(): {
        threadId: string;
        parentThreadId: string | undefined;
        connectionId: string | undefined;
        state: ProofState;
    };
    assertState(expectedStates: ProofState | ProofState[]): void;
    assertProtocolVersion(version: string): void;
    assertConnection(currentConnectionId: string): void;
}
