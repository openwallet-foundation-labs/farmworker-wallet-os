import type { BasicMessage } from './messages';
import type { BasicMessageRecord } from './repository';
import type { BaseEvent } from '../../agent/Events';
export declare enum BasicMessageEventTypes {
    BasicMessageStateChanged = "BasicMessageStateChanged"
}
export interface BasicMessageStateChangedEvent extends BaseEvent {
    type: typeof BasicMessageEventTypes.BasicMessageStateChanged;
    payload: {
        message: BasicMessage;
        basicMessageRecord: BasicMessageRecord;
    };
}
