import type { ConnectionRecord } from './repository';
import type { ParsedMessageType } from '../../utils/messageType';
import { DidExchangeState } from './models';
export declare class DidExchangeStateMachine {
    private static createMessageStateRules;
    private static processMessageStateRules;
    static assertCreateMessageState(messageType: ParsedMessageType, record: ConnectionRecord): void;
    static assertProcessMessageState(messageType: ParsedMessageType, record: ConnectionRecord): void;
    static nextState(messageType: ParsedMessageType, record: ConnectionRecord): DidExchangeState;
}
