import type { ParsedMessageType } from '../utils/messageType';
import type { Constructor } from '../utils/mixins';
import { BaseMessage } from './BaseMessage';
export type ConstructableAgentMessage = Constructor<AgentMessage> & {
    type: ParsedMessageType;
};
declare const Decorated: {
    new (...args: any[]): {
        thread?: import("../decorators/thread/ThreadDecorator").ThreadDecorator | undefined;
        readonly threadId: string;
        setThread(options: Partial<import("../decorators/thread/ThreadDecorator").ThreadDecorator>): void;
        id: string;
        readonly type: string;
        generateId(): string;
    };
} & {
    new (...args: any[]): {
        l10n?: import("../decorators/l10n/L10nDecorator").L10nDecorator | undefined;
        addLocale(locale: string): void;
        getLocale(): string | undefined;
        id: string;
        readonly type: string;
        generateId(): string;
    };
} & {
    new (...args: any[]): {
        transport?: import("../decorators/transport/TransportDecorator").TransportDecorator | undefined;
        setReturnRouting(type: import("..").ReturnRouteTypes, thread?: string | undefined): void;
        hasReturnRouting(threadId?: string | undefined): boolean;
        hasAnyReturnRoute(): boolean;
        id: string;
        readonly type: string;
        generateId(): string;
    };
} & {
    new (...args: any[]): {
        timing?: import("../decorators/timing/TimingDecorator").TimingDecorator | undefined;
        setTiming(options: Partial<import("../decorators/timing/TimingDecorator").TimingDecorator>): void;
        id: string;
        readonly type: string;
        generateId(): string;
    };
} & {
    new (...args: any[]): {
        pleaseAck?: import("../decorators/ack/AckDecorator").AckDecorator | undefined;
        setPleaseAck(on?: [import("../decorators/ack/AckDecorator").AckValues.Receipt]): void;
        getPleaseAck(): import("../decorators/ack/AckDecorator").AckDecorator | undefined;
        requiresAck(): boolean;
        id: string;
        readonly type: string;
        generateId(): string;
    };
} & {
    new (...args: any[]): {
        appendedAttachments?: import("..").Attachment[] | undefined;
        getAppendedAttachmentById(id: string): import("..").Attachment | undefined;
        addAppendedAttachment(attachment: import("..").Attachment): void;
        id: string;
        readonly type: string;
        generateId(): string;
    };
} & {
    new (...args: any[]): {
        service?: import("..").ServiceDecorator | undefined;
        setService(serviceData: import("..").ServiceDecoratorOptions): void;
        id: string;
        readonly type: string;
        generateId(): string;
    };
} & typeof BaseMessage;
export declare class AgentMessage extends Decorated {
    /**
     * Whether the protocol RFC was initially written using the legacy did:prefix instead of the
     * new https://didcomm.org message type prefix.
     *
     * @see https://github.com/hyperledger/aries-rfcs/blob/main/features/0348-transition-msg-type-to-https/README.md
     */
    readonly allowDidSovPrefix: boolean;
    toJSON({ useDidSovPrefixWhereAllowed }?: {
        useDidSovPrefixWhereAllowed?: boolean;
    }): Record<string, unknown>;
    is<C extends typeof AgentMessage>(Class: C): this is InstanceType<C>;
}
export {};
