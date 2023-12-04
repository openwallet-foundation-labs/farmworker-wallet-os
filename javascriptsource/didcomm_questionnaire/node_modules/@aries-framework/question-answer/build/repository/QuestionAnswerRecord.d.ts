import type { QuestionAnswerRole } from '../QuestionAnswerRole';
import type { QuestionAnswerState, ValidResponse } from '../models';
import type { RecordTags, TagsBase } from '@aries-framework/core';
import { BaseRecord } from '@aries-framework/core';
export type CustomQuestionAnswerTags = TagsBase;
export type DefaultQuestionAnswerTags = {
    connectionId: string;
    role: QuestionAnswerRole;
    state: QuestionAnswerState;
    threadId: string;
};
export type QuestionAnswerTags = RecordTags<QuestionAnswerRecord>;
export interface QuestionAnswerStorageProps {
    id?: string;
    createdAt?: Date;
    connectionId: string;
    role: QuestionAnswerRole;
    signatureRequired: boolean;
    state: QuestionAnswerState;
    tags?: CustomQuestionAnswerTags;
    threadId: string;
    questionText: string;
    questionDetail?: string;
    validResponses: ValidResponse[];
    response?: string;
}
export declare class QuestionAnswerRecord extends BaseRecord<DefaultQuestionAnswerTags, CustomQuestionAnswerTags> {
    questionText: string;
    questionDetail?: string;
    validResponses: ValidResponse[];
    connectionId: string;
    role: QuestionAnswerRole;
    signatureRequired: boolean;
    state: QuestionAnswerState;
    threadId: string;
    response?: string;
    static readonly type = "QuestionAnswerRecord";
    readonly type = "QuestionAnswerRecord";
    constructor(props: QuestionAnswerStorageProps);
    getTags(): {
        connectionId: string;
        role: QuestionAnswerRole;
        state: QuestionAnswerState;
        threadId: string;
    };
    assertRole(expectedRole: QuestionAnswerRole): void;
    assertState(expectedStates: QuestionAnswerState | QuestionAnswerState[]): void;
}
