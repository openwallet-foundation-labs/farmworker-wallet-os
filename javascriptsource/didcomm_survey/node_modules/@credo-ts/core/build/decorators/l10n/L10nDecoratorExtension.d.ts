import type { BaseMessageConstructor } from '../../agent/BaseMessage';
import { L10nDecorator } from './L10nDecorator';
export declare function L10nDecorated<T extends BaseMessageConstructor>(Base: T): {
    new (...args: any[]): {
        l10n?: L10nDecorator | undefined;
        addLocale(locale: string): void;
        getLocale(): string | undefined;
        id: string;
        readonly type: string;
        generateId(): string;
    };
} & T;
