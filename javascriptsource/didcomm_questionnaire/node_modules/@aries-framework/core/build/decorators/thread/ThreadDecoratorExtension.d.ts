import type { BaseMessageConstructor } from '../../agent/BaseMessage';
import { ThreadDecorator } from './ThreadDecorator';
export declare function ThreadDecorated<T extends BaseMessageConstructor>(Base: T): {
    new (...args: any[]): {
        /**
         * The ~thread decorator is generally required on any type of response, since this is what connects it with the original request.
         */
        thread?: ThreadDecorator | undefined;
        readonly threadId: string;
        setThread(options: Partial<ThreadDecorator>): void;
        id: string;
        readonly type: string;
        generateId(): string;
    };
} & T;
