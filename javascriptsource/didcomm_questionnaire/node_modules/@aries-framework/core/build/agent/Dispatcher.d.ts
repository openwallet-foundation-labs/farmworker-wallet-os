import type { InboundMessageContext } from './models/InboundMessageContext';
import { Logger } from '../logger';
import { EventEmitter } from './EventEmitter';
import { MessageHandlerRegistry } from './MessageHandlerRegistry';
import { MessageSender } from './MessageSender';
declare class Dispatcher {
    private messageHandlerRegistry;
    private messageSender;
    private eventEmitter;
    private logger;
    constructor(messageSender: MessageSender, eventEmitter: EventEmitter, messageHandlerRegistry: MessageHandlerRegistry, logger: Logger);
    dispatch(messageContext: InboundMessageContext): Promise<void>;
}
export { Dispatcher };
