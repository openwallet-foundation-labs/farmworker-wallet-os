import type { OutOfBandState } from './OutOfBandState';
import type { BaseEvent } from '../../../agent/Events';
import type { ConnectionRecord } from '../../connections';
import type { OutOfBandRecord } from '../repository';
export declare enum OutOfBandEventTypes {
    OutOfBandStateChanged = "OutOfBandStateChanged",
    HandshakeReused = "HandshakeReused"
}
export interface OutOfBandStateChangedEvent extends BaseEvent {
    type: typeof OutOfBandEventTypes.OutOfBandStateChanged;
    payload: {
        outOfBandRecord: OutOfBandRecord;
        previousState: OutOfBandState | null;
    };
}
export interface HandshakeReusedEvent extends BaseEvent {
    type: typeof OutOfBandEventTypes.HandshakeReused;
    payload: {
        reuseThreadId: string;
        outOfBandRecord: OutOfBandRecord;
        connectionRecord: ConnectionRecord;
    };
}
