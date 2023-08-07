import type { BaseRecord } from './BaseRecord';
import type { BaseEvent } from '../agent/Events';
export declare enum RepositoryEventTypes {
    RecordSaved = "RecordSaved",
    RecordUpdated = "RecordUpdated",
    RecordDeleted = "RecordDeleted"
}
export interface RecordSavedEvent<T extends BaseRecord<any, any, any>> extends BaseEvent {
    type: typeof RepositoryEventTypes.RecordSaved;
    payload: {
        record: T;
    };
}
export interface RecordUpdatedEvent<T extends BaseRecord<any, any, any>> extends BaseEvent {
    type: typeof RepositoryEventTypes.RecordUpdated;
    payload: {
        record: T;
    };
}
export interface RecordDeletedEvent<T extends BaseRecord<any, any, any>> extends BaseEvent {
    type: typeof RepositoryEventTypes.RecordDeleted;
    payload: {
        record: T | {
            id: string;
            type: string;
        };
    };
}
