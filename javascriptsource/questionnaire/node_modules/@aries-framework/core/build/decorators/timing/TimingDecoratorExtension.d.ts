import type { BaseMessageConstructor } from '../../agent/BaseMessage';
import { TimingDecorator } from './TimingDecorator';
export declare function TimingDecorated<T extends BaseMessageConstructor>(Base: T): {
    new (...args: any[]): {
        /**
         * Timing attributes of messages can be described with the ~timing decorator.
         */
        timing?: TimingDecorator | undefined;
        setTiming(options: Partial<TimingDecorator>): void;
        id: string;
        readonly type: string;
        generateId(): string;
    };
} & T;
