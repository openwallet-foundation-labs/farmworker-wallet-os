import type { ParsedMessageType } from '../utils/messageType';
import type { Constructor } from '../utils/mixins';
export declare const MessageIdRegExp: RegExp;
export declare const MessageTypeRegExp: RegExp;
export type BaseMessageConstructor = Constructor<BaseMessage>;
export declare class BaseMessage {
    id: string;
    readonly type: string;
    static readonly type: ParsedMessageType;
    generateId(): string;
}
