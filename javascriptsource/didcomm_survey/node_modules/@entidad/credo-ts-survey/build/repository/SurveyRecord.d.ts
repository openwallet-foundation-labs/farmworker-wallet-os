import type { SurveyRole } from '../SurveyRole';
import type { SurveyState } from '../models';
import type { RecordTags, TagsBase } from '@credo-ts/core';
import { BaseRecord } from '@credo-ts/core';
import { SurveyModel } from '../models';
export type CustomSurveyTags = TagsBase;
export type DefaultSurveyTags = {
    connectionId: string;
    role: SurveyRole;
    state: SurveyState;
    threadId: string;
};
export type SurveyTags = RecordTags<SurveyRecord>;
export interface SurveyStorageProps {
    id?: string;
    createdAt?: Date;
    connectionId: string;
    role: SurveyRole;
    signatureRequired: boolean;
    state: SurveyState;
    tags?: CustomSurveyTags;
    threadId: string;
    expirationDate?: string;
    response?: string;
    request: SurveyModel;
}
export declare class SurveyRecord extends BaseRecord<DefaultSurveyTags, CustomSurveyTags> {
    connectionId: string;
    role: SurveyRole;
    signatureRequired: boolean;
    state: SurveyState;
    threadId: string;
    expirationDate?: string;
    response?: string;
    request: SurveyModel;
    static readonly type = "SurveyRecord";
    readonly type = "SurveyRecord";
    constructor(props: SurveyStorageProps);
    getTags(): {
        connectionId: string;
        role: SurveyRole;
        state: SurveyState;
        threadId: string;
    };
    assertRole(expectedRole: SurveyRole): void;
    assertState(expectedStates: SurveyState | SurveyState[]): void;
}
