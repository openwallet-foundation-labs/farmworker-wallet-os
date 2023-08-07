import type { ServiceDecoratorOptions } from './ServiceDecorator';
import type { BaseMessageConstructor } from '../../agent/BaseMessage';
import { ServiceDecorator } from './ServiceDecorator';
export declare function ServiceDecorated<T extends BaseMessageConstructor>(Base: T): {
    new (...args: any[]): {
        service?: ServiceDecorator | undefined;
        setService(serviceData: ServiceDecoratorOptions): void;
        id: string;
        readonly type: string;
        generateId(): string;
    };
} & T;
