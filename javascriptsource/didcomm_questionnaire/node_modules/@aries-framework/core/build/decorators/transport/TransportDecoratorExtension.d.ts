import type { BaseMessageConstructor } from '../../agent/BaseMessage';
import { TransportDecorator, ReturnRouteTypes } from './TransportDecorator';
export declare function TransportDecorated<T extends BaseMessageConstructor>(Base: T): {
    new (...args: any[]): {
        transport?: TransportDecorator | undefined;
        setReturnRouting(type: ReturnRouteTypes, thread?: string): void;
        hasReturnRouting(threadId?: string): boolean;
        hasAnyReturnRoute(): boolean;
        id: string;
        readonly type: string;
        generateId(): string;
    };
} & T;
