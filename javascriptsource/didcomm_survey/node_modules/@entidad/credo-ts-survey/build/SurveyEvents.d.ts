import type { SurveyState } from './models';
import type { SurveyRecord } from './repository';
import type { BaseEvent } from '@credo-ts/core';
export declare enum SurveyEventTypes {
    SurveyStateChanged = "SurveyStateChanged"
}
export interface SurveyStateChangedEvent extends BaseEvent {
    type: typeof SurveyEventTypes.SurveyStateChanged;
    payload: {
        previousState: SurveyState | null;
        surveyRecord: SurveyRecord;
    };
}
