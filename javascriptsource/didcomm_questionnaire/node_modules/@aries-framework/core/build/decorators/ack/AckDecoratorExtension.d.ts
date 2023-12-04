import type { BaseMessageConstructor } from '../../agent/BaseMessage';
import { AckDecorator, AckValues } from './AckDecorator';
export declare function AckDecorated<T extends BaseMessageConstructor>(Base: T): {
    new (...args: any[]): {
        pleaseAck?: AckDecorator | undefined;
        setPleaseAck(on?: [AckValues.Receipt]): void;
        getPleaseAck(): AckDecorator | undefined;
        requiresAck(): boolean;
        id: string;
        readonly type: string;
        generateId(): string;
    };
} & T;
